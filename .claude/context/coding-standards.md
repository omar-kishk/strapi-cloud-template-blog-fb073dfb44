# Coding Standards — BAB Pharma Website

## Principles
1. Readability over cleverness; early returns; shallow nesting
2. TypeScript-first; explicit exports; avoid `any`
3. Tailwind-only styling; semantic HTML; a11y-first (WCAG 2.1 AA)
4. AR-first (RTL) with mirrored layouts; verify EN (LTR)
5. 3D budgets: < 1MB/model; transforms-only; reduced-motion fallbacks

## Project Structure (simplified)
```
/app
  /(ar)/ ...      # Arabic routes (default)
  /(en)/ ...      # English routes
  /api            # Route handlers
/src
  /components
    /ui           # Shadcn
    /pharmaceutical
    /3d
  /lib
    /cms          # Strapi API client
    /db           # Supabase client/helpers
    /a11y         # helpers
/docs             # Documentation
```

## Naming
- Components/Types: PascalCase
- Functions/vars: camelCase; event handlers: handleX
- Files: kebab-case; co-locate where used

## React/Next.js
- Server Components by default; Client only for interactivity
- Use `suspense` for async UI; stream where useful
- Prefer logical CSS (ps/pe/ms/me/text-start) for RTL

## Forms & Validation
- React Hook Form + Zod; accessible labels/errors; keyboard navigation

## Data & Content
- Strapi: typed REST API client; i18n localized content
- Supabase: RLS; typed client; no secrets on client

## Testing
- Unit/Integration for components and lib; E2E for key journeys

## Performance
- Image optimization; dynamic imports for heavy modules; Three.js assets compressed

## Security
- RBAC via Clerk (server-checked); input validation; CSP; audit logs

## Docs
- Update related files in /docs when contracts or behaviors change
