"""
Fetch all GCP IAM predefined roles and permissions via the REST API.

Authentication options (in priority order):
  1. GOOGLE_ACCESS_TOKEN env var (set by GHA via Workload Identity Federation)
  2. Application Default Credentials (local dev: `gcloud auth application-default login`)

Usage:
  python scripts/fetch_roles.py
  python scripts/fetch_roles.py --output src/data/gcp-roles.json --typescript
"""

import json
import os
import sys
import time
import argparse
import urllib.request
import urllib.error
from pathlib import Path

IAM_API = "https://iam.googleapis.com/v1"
PAGE_SIZE = 1000
MAX_RETRIES = 3
RETRY_DELAY = 2


def get_access_token() -> str:
    token = os.environ.get("GOOGLE_ACCESS_TOKEN", "")
    if token:
        return token

    # Fall back to Application Default Credentials metadata
    try:
        import google.auth
        import google.auth.transport.requests

        creds, _ = google.auth.default(
            scopes=["https://www.googleapis.com/auth/cloud-platform.read-only"]
        )
        creds.refresh(google.auth.transport.requests.Request())
        return creds.token
    except ImportError:
        pass

    # Fall back to gcloud CLI
    import subprocess

    result = subprocess.run(
        ["gcloud", "auth", "print-access-token"],
        capture_output=True,
        text=True,
    )
    if result.returncode == 0 and result.stdout.strip():
        return result.stdout.strip()

    print(
        "Error: No credentials found.\n"
        "Set GOOGLE_ACCESS_TOKEN, run `gcloud auth application-default login`,\n"
        "or install google-auth: pip install google-auth",
        file=sys.stderr,
    )
    sys.exit(1)


def api_get(url: str, token: str) -> dict:
    req = urllib.request.Request(
        url,
        headers={
            "Authorization": f"Bearer {token}",
            "Accept": "application/json",
        },
    )
    for attempt in range(MAX_RETRIES):
        try:
            with urllib.request.urlopen(req, timeout=30) as resp:
                return json.loads(resp.read().decode())
        except urllib.error.HTTPError as e:
            if e.code == 429 or e.code >= 500:
                wait = RETRY_DELAY * (2**attempt)
                print(f"  Retrying in {wait}s (HTTP {e.code})...", file=sys.stderr)
                time.sleep(wait)
                continue
            body = e.read().decode() if e.fp else ""
            print(f"HTTP {e.code}: {body}", file=sys.stderr)
            raise
        except urllib.error.URLError as e:
            if attempt < MAX_RETRIES - 1:
                time.sleep(RETRY_DELAY)
                continue
            raise
    return {}


def fetch_all_roles(token: str) -> list[dict]:
    print("Fetching predefined roles list...")
    roles: list[dict] = []
    page_token = ""

    while True:
        url = f"{IAM_API}/roles?view=FULL&pageSize={PAGE_SIZE}"
        if page_token:
            url += f"&pageToken={page_token}"
        data = api_get(url, token)
        batch = data.get("roles", [])
        roles.extend(batch)
        print(f"  Fetched {len(roles)} roles so far...")
        page_token = data.get("nextPageToken", "")
        if not page_token:
            break

    print(f"Total: {len(roles)} predefined roles")

    detailed_roles = []
    for i, role in enumerate(roles):
        name = role.get("name", "")
        if not name:
            continue

        if (i + 1) % 100 == 0 or i == 0:
            print(f"  Processing [{i+1}/{len(roles)}]...")

        permissions = role.get("includedPermissions", [])

        # If the FULL view didn't include permissions, fetch individually
        if not permissions:
            try:
                detail = api_get(f"{IAM_API}/{name}", token)
                permissions = detail.get("includedPermissions", [])
            except Exception as e:
                print(f"  Warning: Could not fetch {name}: {e}", file=sys.stderr)
                continue

        service = extract_service(name)
        detailed_roles.append({
            "name": name,
            "title": role.get("title", name),
            "description": role.get("description", ""),
            "stage": role.get("stage", "GA"),
            "permissions": sorted(permissions),
            "service": service,
        })

    return detailed_roles


SERVICE_MAP = {
    "accessapproval": "Access Approval",
    "accesscontextmanager": "Access Context Manager",
    "aiplatform": "Vertex AI",
    "alloydb": "AlloyDB for PostgreSQL",
    "apigateway": "API Gateway",
    "apikeys": "API Keys",
    "appengine": "App Engine",
    "artifactregistry": "Artifact Registry",
    "assuredworkloads": "Assured Workloads",
    "automl": "AutoML",
    "baremetalsolution": "Bare Metal Solution",
    "batch": "Batch",
    "beyondcorp": "BeyondCorp",
    "bigquery": "BigQuery",
    "bigtable": "Bigtable",
    "billing": "Cloud Billing",
    "binaryauthorization": "Binary Authorization",
    "certificatemanager": "Certificate Manager",
    "cloudasset": "Cloud Asset Inventory",
    "cloudbuild": "Cloud Build",
    "cloudcomposer": "Cloud Composer",  # not "composer" - maps via prefix
    "clouddeploy": "Cloud Deploy",
    "cloudfunctions": "Cloud Run functions",
    "cloudkms": "Cloud Key Management Service",
    "cloudprofiler": "Cloud Profiler",
    "cloudscheduler": "Cloud Scheduler",
    "cloudsql": "Cloud SQL",
    "cloudsupport": "Google Cloud Support",
    "cloudtasks": "Cloud Tasks",
    "cloudtrace": "Cloud Trace",
    "composer": "Cloud Composer",
    "compute": "Compute Engine",
    "connectors": "Connectors",
    "container": "Google Kubernetes Engine",
    "containeranalysis": "Container Analysis",
    "datacatalog": "Data Catalog",
    "dataflow": "Dataflow",
    "dataform": "Dataform",
    "datamigration": "Database Migration Service",
    "dataplex": "Dataplex Universal Catalog",
    "dataproc": "Dataproc",
    "datastore": "Firestore",
    "datastream": "Datastream",
    "deploymentmanager": "Cloud Deployment Manager",
    "dialogflow": "Dialogflow",
    "discoveryengine": "Discovery Engine",
    "dns": "Cloud DNS",
    "domains": "Cloud Domains",
    "editor": "Basic",
    "errorreporting": "Error Reporting",
    "essentialcontacts": "Essential Contacts",
    "eventarc": "Eventarc",
    "file": "Filestore",
    "firebase": "Firebase",
    "firebaserules": "Firebase Security Rules",
    "firestore": "Firestore",
    "gkebackup": "Backup for GKE",
    "gkehub": "GKE Hub",
    "gkemulticloud": "GKE Multi-Cloud",
    "healthcare": "Cloud Healthcare API",
    "iam": "Identity and Access Management",
    "iap": "Identity-Aware Proxy",
    "identityplatform": "Identity Platform",
    "integrations": "Cloud Integrations",
    "logging": "Cloud Logging",
    "looker": "Looker",
    "managedidentities": "Managed Service for Microsoft Active Directory",
    "memcache": "Memorystore for Memcached",
    "meshconfig": "Cloud Service Mesh",
    "metastore": "Dataproc Metastore",
    "ml": "AI Platform",
    "monitoring": "Cloud Monitoring",
    "netapp": "Google Cloud NetApp Volumes",
    "networkconnectivity": "Network Connectivity Center",
    "networkmanagement": "Network Management API",
    "networksecurity": "Network Security",
    "networkservices": "Network Services",
    "notebooks": "Notebooks",
    "ondemandscanning": "On-Demand Scanning API",
    "opsconfigmonitoring": "Ops Config Monitoring",
    "orgpolicy": "Organization Policy Service",
    "owner": "Basic",
    "privateca": "Certificate Authority Service",
    "pubsub": "Pub/Sub",
    "pubsublite": "Pub/Sub Lite",
    "recaptchaenterprise": "reCAPTCHA",
    "recommender": "Recommender",
    "redis": "Memorystore for Redis",
    "resourcemanager": "Resource Manager",
    "retail": "Retail API",
    "run": "Cloud Run",
    "secretmanager": "Secret Manager",
    "securesourcemanager": "Secure Source Manager",
    "securitycenter": "Security Command Center",
    "servicemanagement": "Service Management",
    "servicenetworking": "Service Networking",
    "serviceusage": "Service Usage",
    "source": "Cloud Source Repositories",
    "spanner": "Spanner",
    "speech": "Speech-to-Text",
    "storage": "Cloud Storage",
    "storagetransfer": "Storage Transfer Service",
    "tpu": "Cloud TPU",
    "transcoder": "Transcoder API",
    "translate": "Translation",
    "viewer": "Basic",
    "vmmigration": "Migrate to Virtual Machines",
    "vmwareengine": "Google Cloud VMware Engine",
    "vpcaccess": "Serverless VPC Access",
    "websecurityscanner": "Web Security Scanner",
    "workflows": "Workflows",
    "workstations": "Cloud Workstations",
}


def extract_service(role_name: str) -> str:
    """Extract service name from role name like 'roles/storage.admin'."""
    parts = role_name.replace("roles/", "").split(".")
    prefix = parts[0]
    if prefix in SERVICE_MAP:
        return SERVICE_MAP[prefix]
    return prefix.replace("cloud", "Cloud ").replace("_", " ").title()


def generate_typescript(roles: list[dict], output_path: Path) -> None:
    ts_content = 'import type { GcpRole } from "../types";\n\n'
    ts_content += "export const ROLES_DATA: GcpRole[] = "
    ts_content += json.dumps(roles, indent=2)
    ts_content += ";\n"
    output_path.write_text(ts_content, encoding="utf-8")
    print(f"TypeScript file written: {output_path}")


def write_metadata(roles: list[dict], output_dir: Path) -> None:
    services: dict[str, int] = {}
    total_perms = set()
    for r in roles:
        svc = r["service"]
        services[svc] = services.get(svc, 0) + 1
        total_perms.update(r["permissions"])

    meta = {
        "fetched_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "total_roles": len(roles),
        "total_permissions": len(total_perms),
        "total_services": len(services),
        "services": dict(sorted(services.items())),
    }
    meta_path = output_dir / "roles-metadata.json"
    meta_path.write_text(json.dumps(meta, indent=2), encoding="utf-8")
    print(f"Metadata written: {meta_path}")


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Fetch GCP IAM predefined roles via REST API"
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

    token = get_access_token()
    roles = fetch_all_roles(token)

    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    roles_json = json.dumps(roles, indent=2)
    output_path.write_text(roles_json, encoding="utf-8")
    print(f"\nSaved {len(roles)} roles to {output_path}")

    public_path = Path("public/gcp-roles.json")
    public_path.parent.mkdir(parents=True, exist_ok=True)
    public_path.write_text(roles_json, encoding="utf-8")
    print(f"Copied to {public_path}")

    write_metadata(roles, output_path.parent)

    if args.typescript:
        ts_path = Path("src/data/roles.ts")
        generate_typescript(roles, ts_path)


if __name__ == "__main__":
    main()
