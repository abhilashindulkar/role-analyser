# GCP Project Setup for GitHub Actions

This doc explains how to set up a GCP project so the GitHub Actions workflow can fetch IAM role data without any stored secrets.

## Overview

The workflow uses **Workload Identity Federation (WIF)** — a keyless authentication method where GitHub Actions exchanges its OIDC token for a short-lived GCP access token. No service account keys are created or stored anywhere.

## One-time Setup

### 1. Create a GCP project

```bash
gcloud projects create role-analyser-data --name="Role Analyser Data"
gcloud config set project role-analyser-data
```

### 2. Enable the IAM API

```bash
gcloud services enable iam.googleapis.com
```

### 3. Create a service account

This service account has **no keys** — it's only used as an identity for the workflow.

```bash
gcloud iam service-accounts create role-fetcher \
  --display-name="Role Fetcher for GitHub Actions"
```

Grant it read-only access to list predefined roles:

```bash
gcloud projects add-iam-policy-binding role-analyser-data \
  --member="serviceAccount:role-fetcher@role-analyser-data.iam.gserviceaccount.com" \
  --role="roles/iam.roleViewer"
```

### 4. Create a Workload Identity Pool

```bash
gcloud iam workload-identity-pools create github-pool \
  --location="global" \
  --display-name="GitHub Actions Pool"
```

### 5. Create a Workload Identity Provider

Replace the repository value below if you've forked the project.

```bash
gcloud iam workload-identity-pools providers create-oidc github-provider \
  --location="global" \
  --workload-identity-pool="github-pool" \
  --display-name="GitHub Provider" \
  --attribute-mapping="google.subject=assertion.sub,attribute.repository=assertion.repository" \
  --attribute-condition="assertion.repository == 'abhilashindulkar/role-analyser'" \
  --issuer-uri="https://token.actions.githubusercontent.com"
```

The `attribute-condition` restricts this to your specific repository only.

### 6. Allow the GitHub provider to impersonate the service account

```bash
gcloud iam service-accounts add-iam-policy-binding \
  role-fetcher@role-analyser-data.iam.gserviceaccount.com \
  --role="roles/iam.workloadIdentityUser" \
  --member="principalSet://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/github-pool/attribute.repository/abhilashindulkar/role-analyser"
```

Get your project number:

```bash
gcloud projects describe role-analyser-data --format="value(projectNumber)"
```

### 7. Configure GitHub repository variables

In your GitHub repo, go to **Settings > Secrets and variables > Actions > Variables** and add:

| Variable | Value |
|---|---|
| `GCP_WORKLOAD_IDENTITY_PROVIDER` | `projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/github-pool/providers/github-provider` |
| `GCP_SERVICE_ACCOUNT` | `role-fetcher@role-analyser-data.iam.gserviceaccount.com` |

These are **repository variables** (not secrets) — they contain no sensitive data, just resource identifiers.

## Security properties

- **No keys exist.** The service account has no downloadable keys. Authentication uses federated OIDC tokens.
- **Scoped to one repo.** The `attribute-condition` ensures only your specific repository can authenticate.
- **Read-only.** The service account has `roles/iam.roleViewer` which can only list predefined role definitions — public metadata available in Google's documentation.
- **Short-lived tokens.** Each workflow run gets a token that expires in ~1 hour.
- **No secrets stored.** The GitHub variables contain GCP resource paths, not credentials.

## What the workflow does

1. Authenticates via WIF (exchanges GitHub OIDC token for GCP access token)
2. Calls `GET https://iam.googleapis.com/v1/roles?view=FULL` to list all predefined roles with permissions
3. Writes the data to `src/data/gcp-roles.json` and `src/data/roles.ts`
4. Commits and pushes if the data changed

The workflow runs weekly (Monday 06:00 UTC) and can also be triggered manually.
