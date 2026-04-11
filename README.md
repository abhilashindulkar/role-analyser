# Permiso

**[Live App](https://abhilashindulkar.github.io/role-analyser/)** | **[GitHub](https://github.com/abhilashindulkar/role-analyser)**

A visual tool to explore GCP IAM roles and permissions. Browse which permissions belong to which roles, compare roles side-by-side, and get AI-powered recommendations for the right role based on your use case.

## Features

- **Role Browser** — Search, filter, and browse all GCP IAM predefined roles with fuzzy search
- **Permission Lookup** — Reverse lookup: find which roles include a specific permission
- **Role Comparison** — Full side-by-side permission diffs with color-coded columns
- **Role Advisor** — Describe what you need and get least-privilege recommendations
- **Service Pages** — Explore all roles within a service, ranked by permission count
- **Export** — Download roles as JSON, YAML, or Terraform HCL snippets
- **Dark Mode** — Toggle between light and dark themes
- **PWA** — Install as a standalone app with offline caching
- **Keyboard Shortcuts** — `Ctrl+K` to search, `Esc` to go back

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173/role-analyser/](http://localhost:5173/role-analyser/).

The app ships with seed data covering common GCP services. The full dataset (1000+ roles) is populated automatically by CI.

## How Data Stays Fresh

A GitHub Actions workflow runs weekly and scrapes all predefined GCP roles and permissions from the public Google Cloud documentation. **No GCP account or credentials are needed.**

1. **No credentials at all** — the default mode scrapes public docs pages
2. **Alternatively** — if you have a GCP account, you can use the IAM REST API via [Workload Identity Federation](https://cloud.google.com/iam/docs/workload-identity-federation) for more complete data (see [docs/gcp-setup.md](./docs/gcp-setup.md))
3. **Auto-PR** — if the data changed, the workflow opens a PR for review

### Running locally

```bash
# Scrape from public docs (no account needed)
python scripts/scrape_roles.py --typescript

# Or fetch via GCP API (requires auth)
gcloud auth application-default login
python scripts/fetch_roles.py --typescript
```

## Tech Stack

- React 19 + TypeScript
- Vite + Tailwind CSS v4
- Fuse.js (fuzzy search)
- Lucide React (icons)

## Project Structure

```
src/
  components/     UI components
  data/           Seed data + generated role data (committed by CI)
  hooks/          React hooks
  types/          TypeScript types
  utils/          Search, comparison, and AI recommendation logic
scripts/
  fetch_roles.py  Fetches roles via GCP IAM REST API
.github/
  workflows/      CI workflow for scheduled data updates
docs/
  gcp-setup.md    One-time GCP project setup for WIF
```

## Contributing

Contributions are welcome! Please read the [Contributing Guide](./CONTRIBUTING.md) before opening a pull request.

- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [Security Policy](./SECURITY.md)

## License

See [LICENSE](./LICENSE).
