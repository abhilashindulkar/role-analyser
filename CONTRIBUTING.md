# Contributing to Permiso

Thanks for your interest in contributing! This document covers what you need to know to get started.

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.10+ (for scraping scripts only)
- npm

### Local Setup

```bash
git clone https://github.com/<your-fork>/role-analyser.git
cd role-analyser
npm install
npm run dev
```

The app runs at [http://localhost:5173/role-analyser/](http://localhost:5173/role-analyser/).

### Refreshing Role Data Locally

```bash
# Scrape from public GCP docs (no credentials needed)
python scripts/scrape_roles.py --typescript

# Or fetch via the GCP IAM API (requires auth)
gcloud auth application-default login
python scripts/fetch_roles.py --typescript
```

## How to Contribute

### Reporting Bugs

Open an issue using the **Bug Report** template. Include:

- Steps to reproduce the problem
- What you expected vs. what happened
- Browser and OS version
- Screenshots if the issue is visual

### Suggesting Features

Open an issue using the **Feature Request** template. Describe the use case and why the feature would help others working with GCP IAM.

### Submitting Code

1. Fork the repository and create a branch from `main`:
   ```bash
   git checkout -b feat/my-feature
   ```
2. Make your changes. Follow the coding standards below.
3. Test your changes locally with `npm run dev`, `npm run lint`, `npm run build`, and `npm test`.
4. Commit with a clear message (see commit conventions below).
5. Push to your fork and open a pull request.

## Coding Standards

- **TypeScript** for all frontend code. Avoid `any`.
- **Functional React** components with hooks. No class components.
- **Tailwind CSS** for styling. No separate CSS files per component.
- **Imports** at the top of each file, never inline.
- Keep components focused. If a component exceeds ~200 lines, consider splitting it.
- No comments that restate what the code already says.

## Commit Conventions

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add permission diff view
fix: handle roles with empty permission lists
chore: update GCP roles data
docs: clarify WIF setup steps
refactor: extract search logic into utility
```

## Pull Request Guidelines

- One logical change per PR. Avoid mixing features with refactors.
- Fill out the PR template.
- Keep PRs small and reviewable (aim for under 400 lines changed).
- All CI checks must pass before merge.
- PRs need at least one approving review.
- Automated data-update PRs from CI are exempt from the review requirement.

## Branch Naming

Use a prefix that matches the change type:

- `feat/` for new features
- `fix/` for bug fixes
- `chore/` for maintenance
- `docs/` for documentation

## Project Structure

```
src/
  components/     UI components (React + Tailwind)
  data/           Seed data + generated role data (committed by CI)
  hooks/          React hooks
  types/          TypeScript interfaces
  utils/          Search, comparison, and recommendation logic
scripts/
  scrape_roles.py Scrapes roles from public GCP docs
  fetch_roles.py  Fetches roles via the GCP IAM REST API
.github/
  workflows/      CI for scheduled data updates
docs/
  gcp-setup.md    GCP project setup for Workload Identity Federation
```

## License

By contributing, you agree that your contributions will be licensed under the [Apache License 2.0](./LICENSE).
