# Research Notebook

A publishing platform.

A public notebook documenting research, engineering, and long-form writing.

Not a portfolio. Not a blog. Not a landing page.

Everything in this repository exists to improve reading.

---

## Version

**0.2.0**

| Stage | Status |
| --- | --- |
| 0.1 Infrastructure | Complete |
| 0.2 Editorial Foundation | Complete |
| 0.3 Ambient Background | Next |

Full stage breakdown lives in [docs/roadmap.md](docs/roadmap.md).

---

## Direction

- [docs/design.md](docs/design.md) — design principles
- [docs/architecture.md](docs/architecture.md) — systems and boundaries
- [docs/roadmap.md](docs/roadmap.md) — staged development

---

## Development

```bash
pnpm install
pnpm dev
pnpm build
```

`pnpm build` produces a static export in `out/`.

Pushing to `main` deploys to GitHub Pages via `.github/workflows/deploy.yml`.
