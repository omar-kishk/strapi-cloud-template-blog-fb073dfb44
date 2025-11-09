# Claude Rules for BAB Pharma

1) Follow code conventions in `.cursor/PROJECT_RULES.md`.
2) Use Tailwind for styling; ensure a11y attributes and keyboard navigation.
3) Favor AR (RTL) by default; verify EN (LTR); mirror layout where needed.
4) Keep components small, typed, and accessible; early returns, descriptive names.
5) Update docs when changing contracts or behavior; link PRs to relevant docs.
6) For 3D, respect budgets and fallbacks in `PHARMACEUTICAL_3D_BACKGROUND.md`.
7) Never include secrets in code or logs; validate inputs with Zod; enforce RBAC.

