"""
Fetch all public GCP APIs from Google's APIs Discovery directory.

Source: https://discovery.googleapis.com/discovery/v1/apis?preferred=true

Filters the directory down to APIs documented on cloud.google.com,
infers a category and IAM permission prefix for each, and emits
TypeScript + JSON datasets consumed by the Permiso app.

Usage:
  python scripts/fetch_apis.py
"""

from __future__ import annotations

import json
import re
import time
import urllib.request
import urllib.error
from pathlib import Path

DISCOVERY_URL = "https://discovery.googleapis.com/discovery/v1/apis?preferred=true"

# (keyword_list, category) — first list with any matching keyword wins.
# Match is plain substring against "<name> <title>".lower(). Order matters:
# put more specific categories first so e.g. "Container Analysis" lands in
# DevOps before plain "container" hits Compute.
CATEGORY_RULES: list[tuple[list[str], str]] = [
    (
        [
            "cloudbuild", "artifactregistry", "clouddeploy", "sourcerepo",
            "securesourcemanager", "secure source",
            "containeranalysis", "ondemandscanning", "developerconnect",
            "deploymentmanager", "infrastructure manager", "config controller",
            "configdelivery", "gkeonprem", "gkehub", "gkeconnect", "source repos",
            "ci/cd", "binary authorization",
        ],
        "DevOps & CI/CD",
    ),
    (
        [
            "iam", "kms", "secret", "secretmanager", "cloudidentity",
            "identitytoolkit", "securitycenter", "security command",
            "dlp", "sensitive data", "accesscontext", "access context",
            "privateca", "certificate authority", "iap", "identity-aware",
            "websecurityscanner", "publicca", "chronicle", "recaptcha",
            "webrisk", "web risk",
            "assured", "risk manager", "safebrowsing", "safe browsing",
            "accessapproval", "access approval", "cloudsecurity", "ids ",
            "intrusion", "threat", "managedidentities", "managed service for microsoft",
            "oslogin", "os login", "binaryauthorization", "binary authorization",
            "sts", "security token", "securityposture", "security posture",
            "parametermanager", "parameter manager", "apikeys", "api keys",
        ],
        "Security & Identity",
    ),
    (
        [
            "bigquery", "dataflow", "dataproc", "composer", "pubsub",
            "dataplex", "dataform", "datacatalog", "datastream",
            "datalineage", "datafusion", "datamigration", "datapipelines",
            "biglake", "analyticshub", "looker", "metastore",
            "managedkafka", "kafka", "data labeling", "datalabeling",
        ],
        "Data Analytics",
    ),
    (
        [
            "aiplatform", "vertex ai", "automl", "documentai", "document ai",
            "dialogflow", "speech", "texttospeech", "translate", "translation",
            "vision", "videointelligence", "video intelligence", "naturallanguage",
            "natural language", "notebooks", "contactcenter", "contact center",
            "discoveryengine", "discovery engine", "generativelanguage",
            "generative", "recommendationengine", "recommendation engine",
            "agentregistry", "agent ", "gemini", "ces ", "contentwarehouse",
            "content warehouse", "retail", "jobs", "talent solution",
            "visualinspection", "ml.googleapis", "ai platform",
        ],
        "AI & ML",
    ),
    (
        [
            "dns", "networkconnectivity", "network connectivity",
            "networkmanagement", "network management",
            "networksecurity", "network security",
            "servicenetworking", "service networking",
            "vpcaccess", "vpc access", "certificatemanager", "certificate manager",
            "edgenetwork", "edge network", "connectgateway", "connect gateway",
            "networkservices", "network services", "trafficdirector",
            "traffic director", "firewallinsights", "firewall",
            "domains", "ddos", "load balanc",
        ],
        "Networking",
    ),
    (
        [
            "logging", "monitoring", "cloudtrace", "cloud trace",
            "cloudprofiler", "cloud profiler", "errorreporting",
            "error reporting", "opsconfig", "ops config", "observability",
            "stackdriver",
        ],
        "Operations",
    ),
    (
        [
            "workflows", "workflowexecutions", "eventarc", "cloudtasks",
            "cloud tasks", "cloudscheduler", "cloud scheduler",
            "servicedirectory", "service directory", "apigateway", "api gateway",
            "apigeeregistry", "apigee", "integrations", "servicecontrol",
            "service control", "connectors", "cloudchannel", "channel",
            "beyondcorp", "apihub", "api hub", "apim", "api management",
        ],
        "Integration",
    ),
    (
        [
            "storage", "storagetransfer", "sqladmin", "cloud sql",
            "spanner", "firestore", "datastore", "bigtable", "filestore",
            "file.googleapis", "redis", "memcache", "memorystore", "backup",
            "gkebackup", "netapp", "parallelstore", "blockchain", "alloydb",
            "oracle database", "oracledatabase", "healthcare",
        ],
        "Storage & Databases",
    ),
    (
        [
            "compute", "kubernetes", "container.googleapis",
            "container engine", "run.googleapis", "cloud run",
            "cloudfunctions", "cloud functions", "appengine", "app engine",
            "batch", "workstation", "vmware", "gameservices", "tpu",
            "edgecontainer", "edge container", "baremetalsolution",
            "bare metal", "hypercomputecluster", "cluster director",
            "transcoder",
        ],
        "Compute",
    ),
    (
        [
            "cloudresourcemanager", "resource manager", "cloudasset",
            "asset", "serviceusage", "service usage", "servicemanagement",
            "service management", "cloudbilling", "billing", "orgpolicy",
            "org policy", "essentialcontacts", "essential contacts",
            "recommender", "policyanalyzer", "policy analyzer",
            "policytroubleshooter", "policy troubleshooter",
            "policysimulator", "policy simulator",
            "advisorynotifications", "advisory notifications",
            "cloudsupport", "cloud support", "cloudcommerceprocurement",
            "consumerprocurement", "procurement",
            "cloudcontrolspartner", "controls partner",
            "migrationcenter", "migration center", "vmmigration",
            "rapidmigration", "rapid migration", "cloudshell", "cloud shell",
            "configcontroller", "osconfig", "os config",
            "serviceconsumermanagement", "consumer management",
            "saasservicemgmt", "app lifecycle", "apphub", "app hub",
            "runtimeconfig", "runtime config",
            "cloudlocationfinder", "location finder",
            "cloudnumberregistry", "number registry",
            "workloadmanager", "workload manager",
            "libraryagent", "playgrouping",
        ],
        "Management",
    ),
]

# Override permission prefix for APIs whose IAM verb prefix differs from
# the service host name. Key is the discovery API "name".
PERM_PREFIX_OVERRIDES: dict[str, str] = {
    "sqladmin": "cloudsql",
    "firestore": "datastore",
    "iamcredentials": "iam.serviceAccounts",
    "ml": "ml",
    "translate": "cloudtranslate",
    "sourcerepo": "source",
    "cloudidentity": "cloudidentity",
    "cloudbilling": "billing",
    "cloudresourcemanager": "resourcemanager",
    "clouddebugger": "clouddebugger",
    "cloudtrace": "cloudtrace",
    "clouderrorreporting": "errorreporting",
    "cloudprofiler": "cloudprofiler",
    "bigqueryconnection": "bigquery.connections",
    "bigquerydatatransfer": "bigquery.transfers",
    "bigquerydatapolicy": "bigquery.dataPolicies",
    "bigqueryreservation": "bigquery.reservations",
    "bigquerymigration": "bigquery.migrations",
    "workflowexecutions": "workflows.executions",
    "fcm": "cloudmessaging",
    "fcmdata": "cloudmessaging",
    "file": "file",
    "memcache": "memcache",
    "redis": "redis",
}

# APIs Google enables by default on new projects.
DEFAULT_ON: set[str] = {
    "cloudapis.googleapis.com",
    "cloudtrace.googleapis.com",
    "logging.googleapis.com",
    "monitoring.googleapis.com",
    "servicemanagement.googleapis.com",
    "serviceusage.googleapis.com",
    "storage-api.googleapis.com",
    "storage-component.googleapis.com",
    "storage.googleapis.com",
    "datastore.googleapis.com",
    "bigquery.googleapis.com",
    "bigquerystorage.googleapis.com",
    "bigquerymigration.googleapis.com",
    "containerregistry.googleapis.com",
    "iam.googleapis.com",
    "iamcredentials.googleapis.com",
    "cloudresourcemanager.googleapis.com",
    "oslogin.googleapis.com",
    "pubsub.googleapis.com",
    "source.googleapis.com",
    "sql-component.googleapis.com",
}

SUMMARY_MAX = 320


def fetch_directory() -> dict:
    headers = {
        "User-Agent": "Mozilla/5.0 (compatible; PermisoApiFetcher/1.0)",
        "Accept": "application/json",
    }
    req = urllib.request.Request(DISCOVERY_URL, headers=headers)
    with urllib.request.urlopen(req, timeout=60) as resp:
        return json.loads(resp.read().decode("utf-8"))


def derive_host(item: dict) -> str | None:
    rest = item.get("discoveryRestUrl", "")
    m = re.match(r"https?://([^/]+)/", rest)
    return m.group(1) if m else None


def derive_category(name: str, title: str) -> str:
    haystack = f"{name} {title}".lower()
    for keywords, cat in CATEGORY_RULES:
        if any(kw in haystack for kw in keywords):
            return cat
    return "Other"


def derive_perm_prefix(name: str, host: str) -> str:
    if name in PERM_PREFIX_OVERRIDES:
        return PERM_PREFIX_OVERRIDES[name]
    # Default: assume IAM prefix matches the API name (e.g. compute -> compute.*).
    return name


def derive_console_url(host: str) -> str:
    return f"https://console.cloud.google.com/apis/library/{host}"


def derive_stage(item: dict) -> str:
    version = item.get("version", "").lower()
    if "alpha" in version:
        return "ALPHA"
    if "beta" in version:
        return "BETA"
    return "GA"


def shorten(text: str, limit: int = SUMMARY_MAX) -> str:
    text = re.sub(r"\s+", " ", text).strip()
    if len(text) <= limit:
        return text
    cut = text[: limit - 1].rsplit(" ", 1)[0]
    return cut.rstrip(".,;:") + "…"


def is_gcp_api(item: dict) -> bool:
    docs = item.get("documentationLink", "")
    if "cloud.google.com" in docs:
        return True
    host = derive_host(item) or ""
    return host.endswith(".googleapis.com") and any(
        h in host for h in ("cloud", "iam", "compute", "bigquery", "storage")
    ) and "cloud.google.com" in docs


def transform_items(items: list[dict]) -> list[dict]:
    apis: dict[str, dict] = {}
    for item in items:
        if not is_gcp_api(item):
            continue
        host = derive_host(item)
        if not host:
            continue
        name = item.get("name", "")
        title = item.get("title", "").strip()
        description = item.get("description", "").strip()
        docs = item.get("documentationLink", "").strip()
        if not name or not title:
            continue

        api = {
            "name": host,
            "title": title,
            "summary": shorten(description) or f"{title} on Google Cloud.",
            "category": derive_category(name, title),
            "permissionPrefix": derive_perm_prefix(name, host),
            "stage": derive_stage(item),
            "docsUrl": docs,
            "consoleUrl": derive_console_url(host),
        }
        if host in DEFAULT_ON:
            api["enabledByDefault"] = True

        # Dedupe by host. Prefer GA over BETA/ALPHA when collisions occur.
        existing = apis.get(host)
        if not existing:
            apis[host] = api
        elif api["stage"] == "GA" and existing["stage"] != "GA":
            apis[host] = api

    return sorted(apis.values(), key=lambda a: a["name"])


def write_typescript(apis: list[dict], path: Path) -> None:
    body = json.dumps(apis, indent=2, ensure_ascii=False)
    content = (
        'import type { GcpApi } from "../types";\n\n'
        f"export const APIS_DATA: GcpApi[] = {body};\n"
    )
    path.write_text(content, encoding="utf-8")
    print(f"Wrote {path}")


def write_metadata(apis: list[dict], path: Path) -> None:
    categories: dict[str, int] = {}
    for a in apis:
        categories[a["category"]] = categories.get(a["category"], 0) + 1
    meta = {
        "fetched_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "source": "https://discovery.googleapis.com/discovery/v1/apis?preferred=true",
        "total_apis": len(apis),
        "categories": dict(sorted(categories.items())),
    }
    path.write_text(json.dumps(meta, indent=2), encoding="utf-8")
    print(f"Wrote {path}")


def main() -> None:
    print(f"Fetching {DISCOVERY_URL}...")
    directory = fetch_directory()
    items = directory.get("items", [])
    print(f"Discovery returned {len(items)} APIs total")

    apis = transform_items(items)
    print(f"Filtered to {len(apis)} GCP APIs")

    repo_root = Path(__file__).resolve().parent.parent
    ts_path = repo_root / "src" / "data" / "apis.ts"
    meta_path = repo_root / "src" / "data" / "apis-metadata.json"
    public_path = repo_root / "public" / "gcp-apis.json"

    ts_path.parent.mkdir(parents=True, exist_ok=True)
    public_path.parent.mkdir(parents=True, exist_ok=True)

    write_typescript(apis, ts_path)
    write_metadata(apis, meta_path)
    public_path.write_text(json.dumps(apis, indent=2), encoding="utf-8")
    print(f"Wrote {public_path}")

    # Category breakdown
    cats: dict[str, int] = {}
    for a in apis:
        cats[a["category"]] = cats.get(a["category"], 0) + 1
    print("\nCategory breakdown:")
    for cat, n in sorted(cats.items(), key=lambda x: -x[1]):
        print(f"  {cat:25s} {n}")


if __name__ == "__main__":
    main()
