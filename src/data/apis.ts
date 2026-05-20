import type { GcpApi } from "../types";

export const APIS_DATA: GcpApi[] = [
  {
    "name": "accessapproval.googleapis.com",
    "title": "Access Approval API",
    "summary": "An API for controlling access to data by Google personnel.",
    "category": "Security & Identity",
    "permissionPrefix": "accessapproval",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/assured-workloads/access-approval/docs",
    "consoleUrl": "https://console.cloud.google.com/apis/library/accessapproval.googleapis.com"
  },
  {
    "name": "accesscontextmanager.googleapis.com",
    "title": "Access Context Manager API",
    "summary": "An API for setting attribute based access control to requests to Google Cloud services. *Warning:* Do not mix *v1alpha* and *v1* API usage in the same access policy. The v1alpha API supports new Access Context Manager features, which may have different attributes or behaviors that are not supported by v1. The…",
    "category": "Security & Identity",
    "permissionPrefix": "accesscontextmanager",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/access-context-manager/docs/reference/rest/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/accesscontextmanager.googleapis.com"
  },
  {
    "name": "advisorynotifications.googleapis.com",
    "title": "Advisory Notifications API",
    "summary": "An API for accessing Advisory Notifications in Google Cloud",
    "category": "Management",
    "permissionPrefix": "advisorynotifications",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/advisory-notifications",
    "consoleUrl": "https://console.cloud.google.com/apis/library/advisorynotifications.googleapis.com"
  },
  {
    "name": "agentregistry.googleapis.com",
    "title": "Agent Registry API",
    "summary": "Agent Registry is a centralized, unified catalog that lets you store, discover, and govern Model Context Protocol (MCP) servers, tools, and AI agents within Google Cloud.",
    "category": "AI & ML",
    "permissionPrefix": "agentregistry",
    "stage": "ALPHA",
    "docsUrl": "https://docs.cloud.google.com/agent-registry/overview",
    "consoleUrl": "https://console.cloud.google.com/apis/library/agentregistry.googleapis.com"
  },
  {
    "name": "aiplatform.googleapis.com",
    "title": "Agent Platform API",
    "summary": "Build, scale, govern, and optimize sophisticated agents and models.",
    "category": "AI & ML",
    "permissionPrefix": "aiplatform",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/vertex-ai/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/aiplatform.googleapis.com"
  },
  {
    "name": "alloydb.googleapis.com",
    "title": "AlloyDB API",
    "summary": "AlloyDB for PostgreSQL is an open source-compatible database service that provides a powerful option for migrating, modernizing, or building commercial-grade applications. It offers full compatibility with standard PostgreSQL, and is more than 4x faster for transactional workloads and up to 100x faster for analytical…",
    "category": "Storage & Databases",
    "permissionPrefix": "alloydb",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/alloydb/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/alloydb.googleapis.com"
  },
  {
    "name": "analyticshub.googleapis.com",
    "title": "Analytics Hub API",
    "summary": "Exchange data and analytics assets securely and efficiently.",
    "category": "Data Analytics",
    "permissionPrefix": "analyticshub",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/bigquery/docs/analytics-hub-introduction",
    "consoleUrl": "https://console.cloud.google.com/apis/library/analyticshub.googleapis.com"
  },
  {
    "name": "apigateway.googleapis.com",
    "title": "API Gateway API",
    "summary": "API Gateway API on Google Cloud.",
    "category": "Integration",
    "permissionPrefix": "apigateway",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/api-gateway/docs",
    "consoleUrl": "https://console.cloud.google.com/apis/library/apigateway.googleapis.com"
  },
  {
    "name": "apigee.googleapis.com",
    "title": "Apigee API",
    "summary": "Use the Apigee API to programmatically develop and manage APIs with a set of RESTful operations. Develop and secure API proxies, deploy and undeploy API proxy revisions, monitor APIs, configure environments, manage users, and more. Note: This product is available as a free trial for a time period of 60 days.",
    "category": "Integration",
    "permissionPrefix": "apigee",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/apigee-api-management/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/apigee.googleapis.com"
  },
  {
    "name": "apigeeregistry.googleapis.com",
    "title": "Apigee Registry API",
    "summary": "Apigee Registry API on Google Cloud.",
    "category": "Integration",
    "permissionPrefix": "apigeeregistry",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/apigee/docs/api-hub/what-is-api-hub",
    "consoleUrl": "https://console.cloud.google.com/apis/library/apigeeregistry.googleapis.com"
  },
  {
    "name": "apihub.googleapis.com",
    "title": "API hub API",
    "summary": "API hub API on Google Cloud.",
    "category": "Integration",
    "permissionPrefix": "apihub",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/apigee/docs/api-hub/what-is-api-hub",
    "consoleUrl": "https://console.cloud.google.com/apis/library/apihub.googleapis.com"
  },
  {
    "name": "apikeys.googleapis.com",
    "title": "API Keys API",
    "summary": "Manages the API keys associated with developer projects.",
    "category": "Security & Identity",
    "permissionPrefix": "apikeys",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/api-keys/docs",
    "consoleUrl": "https://console.cloud.google.com/apis/library/apikeys.googleapis.com"
  },
  {
    "name": "apim.googleapis.com",
    "title": "API Management API",
    "summary": "Enables users to discover shadow APIs in existing Google Cloud infrastructure.",
    "category": "Integration",
    "permissionPrefix": "apim",
    "stage": "ALPHA",
    "docsUrl": "https://cloud.google.com/apigee/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/apim.googleapis.com"
  },
  {
    "name": "appengine.googleapis.com",
    "title": "App Engine Admin API",
    "summary": "Provisions and manages developers' App Engine applications.",
    "category": "Compute",
    "permissionPrefix": "appengine",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/appengine/docs/admin-api/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/appengine.googleapis.com"
  },
  {
    "name": "apphub.googleapis.com",
    "title": "App Hub API",
    "summary": "App Hub lets you build, operate, and manage applications on Google Cloud.",
    "category": "Management",
    "permissionPrefix": "apphub",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/app-hub/docs/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/apphub.googleapis.com"
  },
  {
    "name": "artifactregistry.googleapis.com",
    "title": "Artifact Registry API",
    "summary": "Store and manage build artifacts in a scalable and integrated service built on Google infrastructure.",
    "category": "DevOps & CI/CD",
    "permissionPrefix": "artifactregistry",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/artifacts/docs/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/artifactregistry.googleapis.com"
  },
  {
    "name": "assuredworkloads.googleapis.com",
    "title": "Assured Workloads API",
    "summary": "Assured Workloads API on Google Cloud.",
    "category": "Security & Identity",
    "permissionPrefix": "assuredworkloads",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/learnmoreurl",
    "consoleUrl": "https://console.cloud.google.com/apis/library/assuredworkloads.googleapis.com"
  },
  {
    "name": "backupdr.googleapis.com",
    "title": "Backup and DR Service API",
    "summary": "Backup and DR Service API on Google Cloud.",
    "category": "Storage & Databases",
    "permissionPrefix": "backupdr",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/backup-disaster-recovery",
    "consoleUrl": "https://console.cloud.google.com/apis/library/backupdr.googleapis.com"
  },
  {
    "name": "baremetalsolution.googleapis.com",
    "title": "Bare Metal Solution API",
    "summary": "Provides ways to manage Bare Metal Solution hardware installed in a regional extension located near a Google Cloud data center.",
    "category": "Compute",
    "permissionPrefix": "baremetalsolution",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/bare-metal",
    "consoleUrl": "https://console.cloud.google.com/apis/library/baremetalsolution.googleapis.com"
  },
  {
    "name": "batch.googleapis.com",
    "title": "Batch API",
    "summary": "An API to manage the running of Batch resources on Google Cloud Platform.",
    "category": "Compute",
    "permissionPrefix": "batch",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/batch/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/batch.googleapis.com"
  },
  {
    "name": "beyondcorp.googleapis.com",
    "title": "BeyondCorp API",
    "summary": "Chrome Enterprise Premium is a secure enterprise browsing solution that provides secure access to applications and resources, and offers integrated threat and data protection. It adds an extra layer of security to safeguard your Chrome browser environment, including Data Loss Prevention (DLP), real-time URL and file…",
    "category": "Integration",
    "permissionPrefix": "beyondcorp",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/beyondcorp.googleapis.com"
  },
  {
    "name": "biglake.googleapis.com",
    "title": "BigLake API",
    "summary": "The BigLake API provides access to BigLake Metastore, a serverless, fully managed, and highly available metastore for open-source data that can be used for querying Apache Iceberg tables in BigQuery.",
    "category": "Data Analytics",
    "permissionPrefix": "biglake",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/bigquery/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/biglake.googleapis.com"
  },
  {
    "name": "bigquery.googleapis.com",
    "title": "BigQuery API",
    "summary": "A data platform for customers to create, manage, share and query data.",
    "category": "Data Analytics",
    "permissionPrefix": "bigquery",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/bigquery/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/bigquery.googleapis.com",
    "enabledByDefault": true
  },
  {
    "name": "bigqueryconnection.googleapis.com",
    "title": "BigQuery Connection API",
    "summary": "Allows users to manage BigQuery connections to external data sources.",
    "category": "Data Analytics",
    "permissionPrefix": "bigquery.connections",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/bigquery/docs/connections-api-intro",
    "consoleUrl": "https://console.cloud.google.com/apis/library/bigqueryconnection.googleapis.com"
  },
  {
    "name": "bigquerydatapolicy.googleapis.com",
    "title": "BigQuery Data Policy API",
    "summary": "Allows users to manage BigQuery data policies.",
    "category": "Data Analytics",
    "permissionPrefix": "bigquery.dataPolicies",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/bigquery/docs/column-data-masking",
    "consoleUrl": "https://console.cloud.google.com/apis/library/bigquerydatapolicy.googleapis.com"
  },
  {
    "name": "bigquerydatatransfer.googleapis.com",
    "title": "BigQuery Data Transfer API",
    "summary": "Schedule queries or transfer external data from SaaS applications to Google BigQuery on a regular basis.",
    "category": "Data Analytics",
    "permissionPrefix": "bigquery.transfers",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/bigquery-transfer/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/bigquerydatatransfer.googleapis.com"
  },
  {
    "name": "bigqueryreservation.googleapis.com",
    "title": "BigQuery Reservation API",
    "summary": "A service to modify your BigQuery reservations.",
    "category": "Data Analytics",
    "permissionPrefix": "bigquery.reservations",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/bigquery/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/bigqueryreservation.googleapis.com"
  },
  {
    "name": "bigtableadmin.googleapis.com",
    "title": "Cloud Bigtable Admin API",
    "summary": "Administer your Cloud Bigtable tables and instances.",
    "category": "Storage & Databases",
    "permissionPrefix": "bigtableadmin",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/bigtable/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/bigtableadmin.googleapis.com"
  },
  {
    "name": "billingbudgets.googleapis.com",
    "title": "Cloud Billing Budget API",
    "summary": "The Cloud Billing Budget API stores Cloud Billing budgets, which define a budget plan and the rules to execute as spend is tracked against that plan.",
    "category": "Management",
    "permissionPrefix": "billingbudgets",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/billing/docs/how-to/budget-api-overview",
    "consoleUrl": "https://console.cloud.google.com/apis/library/billingbudgets.googleapis.com"
  },
  {
    "name": "binaryauthorization.googleapis.com",
    "title": "Binary Authorization API",
    "summary": "The management interface for Binary Authorization, a service that provides policy-based deployment validation and control for images deployed to Google Kubernetes Engine (GKE), Anthos Service Mesh, Anthos Clusters, and Cloud Run.",
    "category": "DevOps & CI/CD",
    "permissionPrefix": "binaryauthorization",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/binary-authorization/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/binaryauthorization.googleapis.com"
  },
  {
    "name": "blockchainnodeengine.googleapis.com",
    "title": "Blockchain Node Engine API",
    "summary": "Blockchain Node Engine API on Google Cloud.",
    "category": "Storage & Databases",
    "permissionPrefix": "blockchainnodeengine",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/blockchain-node-engine",
    "consoleUrl": "https://console.cloud.google.com/apis/library/blockchainnodeengine.googleapis.com"
  },
  {
    "name": "certificatemanager.googleapis.com",
    "title": "Certificate Manager API",
    "summary": "Certificate Manager API on Google Cloud.",
    "category": "Networking",
    "permissionPrefix": "certificatemanager",
    "stage": "GA",
    "docsUrl": "https://docs.cloud.google.com/certificate-manager/docs/overview",
    "consoleUrl": "https://console.cloud.google.com/apis/library/certificatemanager.googleapis.com"
  },
  {
    "name": "ces.googleapis.com",
    "title": "Gemini Enterprise for Customer Experience API",
    "summary": "Gemini Enterprise for Customer Experience API on Google Cloud.",
    "category": "AI & ML",
    "permissionPrefix": "ces",
    "stage": "GA",
    "docsUrl": "https://docs.cloud.google.com/customer-engagement-ai/conversational-agents/ps",
    "consoleUrl": "https://console.cloud.google.com/apis/library/ces.googleapis.com"
  },
  {
    "name": "cloudasset.googleapis.com",
    "title": "Cloud Asset API",
    "summary": "The Cloud Asset API manages the history and inventory of Google Cloud resources.",
    "category": "Management",
    "permissionPrefix": "cloudasset",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/asset-inventory/docs/quickstart",
    "consoleUrl": "https://console.cloud.google.com/apis/library/cloudasset.googleapis.com"
  },
  {
    "name": "cloudbilling.googleapis.com",
    "title": "Cloud Billing API",
    "summary": "Allows developers to manage billing for their Google Cloud Platform projects programmatically.",
    "category": "Management",
    "permissionPrefix": "billing",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/billing/docs/apis",
    "consoleUrl": "https://console.cloud.google.com/apis/library/cloudbilling.googleapis.com"
  },
  {
    "name": "cloudbuild.googleapis.com",
    "title": "Cloud Build API",
    "summary": "Creates and manages builds on Google Cloud Platform.",
    "category": "DevOps & CI/CD",
    "permissionPrefix": "cloudbuild",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/cloud-build/docs/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/cloudbuild.googleapis.com"
  },
  {
    "name": "cloudchannel.googleapis.com",
    "title": "Cloud Channel API",
    "summary": "The Cloud Channel API enables Google Cloud partners to have a single unified resale platform and APIs across all of Google Cloud including GCP, Workspace, Maps and Chrome.",
    "category": "Integration",
    "permissionPrefix": "cloudchannel",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/channel",
    "consoleUrl": "https://console.cloud.google.com/apis/library/cloudchannel.googleapis.com"
  },
  {
    "name": "cloudcommerceprocurement.googleapis.com",
    "title": "Cloud Commerce Partner Procurement API",
    "summary": "Partner API for the Cloud Commerce Procurement Service.",
    "category": "Management",
    "permissionPrefix": "cloudcommerceprocurement",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/marketplace/docs/partners/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/cloudcommerceprocurement.googleapis.com"
  },
  {
    "name": "cloudcontrolspartner.googleapis.com",
    "title": "Cloud Controls Partner API",
    "summary": "Provides insights about your customers and their Assured Workloads based on your Sovereign Controls by Partners offering.",
    "category": "Management",
    "permissionPrefix": "cloudcontrolspartner",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/sovereign-controls-by-partners/docs/sovereign-partners/reference/rest",
    "consoleUrl": "https://console.cloud.google.com/apis/library/cloudcontrolspartner.googleapis.com"
  },
  {
    "name": "clouddeploy.googleapis.com",
    "title": "Cloud Deploy API",
    "summary": "Cloud Deploy API on Google Cloud.",
    "category": "DevOps & CI/CD",
    "permissionPrefix": "clouddeploy",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/deploy/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/clouddeploy.googleapis.com"
  },
  {
    "name": "clouderrorreporting.googleapis.com",
    "title": "Error Reporting API",
    "summary": "Groups and counts similar errors from cloud services and applications, reports new errors, and provides access to error groups and their associated errors.",
    "category": "Operations",
    "permissionPrefix": "errorreporting",
    "stage": "BETA",
    "docsUrl": "https://cloud.google.com/error-reporting/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/clouderrorreporting.googleapis.com"
  },
  {
    "name": "cloudfunctions.googleapis.com",
    "title": "Cloud Functions API",
    "summary": "Manages lightweight user-provided functions executed in response to events.",
    "category": "Compute",
    "permissionPrefix": "cloudfunctions",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/functions",
    "consoleUrl": "https://console.cloud.google.com/apis/library/cloudfunctions.googleapis.com"
  },
  {
    "name": "cloudidentity.googleapis.com",
    "title": "Cloud Identity API",
    "summary": "API for provisioning and managing identity resources.",
    "category": "Security & Identity",
    "permissionPrefix": "cloudidentity",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/identity/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/cloudidentity.googleapis.com"
  },
  {
    "name": "cloudkms.googleapis.com",
    "title": "Cloud Key Management Service (KMS) API",
    "summary": "Manages keys and performs cryptographic operations in a central cloud service, for direct use by other cloud resources and applications.",
    "category": "Security & Identity",
    "permissionPrefix": "cloudkms",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/kms/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/cloudkms.googleapis.com"
  },
  {
    "name": "cloudlocationfinder.googleapis.com",
    "title": "Cloud Location Finder API",
    "summary": "Cloud Location Finder API on Google Cloud.",
    "category": "Management",
    "permissionPrefix": "cloudlocationfinder",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/location-finder/docs",
    "consoleUrl": "https://console.cloud.google.com/apis/library/cloudlocationfinder.googleapis.com"
  },
  {
    "name": "cloudnumberregistry.googleapis.com",
    "title": "Cloud Number Registry API",
    "summary": "Cloud Number Registry API on Google Cloud.",
    "category": "Management",
    "permissionPrefix": "cloudnumberregistry",
    "stage": "ALPHA",
    "docsUrl": "https://docs.cloud.google.com/number-registry/reference/rest",
    "consoleUrl": "https://console.cloud.google.com/apis/library/cloudnumberregistry.googleapis.com"
  },
  {
    "name": "cloudprofiler.googleapis.com",
    "title": "Cloud Profiler API",
    "summary": "Manages continuous profiling information.",
    "category": "Operations",
    "permissionPrefix": "cloudprofiler",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/profiler/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/cloudprofiler.googleapis.com"
  },
  {
    "name": "cloudresourcemanager.googleapis.com",
    "title": "Cloud Resource Manager API",
    "summary": "Creates, reads, and updates metadata for Google Cloud Platform resource containers.",
    "category": "Management",
    "permissionPrefix": "resourcemanager",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/resource-manager",
    "consoleUrl": "https://console.cloud.google.com/apis/library/cloudresourcemanager.googleapis.com",
    "enabledByDefault": true
  },
  {
    "name": "cloudscheduler.googleapis.com",
    "title": "Cloud Scheduler API",
    "summary": "Creates and manages jobs run on a regular recurring schedule.",
    "category": "Integration",
    "permissionPrefix": "cloudscheduler",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/scheduler/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/cloudscheduler.googleapis.com"
  },
  {
    "name": "cloudshell.googleapis.com",
    "title": "Cloud Shell API",
    "summary": "Allows users to start, configure, and connect to interactive shell sessions running in the cloud.",
    "category": "Management",
    "permissionPrefix": "cloudshell",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/shell/docs/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/cloudshell.googleapis.com"
  },
  {
    "name": "cloudsupport.googleapis.com",
    "title": "Google Cloud Support API",
    "summary": "Manages Google Cloud technical support cases for Customer Care support offerings.",
    "category": "Management",
    "permissionPrefix": "cloudsupport",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/support/docs/apis",
    "consoleUrl": "https://console.cloud.google.com/apis/library/cloudsupport.googleapis.com"
  },
  {
    "name": "cloudtasks.googleapis.com",
    "title": "Cloud Tasks API",
    "summary": "Manages the execution of large numbers of distributed requests.",
    "category": "Integration",
    "permissionPrefix": "cloudtasks",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/tasks/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/cloudtasks.googleapis.com"
  },
  {
    "name": "cloudtrace.googleapis.com",
    "title": "Cloud Trace API",
    "summary": "Sends application trace data to Cloud Trace for viewing. Trace data is collected for all App Engine applications by default. Trace data from other applications can be provided using this API. This library is used to interact with the Cloud Trace API directly. If you are looking to instrument your application for…",
    "category": "Operations",
    "permissionPrefix": "cloudtrace",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/trace/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/cloudtrace.googleapis.com",
    "enabledByDefault": true
  },
  {
    "name": "composer.googleapis.com",
    "title": "Cloud Composer API",
    "summary": "Manages Apache Airflow environments on Google Cloud Platform.",
    "category": "Data Analytics",
    "permissionPrefix": "composer",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/composer/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/composer.googleapis.com"
  },
  {
    "name": "config.googleapis.com",
    "title": "Infrastructure Manager API",
    "summary": "Creates and manages Google Cloud Platform resources and infrastructure.",
    "category": "DevOps & CI/CD",
    "permissionPrefix": "config",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/infrastructure-manager/docs",
    "consoleUrl": "https://console.cloud.google.com/apis/library/config.googleapis.com"
  },
  {
    "name": "connectors.googleapis.com",
    "title": "Connectors API",
    "summary": "Enables users to create and manage connections to Google Cloud services and third-party business applications using the Connectors interface.",
    "category": "Integration",
    "permissionPrefix": "connectors",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/apigee/docs/api-platform/connectors/about-connectors",
    "consoleUrl": "https://console.cloud.google.com/apis/library/connectors.googleapis.com"
  },
  {
    "name": "contactcenteraiplatform.googleapis.com",
    "title": "Contact Center AI Platform API",
    "summary": "Contact Center AI Platform API on Google Cloud.",
    "category": "AI & ML",
    "permissionPrefix": "contactcenteraiplatform",
    "stage": "ALPHA",
    "docsUrl": "https://cloud.google.com/solutions/contact-center-ai-platform",
    "consoleUrl": "https://console.cloud.google.com/apis/library/contactcenteraiplatform.googleapis.com"
  },
  {
    "name": "contactcenterinsights.googleapis.com",
    "title": "Contact Center AI Insights API",
    "summary": "Contact Center AI Insights API on Google Cloud.",
    "category": "AI & ML",
    "permissionPrefix": "contactcenterinsights",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/contact-center/insights/docs",
    "consoleUrl": "https://console.cloud.google.com/apis/library/contactcenterinsights.googleapis.com"
  },
  {
    "name": "container.googleapis.com",
    "title": "Kubernetes Engine API",
    "summary": "Builds and manages container-based applications, powered by the open source Kubernetes technology.",
    "category": "Compute",
    "permissionPrefix": "container",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/kubernetes-engine/docs/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/container.googleapis.com"
  },
  {
    "name": "containeranalysis.googleapis.com",
    "title": "Container Analysis API",
    "summary": "This API is a prerequisite for leveraging Artifact Analysis scanning capabilities in Artifact Registry. In addition, the Container Analysis API is an implementation of the Grafeas API, which enables storing, querying, and retrieval of critical metadata about all of your software artifacts.",
    "category": "DevOps & CI/CD",
    "permissionPrefix": "containeranalysis",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/container-analysis/api/reference/rest/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/containeranalysis.googleapis.com"
  },
  {
    "name": "contentwarehouse.googleapis.com",
    "title": "Document AI Warehouse API",
    "summary": "Document AI Warehouse API on Google Cloud.",
    "category": "AI & ML",
    "permissionPrefix": "contentwarehouse",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/document-warehouse",
    "consoleUrl": "https://console.cloud.google.com/apis/library/contentwarehouse.googleapis.com"
  },
  {
    "name": "datacatalog.googleapis.com",
    "title": "Google Cloud Data Catalog API",
    "summary": "A fully managed and highly scalable data discovery and metadata management service.",
    "category": "Data Analytics",
    "permissionPrefix": "datacatalog",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/data-catalog/docs/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/datacatalog.googleapis.com"
  },
  {
    "name": "dataflow.googleapis.com",
    "title": "Dataflow API",
    "summary": "Manages Google Cloud Dataflow projects on Google Cloud Platform.",
    "category": "Data Analytics",
    "permissionPrefix": "dataflow",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/dataflow",
    "consoleUrl": "https://console.cloud.google.com/apis/library/dataflow.googleapis.com"
  },
  {
    "name": "dataform.googleapis.com",
    "title": "Dataform API",
    "summary": "Service to develop, version control, and operationalize SQL pipelines in BigQuery.",
    "category": "Data Analytics",
    "permissionPrefix": "dataform",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/dataform/docs",
    "consoleUrl": "https://console.cloud.google.com/apis/library/dataform.googleapis.com"
  },
  {
    "name": "datafusion.googleapis.com",
    "title": "Cloud Data Fusion API",
    "summary": "Cloud Data Fusion is a fully-managed, cloud native, enterprise data integration service for quickly building and managing data pipelines. It provides a graphical interface to increase time efficiency and reduce complexity, and allows business users, developers, and data scientists to easily and reliably build…",
    "category": "Data Analytics",
    "permissionPrefix": "datafusion",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/data-fusion/docs",
    "consoleUrl": "https://console.cloud.google.com/apis/library/datafusion.googleapis.com"
  },
  {
    "name": "datalabeling.googleapis.com",
    "title": "Data Labeling API",
    "summary": "Public API for Google Cloud AI Data Labeling Service.",
    "category": "Data Analytics",
    "permissionPrefix": "datalabeling",
    "stage": "BETA",
    "docsUrl": "https://cloud.google.com/data-labeling/docs/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/datalabeling.googleapis.com"
  },
  {
    "name": "datalineage.googleapis.com",
    "title": "Data Lineage API",
    "summary": "Data Lineage API on Google Cloud.",
    "category": "Data Analytics",
    "permissionPrefix": "datalineage",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/data-catalog",
    "consoleUrl": "https://console.cloud.google.com/apis/library/datalineage.googleapis.com"
  },
  {
    "name": "datamigration.googleapis.com",
    "title": "Database Migration API",
    "summary": "Manage Cloud Database Migration Service resources on Google Cloud Platform.",
    "category": "Data Analytics",
    "permissionPrefix": "datamigration",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/database-migration/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/datamigration.googleapis.com"
  },
  {
    "name": "datapipelines.googleapis.com",
    "title": "Data pipelines API",
    "summary": "Data Pipelines provides an interface for creating, updating, and managing recurring Data Analytics jobs.",
    "category": "Data Analytics",
    "permissionPrefix": "datapipelines",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/dataflow/docs/guides/data-pipelines",
    "consoleUrl": "https://console.cloud.google.com/apis/library/datapipelines.googleapis.com"
  },
  {
    "name": "dataplex.googleapis.com",
    "title": "Cloud Dataplex API",
    "summary": "A unified, intelligent governance solution for data and AI assets.",
    "category": "Data Analytics",
    "permissionPrefix": "dataplex",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/dataplex/docs",
    "consoleUrl": "https://console.cloud.google.com/apis/library/dataplex.googleapis.com"
  },
  {
    "name": "dataproc.googleapis.com",
    "title": "Cloud Dataproc API",
    "summary": "Manages Hadoop-based clusters and jobs on Google Cloud Platform.",
    "category": "Data Analytics",
    "permissionPrefix": "dataproc",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/dataproc/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/dataproc.googleapis.com"
  },
  {
    "name": "datastore.googleapis.com",
    "title": "Cloud Datastore API",
    "summary": "Accesses the schemaless NoSQL database to provide fully managed, robust, scalable storage for your application.",
    "category": "Storage & Databases",
    "permissionPrefix": "datastore",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/datastore/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/datastore.googleapis.com",
    "enabledByDefault": true
  },
  {
    "name": "datastream.googleapis.com",
    "title": "Datastream API",
    "summary": "Datastream API on Google Cloud.",
    "category": "Data Analytics",
    "permissionPrefix": "datastream",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/datastream/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/datastream.googleapis.com"
  },
  {
    "name": "deploymentmanager.googleapis.com",
    "title": "Cloud Deployment Manager V2 API",
    "summary": "The Google Cloud Deployment Manager v2 API provides services for configuring, deploying, and viewing Google Cloud services and APIs via templates which specify deployments of Cloud resources.",
    "category": "DevOps & CI/CD",
    "permissionPrefix": "deploymentmanager",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/deployment-manager",
    "consoleUrl": "https://console.cloud.google.com/apis/library/deploymentmanager.googleapis.com"
  },
  {
    "name": "developerconnect.googleapis.com",
    "title": "Developer Connect API",
    "summary": "Connect third-party source code management to Google",
    "category": "DevOps & CI/CD",
    "permissionPrefix": "developerconnect",
    "stage": "GA",
    "docsUrl": "http://cloud.google.com/developer-connect/docs/overview",
    "consoleUrl": "https://console.cloud.google.com/apis/library/developerconnect.googleapis.com"
  },
  {
    "name": "dialogflow.googleapis.com",
    "title": "Dialogflow API",
    "summary": "Builds conversational interfaces (for example, chatbots, and voice-powered apps and devices).",
    "category": "AI & ML",
    "permissionPrefix": "dialogflow",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/dialogflow/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/dialogflow.googleapis.com"
  },
  {
    "name": "discoveryengine.googleapis.com",
    "title": "Discovery Engine API",
    "summary": "Discovery Engine API.",
    "category": "AI & ML",
    "permissionPrefix": "discoveryengine",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/generative-ai-app-builder/docs/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/discoveryengine.googleapis.com"
  },
  {
    "name": "dlp.googleapis.com",
    "title": "Sensitive Data Protection (DLP)",
    "summary": "Discover and protect your sensitive data. A fully managed service designed to help you discover, classify, and protect your valuable data assets with ease.",
    "category": "Security & Identity",
    "permissionPrefix": "dlp",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/sensitive-data-protection/docs/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/dlp.googleapis.com"
  },
  {
    "name": "dns.googleapis.com",
    "title": "Cloud DNS API",
    "summary": "Cloud DNS API on Google Cloud.",
    "category": "Networking",
    "permissionPrefix": "dns",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/dns/docs",
    "consoleUrl": "https://console.cloud.google.com/apis/library/dns.googleapis.com"
  },
  {
    "name": "documentai.googleapis.com",
    "title": "Cloud Document AI API",
    "summary": "Service to parse structured information from unstructured or semi-structured documents using state-of-the-art Google AI such as natural language, computer vision, translation, and AutoML.",
    "category": "AI & ML",
    "permissionPrefix": "documentai",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/document-ai/docs/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/documentai.googleapis.com"
  },
  {
    "name": "domains.googleapis.com",
    "title": "Cloud Domains API",
    "summary": "Enables management and configuration of domain names.",
    "category": "Networking",
    "permissionPrefix": "domains",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/domains/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/domains.googleapis.com"
  },
  {
    "name": "essentialcontacts.googleapis.com",
    "title": "Essential Contacts API",
    "summary": "Essential Contacts API on Google Cloud.",
    "category": "Management",
    "permissionPrefix": "essentialcontacts",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/essentialcontacts/docs/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/essentialcontacts.googleapis.com"
  },
  {
    "name": "eventarc.googleapis.com",
    "title": "Eventarc API",
    "summary": "Build event-driven applications on Google Cloud Platform.",
    "category": "Integration",
    "permissionPrefix": "eventarc",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/eventarc",
    "consoleUrl": "https://console.cloud.google.com/apis/library/eventarc.googleapis.com"
  },
  {
    "name": "file.googleapis.com",
    "title": "Cloud Filestore API",
    "summary": "The Cloud Filestore API is used for creating and managing cloud file servers.",
    "category": "Storage & Databases",
    "permissionPrefix": "file",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/filestore/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/file.googleapis.com"
  },
  {
    "name": "firestore.googleapis.com",
    "title": "Cloud Firestore API",
    "summary": "Accesses the NoSQL document database built for automatic scaling, high performance, and ease of application development.",
    "category": "Storage & Databases",
    "permissionPrefix": "datastore",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/firestore",
    "consoleUrl": "https://console.cloud.google.com/apis/library/firestore.googleapis.com"
  },
  {
    "name": "gkebackup.googleapis.com",
    "title": "Backup for GKE API",
    "summary": "Backup for GKE is a managed Kubernetes workload backup and restore service for GKE clusters.",
    "category": "Storage & Databases",
    "permissionPrefix": "gkebackup",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/kubernetes-engine/docs/add-on/backup-for-gke",
    "consoleUrl": "https://console.cloud.google.com/apis/library/gkebackup.googleapis.com"
  },
  {
    "name": "gkehub.googleapis.com",
    "title": "GKE Hub API",
    "summary": "GKE Hub API on Google Cloud.",
    "category": "DevOps & CI/CD",
    "permissionPrefix": "gkehub",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/anthos/multicluster-management/connect/registering-a-cluster",
    "consoleUrl": "https://console.cloud.google.com/apis/library/gkehub.googleapis.com"
  },
  {
    "name": "gkeonprem.googleapis.com",
    "title": "GKE On-Prem API",
    "summary": "GKE On-Prem API on Google Cloud.",
    "category": "DevOps & CI/CD",
    "permissionPrefix": "gkeonprem",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/anthos/clusters/docs/on-prem/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/gkeonprem.googleapis.com"
  },
  {
    "name": "healthcare.googleapis.com",
    "title": "Cloud Healthcare API",
    "summary": "Manage, store, and access healthcare data in Google Cloud Platform.",
    "category": "Storage & Databases",
    "permissionPrefix": "healthcare",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/healthcare",
    "consoleUrl": "https://console.cloud.google.com/apis/library/healthcare.googleapis.com"
  },
  {
    "name": "hypercomputecluster.googleapis.com",
    "title": "Cluster Director API",
    "summary": "The Cluster Director API allows you to deploy, manage, and monitor clusters that run AI, ML, or HPC workloads.",
    "category": "Compute",
    "permissionPrefix": "hypercomputecluster",
    "stage": "GA",
    "docsUrl": "https://docs.cloud.google.com/cluster-director/docs",
    "consoleUrl": "https://console.cloud.google.com/apis/library/hypercomputecluster.googleapis.com"
  },
  {
    "name": "iam.googleapis.com",
    "title": "Identity and Access Management (IAM) API",
    "summary": "Manages identity and access control for Google Cloud resources, including the creation of service accounts, which you can use to authenticate to Google and make API calls. Enabling this API also enables the IAM Service Account Credentials API (iamcredentials.googleapis.com). However, disabling this API doesn't…",
    "category": "Security & Identity",
    "permissionPrefix": "iam",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/iam/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/iam.googleapis.com",
    "enabledByDefault": true
  },
  {
    "name": "iamcredentials.googleapis.com",
    "title": "IAM Service Account Credentials API",
    "summary": "Creates short-lived credentials for impersonating IAM service accounts. Disabling this API also disables the IAM API (iam.googleapis.com). However, enabling this API doesn't enable the IAM API.",
    "category": "Security & Identity",
    "permissionPrefix": "iam.serviceAccounts",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/iam/docs/creating-short-lived-service-account-credentials",
    "consoleUrl": "https://console.cloud.google.com/apis/library/iamcredentials.googleapis.com",
    "enabledByDefault": true
  },
  {
    "name": "iap.googleapis.com",
    "title": "Cloud Identity-Aware Proxy API",
    "summary": "Controls access to cloud applications running on Google Cloud Platform.",
    "category": "Security & Identity",
    "permissionPrefix": "iap",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/iap",
    "consoleUrl": "https://console.cloud.google.com/apis/library/iap.googleapis.com"
  },
  {
    "name": "identitytoolkit.googleapis.com",
    "title": "Identity Toolkit API",
    "summary": "The Google Identity Toolkit API lets you use open standards to verify a user's identity.",
    "category": "Security & Identity",
    "permissionPrefix": "identitytoolkit",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/identity-platform",
    "consoleUrl": "https://console.cloud.google.com/apis/library/identitytoolkit.googleapis.com"
  },
  {
    "name": "ids.googleapis.com",
    "title": "Cloud IDS API",
    "summary": "Cloud IDS (Cloud Intrusion Detection System) detects malware, spyware, command-and-control attacks, and other network-based threats. Its security efficacy is industry leading, built with Palo Alto Networks technologies. When you use this product, your organization name and consumption levels will be shared with Palo…",
    "category": "Security & Identity",
    "permissionPrefix": "ids",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/ids.googleapis.com"
  },
  {
    "name": "integrations.googleapis.com",
    "title": "Application Integration API",
    "summary": "Application Integration API on Google Cloud.",
    "category": "Integration",
    "permissionPrefix": "integrations",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/application-integration",
    "consoleUrl": "https://console.cloud.google.com/apis/library/integrations.googleapis.com"
  },
  {
    "name": "jobs.googleapis.com",
    "title": "Cloud Talent Solution API",
    "summary": "Cloud Talent Solution provides the capability to create, read, update, and delete job postings, as well as search jobs based on keywords and filters.",
    "category": "AI & ML",
    "permissionPrefix": "jobs",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/talent-solution/job-search/docs/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/jobs.googleapis.com"
  },
  {
    "name": "kmsinventory.googleapis.com",
    "title": "KMS Inventory API",
    "summary": "KMS Inventory API on Google Cloud.",
    "category": "Security & Identity",
    "permissionPrefix": "kmsinventory",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/kms/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/kmsinventory.googleapis.com"
  },
  {
    "name": "language.googleapis.com",
    "title": "Cloud Natural Language API",
    "summary": "Provides natural language understanding technologies, such as sentiment analysis, entity recognition, entity sentiment analysis, and other text annotations, to developers.",
    "category": "AI & ML",
    "permissionPrefix": "language",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/natural-language/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/language.googleapis.com"
  },
  {
    "name": "libraryagent.googleapis.com",
    "title": "Library Agent API",
    "summary": "A simple Google Example Library API.",
    "category": "AI & ML",
    "permissionPrefix": "libraryagent",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/docs/quota",
    "consoleUrl": "https://console.cloud.google.com/apis/library/libraryagent.googleapis.com"
  },
  {
    "name": "logging.googleapis.com",
    "title": "Cloud Logging API",
    "summary": "Writes log entries and manages your Cloud Logging configuration.",
    "category": "Operations",
    "permissionPrefix": "logging",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/logging/docs/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/logging.googleapis.com",
    "enabledByDefault": true
  },
  {
    "name": "looker.googleapis.com",
    "title": "Looker (Google Cloud core) API",
    "summary": "Looker (Google Cloud core) API on Google Cloud.",
    "category": "Data Analytics",
    "permissionPrefix": "looker",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/looker/docs/reference/rest/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/looker.googleapis.com"
  },
  {
    "name": "managedidentities.googleapis.com",
    "title": "Managed Service for Microsoft Active Directory API",
    "summary": "The Managed Service for Microsoft Active Directory API is used for managing a highly available, hardened service running Microsoft Active Directory (AD).",
    "category": "Security & Identity",
    "permissionPrefix": "managedidentities",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/managed-microsoft-ad/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/managedidentities.googleapis.com"
  },
  {
    "name": "managedkafka.googleapis.com",
    "title": "Managed Service for Apache Kafka API",
    "summary": "Manage Apache Kafka clusters and resources.",
    "category": "Data Analytics",
    "permissionPrefix": "managedkafka",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/managed-service-for-apache-kafka/docs",
    "consoleUrl": "https://console.cloud.google.com/apis/library/managedkafka.googleapis.com"
  },
  {
    "name": "memcache.googleapis.com",
    "title": "Cloud Memorystore for Memcached API",
    "summary": "Google Cloud Memorystore for Memcached API is used for creating and managing Memcached instances in GCP.",
    "category": "Storage & Databases",
    "permissionPrefix": "memcache",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/memorystore/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/memcache.googleapis.com"
  },
  {
    "name": "metastore.googleapis.com",
    "title": "Dataproc Metastore API",
    "summary": "The Dataproc Metastore API is used to manage the lifecycle and configuration of metastore services.",
    "category": "Data Analytics",
    "permissionPrefix": "metastore",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/dataproc-metastore/docs",
    "consoleUrl": "https://console.cloud.google.com/apis/library/metastore.googleapis.com"
  },
  {
    "name": "migrationcenter.googleapis.com",
    "title": "Migration Center API",
    "summary": "A unified platform that helps you accelerate your end-to-end cloud journey from your current on-premises or cloud environments to Google Cloud.",
    "category": "Management",
    "permissionPrefix": "migrationcenter",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/migration-center",
    "consoleUrl": "https://console.cloud.google.com/apis/library/migrationcenter.googleapis.com"
  },
  {
    "name": "ml.googleapis.com",
    "title": "AI Platform Training & Prediction API",
    "summary": "An API to enable creating and using machine learning models.",
    "category": "AI & ML",
    "permissionPrefix": "ml",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/ml/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/ml.googleapis.com"
  },
  {
    "name": "monitoring.googleapis.com",
    "title": "Cloud Monitoring API",
    "summary": "Manages your Cloud Monitoring data and configurations.",
    "category": "Operations",
    "permissionPrefix": "monitoring",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/monitoring/api/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/monitoring.googleapis.com",
    "enabledByDefault": true
  },
  {
    "name": "netapp.googleapis.com",
    "title": "NetApp API",
    "summary": "Google Cloud NetApp Volumes is a fully-managed, cloud-based data storage service that provides advanced data management capabilities and highly scalable performance with global availability.",
    "category": "Storage & Databases",
    "permissionPrefix": "netapp",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/netapp/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/netapp.googleapis.com"
  },
  {
    "name": "networkconnectivity.googleapis.com",
    "title": "Network Connectivity API",
    "summary": "This API enables connectivity with and between Google Cloud resources.",
    "category": "Networking",
    "permissionPrefix": "networkconnectivity",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/network-connectivity/docs/reference/networkconnectivity/rest",
    "consoleUrl": "https://console.cloud.google.com/apis/library/networkconnectivity.googleapis.com"
  },
  {
    "name": "networkmanagement.googleapis.com",
    "title": "Network Management API",
    "summary": "The Network Management API provides a collection of network performance monitoring and diagnostic capabilities.",
    "category": "Networking",
    "permissionPrefix": "networkmanagement",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/networkmanagement.googleapis.com"
  },
  {
    "name": "networksecurity.googleapis.com",
    "title": "Network Security API",
    "summary": "Network Security API on Google Cloud.",
    "category": "Networking",
    "permissionPrefix": "networksecurity",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/networking",
    "consoleUrl": "https://console.cloud.google.com/apis/library/networksecurity.googleapis.com"
  },
  {
    "name": "networkservices.googleapis.com",
    "title": "Network Services API",
    "summary": "Network Services API on Google Cloud.",
    "category": "AI & ML",
    "permissionPrefix": "networkservices",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/networking",
    "consoleUrl": "https://console.cloud.google.com/apis/library/networkservices.googleapis.com"
  },
  {
    "name": "notebooks.googleapis.com",
    "title": "Notebooks API",
    "summary": "Notebooks API is used to manage notebook resources in Google Cloud.",
    "category": "AI & ML",
    "permissionPrefix": "notebooks",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/notebooks/docs/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/notebooks.googleapis.com"
  },
  {
    "name": "observability.googleapis.com",
    "title": "Observability API",
    "summary": "Provides functionality for configuring the observability scope, which controls the log, metric, and trace data that you can view.",
    "category": "Operations",
    "permissionPrefix": "observability",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/stackdriver/docs/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/observability.googleapis.com"
  },
  {
    "name": "ondemandscanning.googleapis.com",
    "title": "On-Demand Scanning API",
    "summary": "A service to scan container images for vulnerabilities.",
    "category": "DevOps & CI/CD",
    "permissionPrefix": "ondemandscanning",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/container-analysis/docs/on-demand-scanning/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/ondemandscanning.googleapis.com"
  },
  {
    "name": "oracledatabase.googleapis.com",
    "title": "Oracle Database@Google Cloud API",
    "summary": "The Oracle Database@Google Cloud API provides a set of APIs to manage Oracle database services, such as Exadata and Autonomous Databases.",
    "category": "Storage & Databases",
    "permissionPrefix": "oracledatabase",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/oracle/database/docs",
    "consoleUrl": "https://console.cloud.google.com/apis/library/oracledatabase.googleapis.com"
  },
  {
    "name": "orgpolicy.googleapis.com",
    "title": "Organization Policy API",
    "summary": "The Organization Policy API allows users to configure governance rules on their Google Cloud resources across the resource hierarchy.",
    "category": "Management",
    "permissionPrefix": "orgpolicy",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/orgpolicy/docs/reference/rest/index.html",
    "consoleUrl": "https://console.cloud.google.com/apis/library/orgpolicy.googleapis.com"
  },
  {
    "name": "osconfig.googleapis.com",
    "title": "OS Config API",
    "summary": "OS management tools that can be used for patch management, patch compliance, and configuration management on VM instances.",
    "category": "Management",
    "permissionPrefix": "osconfig",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/compute/docs/osconfig/rest",
    "consoleUrl": "https://console.cloud.google.com/apis/library/osconfig.googleapis.com"
  },
  {
    "name": "oslogin.googleapis.com",
    "title": "Cloud OS Login API",
    "summary": "You can use OS Login to manage access to your VM instances using IAM roles.",
    "category": "Security & Identity",
    "permissionPrefix": "oslogin",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/compute/docs/oslogin/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/oslogin.googleapis.com",
    "enabledByDefault": true
  },
  {
    "name": "parallelstore.googleapis.com",
    "title": "Parallelstore API",
    "summary": "Parallelstore API on Google Cloud.",
    "category": "Storage & Databases",
    "permissionPrefix": "parallelstore",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/parallelstore",
    "consoleUrl": "https://console.cloud.google.com/apis/library/parallelstore.googleapis.com"
  },
  {
    "name": "parametermanager.googleapis.com",
    "title": "Parameter Manager API",
    "summary": "Parameter Manager is a single source of truth to store, access and manage the lifecycle of your workload parameters. Parameter Manager aims to make management of sensitive application parameters effortless for customers without diminishing focus on security.",
    "category": "Security & Identity",
    "permissionPrefix": "parametermanager",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/secret-manager/parameter-manager/docs/overview",
    "consoleUrl": "https://console.cloud.google.com/apis/library/parametermanager.googleapis.com"
  },
  {
    "name": "playgrouping.googleapis.com",
    "title": "Google Play Grouping API",
    "summary": "playgrouping.googleapis.com API.",
    "category": "Management",
    "permissionPrefix": "playgrouping",
    "stage": "ALPHA",
    "docsUrl": "https://cloud.google.com/playgrouping/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/playgrouping.googleapis.com"
  },
  {
    "name": "policysimulator.googleapis.com",
    "title": "Policy Simulator API",
    "summary": "Policy Simulator is a collection of endpoints for creating, running, and viewing a [Replay][google.cloud.policysimulator.v1.Replay]. A `Replay` is a type of simulation that lets you see how your members' access to resources might change if you changed your IAM policy. During a `Replay`, Policy Simulator re-evaluates…",
    "category": "Management",
    "permissionPrefix": "policysimulator",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/iam/docs/simulating-access",
    "consoleUrl": "https://console.cloud.google.com/apis/library/policysimulator.googleapis.com"
  },
  {
    "name": "policytroubleshooter.googleapis.com",
    "title": "Policy Troubleshooter API",
    "summary": "Policy Troubleshooter API on Google Cloud.",
    "category": "Management",
    "permissionPrefix": "policytroubleshooter",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/iam/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/policytroubleshooter.googleapis.com"
  },
  {
    "name": "privateca.googleapis.com",
    "title": "Certificate Authority API",
    "summary": "The Certificate Authority Service API is a highly-available, scalable service that enables you to simplify and automate the management of private certificate authorities (CAs) while staying in control of your private keys.",
    "category": "Security & Identity",
    "permissionPrefix": "privateca",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/privateca.googleapis.com"
  },
  {
    "name": "publicca.googleapis.com",
    "title": "Public Certificate Authority API",
    "summary": "The Public Certificate Authority API may be used to create and manage ACME external account binding keys associated with Google Trust Services' publicly trusted certificate authority.",
    "category": "Security & Identity",
    "permissionPrefix": "publicca",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/public-certificate-authority/docs",
    "consoleUrl": "https://console.cloud.google.com/apis/library/publicca.googleapis.com"
  },
  {
    "name": "pubsub.googleapis.com",
    "title": "Cloud Pub/Sub API",
    "summary": "Provides reliable, many-to-many, asynchronous messaging between applications.",
    "category": "Data Analytics",
    "permissionPrefix": "pubsub",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/pubsub/docs",
    "consoleUrl": "https://console.cloud.google.com/apis/library/pubsub.googleapis.com",
    "enabledByDefault": true
  },
  {
    "name": "pubsublite.googleapis.com",
    "title": "Pub/Sub Lite API",
    "summary": "Pub/Sub Lite API on Google Cloud.",
    "category": "Data Analytics",
    "permissionPrefix": "pubsublite",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/pubsub/lite/docs",
    "consoleUrl": "https://console.cloud.google.com/apis/library/pubsublite.googleapis.com"
  },
  {
    "name": "rapidmigrationassessment.googleapis.com",
    "title": "Rapid Migration Assessment API",
    "summary": "The Rapid Migration Assessment service is our first-party migration assessment and planning tool.",
    "category": "Management",
    "permissionPrefix": "rapidmigrationassessment",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/migration-center",
    "consoleUrl": "https://console.cloud.google.com/apis/library/rapidmigrationassessment.googleapis.com"
  },
  {
    "name": "recaptchaenterprise.googleapis.com",
    "title": "reCAPTCHA Enterprise API",
    "summary": "Help protect your website from fraudulent activity, spam, and abuse without creating friction.",
    "category": "Security & Identity",
    "permissionPrefix": "recaptchaenterprise",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/recaptcha-enterprise/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/recaptchaenterprise.googleapis.com"
  },
  {
    "name": "recommendationengine.googleapis.com",
    "title": "Recommendations AI (Beta)",
    "summary": "Note that we now highly recommend new customers to use Retail API, which incorporates the GA version of the Recommendations AI funtionalities. To enable Retail API, please visit https://console.cloud.google.com/apis/library/retail.googleapis.com. The Recommendations AI service enables customers to build end-to-end…",
    "category": "AI & ML",
    "permissionPrefix": "recommendationengine",
    "stage": "BETA",
    "docsUrl": "https://cloud.google.com/recommendations-ai/docs",
    "consoleUrl": "https://console.cloud.google.com/apis/library/recommendationengine.googleapis.com"
  },
  {
    "name": "recommender.googleapis.com",
    "title": "Recommender API",
    "summary": "Recommender API on Google Cloud.",
    "category": "Management",
    "permissionPrefix": "recommender",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/recommender/docs/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/recommender.googleapis.com"
  },
  {
    "name": "redis.googleapis.com",
    "title": "Google Cloud Memorystore for Redis API",
    "summary": "Creates and manages Redis instances on the Google Cloud Platform.",
    "category": "Storage & Databases",
    "permissionPrefix": "redis",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/memorystore/docs/redis/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/redis.googleapis.com"
  },
  {
    "name": "retail.googleapis.com",
    "title": "Vertex AI Search for commerce API",
    "summary": "Vertex AI Search for commerce API is made up of Retail Search, Browse and Recommendations. These discovery AI solutions help you implement personalized search, browse and recommendations, based on machine learning models, across your websites and mobile applications.",
    "category": "AI & ML",
    "permissionPrefix": "retail",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/recommendations",
    "consoleUrl": "https://console.cloud.google.com/apis/library/retail.googleapis.com"
  },
  {
    "name": "run.googleapis.com",
    "title": "Cloud Run Admin API",
    "summary": "Deploy and manage user provided container images that scale automatically based on incoming requests. The Cloud Run Admin API v1 follows the Knative Serving API specification, while v2 is aligned with Google Cloud AIP-based API standards, as described in https://google.aip.dev/.",
    "category": "Compute",
    "permissionPrefix": "run",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/run/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/run.googleapis.com"
  },
  {
    "name": "runtimeconfig.googleapis.com",
    "title": "Cloud Runtime Configuration API",
    "summary": "The Runtime Configurator allows you to dynamically configure and expose variables through Google Cloud Platform. In addition, you can also set Watchers and Waiters that will watch for changes to your data and return based on certain conditions.",
    "category": "Compute",
    "permissionPrefix": "runtimeconfig",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/deployment-manager/runtime-configurator/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/runtimeconfig.googleapis.com"
  },
  {
    "name": "saasservicemgmt.googleapis.com",
    "title": "App Lifecycle Manager API",
    "summary": "Model, deploy, and operate your SaaS at scale.",
    "category": "Management",
    "permissionPrefix": "saasservicemgmt",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/saas-runtime/docs",
    "consoleUrl": "https://console.cloud.google.com/apis/library/saasservicemgmt.googleapis.com"
  },
  {
    "name": "secretmanager.googleapis.com",
    "title": "Secret Manager API",
    "summary": "Stores sensitive data such as API keys, passwords, and certificates. Provides convenience while improving security.",
    "category": "Security & Identity",
    "permissionPrefix": "secretmanager",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/secret-manager/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/secretmanager.googleapis.com"
  },
  {
    "name": "securesourcemanager.googleapis.com",
    "title": "Secure Source Manager API",
    "summary": "Regionally deployed, single-tenant managed source code repository hosted on Google Cloud.",
    "category": "DevOps & CI/CD",
    "permissionPrefix": "securesourcemanager",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/secure-source-manager",
    "consoleUrl": "https://console.cloud.google.com/apis/library/securesourcemanager.googleapis.com"
  },
  {
    "name": "securitycenter.googleapis.com",
    "title": "Security Command Center API",
    "summary": "Security Command Center API provides access to temporal views of assets and findings within an organization.",
    "category": "Security & Identity",
    "permissionPrefix": "securitycenter",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/security-command-center",
    "consoleUrl": "https://console.cloud.google.com/apis/library/securitycenter.googleapis.com"
  },
  {
    "name": "securityposture.googleapis.com",
    "title": "Security Posture API",
    "summary": "Defines, assesses, and monitors the overall status of your security in Google Cloud. You can use security postures to evaluate your current cloud security against defined benchmarks and help maintain the level of security that your organization requires.",
    "category": "Security & Identity",
    "permissionPrefix": "securityposture",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/security-command-center",
    "consoleUrl": "https://console.cloud.google.com/apis/library/securityposture.googleapis.com"
  },
  {
    "name": "serviceconsumermanagement.googleapis.com",
    "title": "Service Consumer Management API",
    "summary": "Manages the service consumers of a Service Infrastructure service.",
    "category": "Management",
    "permissionPrefix": "serviceconsumermanagement",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/service-consumer-management/docs/overview",
    "consoleUrl": "https://console.cloud.google.com/apis/library/serviceconsumermanagement.googleapis.com"
  },
  {
    "name": "servicecontrol.googleapis.com",
    "title": "Service Control API",
    "summary": "Provides admission control and telemetry reporting for services integrated with Service Infrastructure.",
    "category": "Integration",
    "permissionPrefix": "servicecontrol",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/service-control/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/servicecontrol.googleapis.com"
  },
  {
    "name": "servicedirectory.googleapis.com",
    "title": "Service Directory API",
    "summary": "Service Directory is a platform for discovering, publishing, and connecting services.",
    "category": "Integration",
    "permissionPrefix": "servicedirectory",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/service-directory",
    "consoleUrl": "https://console.cloud.google.com/apis/library/servicedirectory.googleapis.com"
  },
  {
    "name": "servicemanagement.googleapis.com",
    "title": "Service Management API",
    "summary": "Google Service Management allows service producers to publish their services on Google Cloud Platform so that they can be discovered and used by service consumers.",
    "category": "Management",
    "permissionPrefix": "servicemanagement",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/service-management/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/servicemanagement.googleapis.com",
    "enabledByDefault": true
  },
  {
    "name": "servicenetworking.googleapis.com",
    "title": "Service Networking API",
    "summary": "Provides automatic management of network configurations necessary for certain services.",
    "category": "Networking",
    "permissionPrefix": "servicenetworking",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/service-infrastructure/docs/service-networking/getting-started",
    "consoleUrl": "https://console.cloud.google.com/apis/library/servicenetworking.googleapis.com"
  },
  {
    "name": "serviceusage.googleapis.com",
    "title": "Service Usage API",
    "summary": "Enables services that service consumers want to use on Google Cloud Platform, lists the available or enabled services, or disables services that service consumers no longer use.",
    "category": "Management",
    "permissionPrefix": "serviceusage",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/service-usage/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/serviceusage.googleapis.com",
    "enabledByDefault": true
  },
  {
    "name": "spanner.googleapis.com",
    "title": "Cloud Spanner API",
    "summary": "Cloud Spanner is a managed, mission-critical, globally consistent and scalable relational database service.",
    "category": "Storage & Databases",
    "permissionPrefix": "spanner",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/spanner/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/spanner.googleapis.com"
  },
  {
    "name": "speech.googleapis.com",
    "title": "Cloud Speech-to-Text API",
    "summary": "Converts audio to text by applying powerful neural network models.",
    "category": "AI & ML",
    "permissionPrefix": "speech",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/speech-to-text/docs/quickstart-protocol",
    "consoleUrl": "https://console.cloud.google.com/apis/library/speech.googleapis.com"
  },
  {
    "name": "sqladmin.googleapis.com",
    "title": "Cloud SQL Admin API",
    "summary": "Cloud SQL Admin API",
    "category": "Storage & Databases",
    "permissionPrefix": "cloudsql",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/sql/docs",
    "consoleUrl": "https://console.cloud.google.com/apis/library/sqladmin.googleapis.com"
  },
  {
    "name": "storage.googleapis.com",
    "title": "Cloud Storage API",
    "summary": "Lets you store and retrieve potentially-large, immutable data objects.",
    "category": "Storage & Databases",
    "permissionPrefix": "storage",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/storage/docs/apis",
    "consoleUrl": "https://console.cloud.google.com/apis/library/storage.googleapis.com",
    "enabledByDefault": true
  },
  {
    "name": "storagebatchoperations.googleapis.com",
    "title": "Storage Batch Operations API",
    "summary": "Storage Batch Operations API on Google Cloud.",
    "category": "Storage & Databases",
    "permissionPrefix": "storagebatchoperations",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/storage/docs/batch-operations/overview",
    "consoleUrl": "https://console.cloud.google.com/apis/library/storagebatchoperations.googleapis.com"
  },
  {
    "name": "storagetransfer.googleapis.com",
    "title": "Storage Transfer API",
    "summary": "Transfers data from external data sources to a Google Cloud Storage bucket or between Google Cloud Storage buckets.",
    "category": "Storage & Databases",
    "permissionPrefix": "storagetransfer",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/storage-transfer/docs",
    "consoleUrl": "https://console.cloud.google.com/apis/library/storagetransfer.googleapis.com"
  },
  {
    "name": "sts.googleapis.com",
    "title": "Security Token Service API",
    "summary": "The Security Token Service exchanges Google or third-party credentials for a short-lived access token to Google Cloud resources.",
    "category": "Security & Identity",
    "permissionPrefix": "sts",
    "stage": "GA",
    "docsUrl": "http://cloud.google.com/iam/docs/workload-identity-federation",
    "consoleUrl": "https://console.cloud.google.com/apis/library/sts.googleapis.com"
  },
  {
    "name": "texttospeech.googleapis.com",
    "title": "Cloud Text-to-Speech API",
    "summary": "Synthesizes natural-sounding speech by applying powerful neural network models.",
    "category": "AI & ML",
    "permissionPrefix": "texttospeech",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/text-to-speech/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/texttospeech.googleapis.com"
  },
  {
    "name": "threatintelligence.googleapis.com",
    "title": "Threat Intelligence API",
    "summary": "threatintelligence.googleapis.com API.",
    "category": "Security & Identity",
    "permissionPrefix": "threatintelligence",
    "stage": "BETA",
    "docsUrl": "https://docs.cloud.google.com/threatintelligence/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/threatintelligence.googleapis.com"
  },
  {
    "name": "tpu.googleapis.com",
    "title": "Cloud TPU API",
    "summary": "TPU API provides customers with access to Google TPU technology.",
    "category": "Compute",
    "permissionPrefix": "tpu",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/tpu/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/tpu.googleapis.com"
  },
  {
    "name": "trafficdirector.googleapis.com",
    "title": "Traffic Director API",
    "summary": "Traffic Director API on Google Cloud.",
    "category": "Networking",
    "permissionPrefix": "trafficdirector",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/traffic-director",
    "consoleUrl": "https://console.cloud.google.com/apis/library/trafficdirector.googleapis.com"
  },
  {
    "name": "transcoder.googleapis.com",
    "title": "Transcoder API",
    "summary": "This API converts video files into formats suitable for consumer distribution. For more information, see the Transcoder API overview <https://cloud.google.com/transcoder/docs/concepts/overview>.",
    "category": "Compute",
    "permissionPrefix": "transcoder",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/transcoder/docs/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/transcoder.googleapis.com"
  },
  {
    "name": "translation.googleapis.com",
    "title": "Cloud Translation API",
    "summary": "Integrates text translation into your website or application.",
    "category": "AI & ML",
    "permissionPrefix": "cloudtranslate",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/translate/docs/quickstarts",
    "consoleUrl": "https://console.cloud.google.com/apis/library/translation.googleapis.com"
  },
  {
    "name": "videointelligence.googleapis.com",
    "title": "Cloud Video Intelligence API",
    "summary": "Detects objects, explicit content, and scene changes in videos. It also specifies the region for annotation and transcribes speech to text. Supports both asynchronous API and streaming API.",
    "category": "AI & ML",
    "permissionPrefix": "videointelligence",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/video-intelligence/docs/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/videointelligence.googleapis.com"
  },
  {
    "name": "vision.googleapis.com",
    "title": "Cloud Vision API",
    "summary": "Integrates Google Vision features, including image labeling, face, logo, and landmark detection, optical character recognition (OCR), and detection of explicit content, into applications.",
    "category": "AI & ML",
    "permissionPrefix": "vision",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/vision/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/vision.googleapis.com"
  },
  {
    "name": "vmmigration.googleapis.com",
    "title": "VM Migration API",
    "summary": "Use the Migrate to Virtual Machines API to programmatically migrate workloads.",
    "category": "Management",
    "permissionPrefix": "vmmigration",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/migrate/virtual-machines",
    "consoleUrl": "https://console.cloud.google.com/apis/library/vmmigration.googleapis.com"
  },
  {
    "name": "vmwareengine.googleapis.com",
    "title": "VMware Engine API",
    "summary": "The Google VMware Engine API lets you programmatically manage VMware environments.",
    "category": "Compute",
    "permissionPrefix": "vmwareengine",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/solutions/vmware-as-a-service",
    "consoleUrl": "https://console.cloud.google.com/apis/library/vmwareengine.googleapis.com"
  },
  {
    "name": "vpcaccess.googleapis.com",
    "title": "Serverless VPC Access API",
    "summary": "API for managing VPC access connectors.",
    "category": "Networking",
    "permissionPrefix": "vpcaccess",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/vpc/docs/configure-serverless-vpc-access",
    "consoleUrl": "https://console.cloud.google.com/apis/library/vpcaccess.googleapis.com"
  },
  {
    "name": "webrisk.googleapis.com",
    "title": "Web Risk API",
    "summary": "Web Risk API on Google Cloud.",
    "category": "Security & Identity",
    "permissionPrefix": "webrisk",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/web-risk/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/webrisk.googleapis.com"
  },
  {
    "name": "websecurityscanner.googleapis.com",
    "title": "Web Security Scanner API",
    "summary": "Scans your Compute and App Engine apps for common web vulnerabilities.",
    "category": "Security & Identity",
    "permissionPrefix": "websecurityscanner",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/security-command-center/docs/concepts-web-security-scanner-overview/",
    "consoleUrl": "https://console.cloud.google.com/apis/library/websecurityscanner.googleapis.com"
  },
  {
    "name": "workflowexecutions.googleapis.com",
    "title": "Workflow Executions API",
    "summary": "Execute workflows created with Workflows API.",
    "category": "Integration",
    "permissionPrefix": "workflows.executions",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/workflows",
    "consoleUrl": "https://console.cloud.google.com/apis/library/workflowexecutions.googleapis.com"
  },
  {
    "name": "workflows.googleapis.com",
    "title": "Workflows API",
    "summary": "Manage workflow definitions. To execute workflows and manage executions, see the Workflows Executions API.",
    "category": "Integration",
    "permissionPrefix": "workflows",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/workflows",
    "consoleUrl": "https://console.cloud.google.com/apis/library/workflows.googleapis.com"
  },
  {
    "name": "workloadmanager.googleapis.com",
    "title": "Workload Manager API",
    "summary": "Workload Manager is a service that provides tooling for enterprise workloads to automate the deployment and validation of your workloads against best practices and recommendations.",
    "category": "Management",
    "permissionPrefix": "workloadmanager",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/workload-manager/docs",
    "consoleUrl": "https://console.cloud.google.com/apis/library/workloadmanager.googleapis.com"
  },
  {
    "name": "workstations.googleapis.com",
    "title": "Cloud Workstations API",
    "summary": "Allows administrators to create managed developer environments in the cloud.",
    "category": "Compute",
    "permissionPrefix": "workstations",
    "stage": "GA",
    "docsUrl": "https://cloud.google.com/workstations",
    "consoleUrl": "https://console.cloud.google.com/apis/library/workstations.googleapis.com"
  }
];
