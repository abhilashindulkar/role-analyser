"""
Scrape GCP IAM roles and permissions from public Google Cloud documentation.

No GCP account or credentials needed — reads from public docs pages.

Usage:
  python scripts/scrape_roles.py
  python scripts/scrape_roles.py --output src/data/gcp-roles.json --typescript
"""

import json
import re
import time
import argparse
import urllib.request
import urllib.error
from pathlib import Path

# (service_display_name, docs_url)
SERVICE_PAGES: list[tuple[str, str]] = [
    ("Cloud Storage", "https://cloud.google.com/storage/docs/access-control/iam-roles"),
    ("Compute Engine", "https://cloud.google.com/compute/docs/access/iam"),
    ("BigQuery", "https://cloud.google.com/bigquery/docs/access-control"),
    ("Cloud Run", "https://cloud.google.com/run/docs/reference/iam/roles"),
    ("Cloud Run functions", "https://cloud.google.com/functions/docs/reference/iam/roles"),
    ("Google Kubernetes Engine", "https://cloud.google.com/kubernetes-engine/docs/how-to/iam"),
    ("Identity and Access Management", "https://cloud.google.com/iam/docs/understanding-roles"),
    ("Cloud Logging", "https://cloud.google.com/logging/docs/access-control"),
    ("Cloud Monitoring", "https://cloud.google.com/monitoring/access-control"),
    ("Pub/Sub", "https://cloud.google.com/pubsub/docs/access-control"),
    ("Cloud SQL", "https://cloud.google.com/sql/docs/mysql/iam-roles"),
    ("Spanner", "https://cloud.google.com/spanner/docs/iam"),
    ("Secret Manager", "https://cloud.google.com/secret-manager/docs/access-control"),
    ("Cloud Build", "https://cloud.google.com/build/docs/iam-roles-permissions"),
    ("Artifact Registry", "https://cloud.google.com/artifact-registry/docs/access-control"),
    ("Vertex AI", "https://cloud.google.com/vertex-ai/docs/general/access-control"),
    ("Cloud DNS", "https://cloud.google.com/dns/docs/access-control"),
    ("Cloud Key Management Service", "https://cloud.google.com/kms/docs/reference/permissions-and-roles"),
    ("App Engine", "https://cloud.google.com/appengine/docs/standard/roles"),
    ("Cloud Asset Inventory", "https://cloud.google.com/asset-inventory/docs/access-control"),
    ("Cloud Billing", "https://cloud.google.com/billing/docs/how-to/billing-access"),
    ("Cloud Composer", "https://cloud.google.com/composer/docs/how-to/access-control"),
    ("Cloud Deploy", "https://cloud.google.com/deploy/docs/iam-roles-permissions"),
    ("Cloud Tasks", "https://cloud.google.com/tasks/docs/reference-access-control"),
    ("Cloud Workstations", "https://cloud.google.com/workstations/docs/access-control"),
    ("Data Catalog", "https://cloud.google.com/data-catalog/docs/concepts/iam"),
    ("Dataflow", "https://cloud.google.com/dataflow/docs/concepts/access-control"),
    ("Dataform", "https://cloud.google.com/dataform/docs/access-control"),
    ("Dataplex Universal Catalog", "https://cloud.google.com/dataplex/docs/iam-roles"),
    ("Dataproc", "https://cloud.google.com/dataproc/docs/concepts/iam/iam"),
    ("Dataproc Metastore", "https://cloud.google.com/dataproc-metastore/docs/iam-roles"),
    ("Dialogflow", "https://cloud.google.com/dialogflow/es/docs/access-control"),
    ("Document AI", "https://cloud.google.com/document-ai/docs/access-control"),
    ("Essential Contacts", "https://cloud.google.com/resource-manager/docs/managing-notification-contacts"),
    ("Eventarc", "https://cloud.google.com/eventarc/docs/access-control"),
    ("Filestore", "https://cloud.google.com/filestore/docs/iam"),
    ("Firestore", "https://cloud.google.com/firestore/docs/security/iam"),
    ("Memorystore for Redis", "https://cloud.google.com/memorystore/docs/redis/access-control"),
    ("Network Connectivity Center", "https://cloud.google.com/network-connectivity/docs/network-connectivity-center/concepts/access-control"),
    ("Network Management API", "https://cloud.google.com/network-intelligence-center/docs/connectivity-tests/concepts/access-control"),
    ("Organization Policy Service", "https://cloud.google.com/resource-manager/docs/organization-policy/overview"),
    ("Resource Manager", "https://cloud.google.com/resource-manager/docs/access-control-proj"),
    ("Security Command Center", "https://cloud.google.com/security-command-center/docs/access-control"),
    ("Sensitive Data Protection", "https://cloud.google.com/sensitive-data-protection/docs/iam-permissions"),
    ("Service Directory", "https://cloud.google.com/service-directory/docs/access-control"),
    ("Service Management", "https://cloud.google.com/service-infrastructure/docs/service-management/access-control"),
    ("Service Usage", "https://cloud.google.com/service-usage/docs/access-control"),
    ("Storage Transfer Service", "https://cloud.google.com/storage-transfer/docs/iam-transfer"),
    ("Workflows", "https://cloud.google.com/workflows/docs/access-control"),
    ("Bigtable", "https://cloud.google.com/bigtable/docs/access-control"),
]

FETCH_DELAY = 0.5
MAX_RETRIES = 3

TITLE_RE = re.compile(
    r'<h4[^>]*class="[^"]*role-title[^"]*"[^>]*>(.*?)</h4>',
    re.DOTALL,
)
ROLE_NAME_RE = re.compile(
    r'<code[^>]*>\s*roles/(?:<wbr/?>)?([\w.]+)\s*</code>'
)
PERMISSION_RE = re.compile(
    r'<code[^>]*>([\w]+(?:\.[\w]+){2,})</code>'
)
DESC_RE = re.compile(
    r'<span[^>]*class="[^"]*role-description[^"]*"[^>]*>(.*?)</span>',
    re.DOTALL,
)
TAG_STRIP_RE = re.compile(r'<[^>]+>')


def fetch_page(url: str) -> str:
    headers = {
        "User-Agent": "Mozilla/5.0 (compatible; GCPRoleScraper/1.0)",
        "Accept": "text/html,application/xhtml+xml",
    }
    req = urllib.request.Request(url, headers=headers)
    for attempt in range(MAX_RETRIES):
        try:
            with urllib.request.urlopen(req, timeout=30) as resp:
                return resp.read().decode("utf-8", errors="replace")
        except (urllib.error.HTTPError, urllib.error.URLError) as e:
            if attempt < MAX_RETRIES - 1:
                wait = 2 ** (attempt + 1)
                print(f"    Retry in {wait}s ({e})...")
                time.sleep(wait)
            else:
                raise
    return ""


def strip_tags(html: str) -> str:
    return TAG_STRIP_RE.sub("", html).strip()


def parse_roles_from_html(html: str, service: str) -> list[dict]:
    roles: list[dict] = []

    # Split by <tr> to isolate each role row
    rows = re.split(r'<tr\b', html)

    for row in rows:
        # Must contain a role-title heading
        title_match = TITLE_RE.search(row)
        if not title_match:
            continue

        title_raw = strip_tags(title_match.group(1)).strip()
        if not title_raw:
            continue

        # Extract role name (roles/xxx.yyy)
        name_match = ROLE_NAME_RE.search(row)
        if not name_match:
            continue
        role_name = f"roles/{name_match.group(1)}"

        # Extract description
        desc_match = DESC_RE.search(row)
        description = ""
        if desc_match:
            description = strip_tags(desc_match.group(1)).strip()
            description = re.sub(r'\s+', ' ', description)

        # Extract permissions from the permissions cell
        perm_cell = row
        td_split = re.split(r'<td[^>]*class="[^"]*role-permissions[^"]*"', row)
        if len(td_split) > 1:
            perm_cell = td_split[1]

        perms = set()
        for m in PERMISSION_RE.finditer(perm_cell):
            perm = m.group(1)
            if not perm.startswith("roles/") and not perm.startswith("http"):
                perms.add(perm)

        if not perms:
            continue

        stage = "GA"
        if "beta" in title_raw.lower().split():
            stage = "BETA"
        elif "alpha" in title_raw.lower().split():
            stage = "ALPHA"

        clean_title = re.sub(r'\s+(Beta|Alpha)$', '', title_raw, flags=re.IGNORECASE).strip()

        roles.append({
            "name": role_name,
            "title": clean_title,
            "description": description,
            "stage": stage,
            "permissions": sorted(perms),
            "service": service,
        })

    return roles


def fetch_and_parse_service(service: str, url: str) -> list[dict]:
    print(f"  Fetching {service}...")
    try:
        html = fetch_page(url)
        roles = parse_roles_from_html(html, service)
        perm_count = sum(len(r["permissions"]) for r in roles)
        print(f"    Found {len(roles)} roles ({perm_count} permissions)")
        return roles
    except Exception as e:
        print(f"    Error: {e}")
        return []


def add_basic_roles() -> list[dict]:
    return [
        {
            "name": "roles/viewer",
            "title": "Viewer",
            "description": "Permissions for read-only actions that do not affect state, such as viewing existing resources or data.",
            "stage": "GA",
            "permissions": [
                "resourcemanager.projects.get",
                "resourcemanager.projects.list",
            ],
            "service": "Basic",
        },
        {
            "name": "roles/editor",
            "title": "Editor",
            "description": "All viewer permissions, plus permissions for actions that modify state, such as changing existing resources.",
            "stage": "GA",
            "permissions": [
                "resourcemanager.projects.get",
                "resourcemanager.projects.list",
            ],
            "service": "Basic",
        },
        {
            "name": "roles/owner",
            "title": "Owner",
            "description": "All editor permissions and permissions for managing roles, permissions, and billing.",
            "stage": "GA",
            "permissions": [
                "resourcemanager.projects.get",
                "resourcemanager.projects.getIamPolicy",
                "resourcemanager.projects.list",
                "resourcemanager.projects.setIamPolicy",
            ],
            "service": "Basic",
        },
    ]


def deduplicate_roles(roles: list[dict]) -> list[dict]:
    seen: dict[str, dict] = {}
    for role in roles:
        name = role["name"]
        if name not in seen or len(role["permissions"]) > len(seen[name]["permissions"]):
            seen[name] = role
    return sorted(seen.values(), key=lambda r: r["name"])


def write_metadata(roles: list[dict], output_dir: Path) -> None:
    services: dict[str, int] = {}
    total_perms: set[str] = set()
    for r in roles:
        svc = r["service"]
        services[svc] = services.get(svc, 0) + 1
        total_perms.update(r["permissions"])

    meta = {
        "fetched_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "source": "Google Cloud documentation (public)",
        "total_roles": len(roles),
        "total_permissions": len(total_perms),
        "total_services": len(services),
        "services": dict(sorted(services.items())),
    }
    meta_path = output_dir / "roles-metadata.json"
    meta_path.write_text(json.dumps(meta, indent=2), encoding="utf-8")
    print(f"Metadata written: {meta_path}")


def generate_typescript(roles: list[dict], output_path: Path) -> None:
    ts_content = 'import type { GcpRole } from "../types";\n\n'
    ts_content += "export const ROLES_DATA: GcpRole[] = "
    ts_content += json.dumps(roles, indent=2)
    ts_content += ";\n"
    output_path.write_text(ts_content, encoding="utf-8")
    print(f"TypeScript file written: {output_path}")


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Scrape GCP IAM roles from public documentation"
    )
    parser.add_argument(
        "--output",
        default="src/data/gcp-roles.json",
        help="Output JSON file path (default: src/data/gcp-roles.json)",
    )
    parser.add_argument(
        "--typescript",
        action="store_true",
        help="Generate TypeScript source file at src/data/roles.ts",
    )
    args = parser.parse_args()

    all_roles = add_basic_roles()

    print(f"Scraping {len(SERVICE_PAGES)} service documentation pages...\n")
    for service, url in SERVICE_PAGES:
        roles = fetch_and_parse_service(service, url)
        all_roles.extend(roles)
        time.sleep(FETCH_DELAY)

    all_roles = deduplicate_roles(all_roles)
    svc_count = len(set(r["service"] for r in all_roles))
    perm_count = len(set(p for r in all_roles for p in r["permissions"]))
    print(f"\nTotal: {len(all_roles)} unique roles, {perm_count} unique permissions, {svc_count} services")

    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(json.dumps(all_roles, indent=2), encoding="utf-8")
    print(f"Saved to {output_path}")

    public_path = Path("public/gcp-roles.json")
    public_path.parent.mkdir(parents=True, exist_ok=True)
    public_path.write_text(json.dumps(all_roles, indent=2), encoding="utf-8")
    print(f"Copied to {public_path}")

    write_metadata(all_roles, output_path.parent)

    if args.typescript:
        ts_path = Path("src/data/roles.ts")
        generate_typescript(all_roles, ts_path)


if __name__ == "__main__":
    main()
