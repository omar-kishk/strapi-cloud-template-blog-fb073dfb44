# Technical Requirements Document (TRD)

## 1. Stack
- Next.js 14 (App Router), TypeScript, Tailwind, Shadcn/UI, Framer Motion
- 3D: @react-three/fiber, drei, three, 3Dmol.js
- Content: Sanity; Data: Supabase (Postgres, Storage, RLS)
- Auth: Clerk; Hosting: Vercel; CDN/WAF: Cloudflare
- Observability: Sentry; Analytics: Vercel Analytics

## 2. Architecture Decisions
- RSC/SSR for content-heavy pages; CSR only where needed
- Edge Middleware: i18n, auth hints, cache controls
- Strict typing and linting; modular component design

## 3. APIs & Contracts
- Next.js route handlers; typed responses; input validation via Zod
- Webhooks for CMS publish events; email via Resend

## 4. 3D & Asset Pipeline
- GLTF/DRACO compression; lazy loading; placeholders; < 1MB per model

## 5. CI/CD
- Lint, type-check, tests; preview deployments; release tagging and Sentry releases
