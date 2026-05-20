# Changelog

All notable changes to Permiso will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- GCP APIs browser tab: searchable, category-filtered list of all 173 Google Cloud service APIs sourced from Google's APIs Discovery directory
- API detail pages with documentation/console links and the IAM roles that use each API (matched by permission prefix)
- `scripts/fetch_apis.py` to refresh the API dataset from `https://discovery.googleapis.com/discovery/v1/apis` (`npm run fetch-apis`)
- Role browser with fuzzy search, service/stage/category filters
- Side-by-side role comparison with color-coded permission diffs
- Reverse permission lookup (find roles by permission)
- AI advisor for least-privilege role recommendations
- Service detail pages with roles ranked by permission count
- Export roles as JSON, YAML, or Terraform HCL (file download)
- Dark mode with localStorage persistence
- Keyboard shortcuts (Ctrl+K to search, Esc to go back)
- Recently viewed role history
- Shareable comparison links via URL parameters
- Permission count distribution chart
- Narrower role suggestions on role detail pages
- PWA support with offline caching
- URL routing for all views via react-router-dom
- Virtual scrolling for large role lists
- Automated data pipeline: weekly scrape of public GCP docs via GitHub Actions
- Auto-PR and auto-merge for data refresh
- CI pipeline with lint, build, and test steps
- GitHub Pages deployment workflow
- Unit tests for search, AI, narrower roles, and app smoke tests
- ESLint flat config for ESLint v9
- CONTRIBUTING, CODE_OF_CONDUCT, SECURITY, and PR template

## [0.1.0] - 2026-04-11

### Added

- Initial project scaffolding with React 19, TypeScript, Vite 6, Tailwind CSS v4
- Seed role data covering common GCP services
- Web scraping script for public GCP documentation (no credentials required)
- Optional GCP IAM API fetch script with Workload Identity Federation docs
