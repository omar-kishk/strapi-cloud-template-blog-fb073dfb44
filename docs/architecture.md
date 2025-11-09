# BAB Pharma — Solution Architecture

## Overview
A Next.js 14 (App Router) platform delivering a bilingual, compliant, high-performance B2B website with 3D experiences. Core components:
- Frontend: Next.js, Tailwind, Shadcn/UI, Framer Motion
- 3D: @react-three/fiber, drei, three, 3Dmol.js
 - Content: Strapi CMS (headless)
- Data: Supabase (PostgreSQL, RLS, Storage)
- AuthN/AuthZ: Clerk (RBAC)
- Infra: Vercel (hosting), Cloudflare (CDN), Sentry, Vercel Analytics

## Logical Architecture
- Presentation: React components, R3F scenes, localized UI (AR/EN)
- API Layer: Next.js route handlers (server actions), Edge Middleware (i18n, auth)
 - Integrations: Strapi (content), Supabase (data), Clerk (auth), Resend (email)
- Observability: Sentry (errors), Vercel Analytics (web vitals + custom KPIs)

## Data Flow (Typical Page)
1) Browser requests localized route (e.g., /ar/products)
2) Edge middleware ensures locale, caches static assets via CDN
3) Server components fetch content from Strapi + product data from Supabase
4) Page renders stream progressively (RSC), hydrates minimal client interactivity
5) Analytics events recorded; Sentry captures errors/perf

## Security & Compliance
- Clerk-protected routes for portals; server-side RBAC checks
- Supabase RLS policies for tenant/scope control
- HTTPS + CSP + secure headers; audit logging for sensitive operations
- Regulatory content versioning and approvals (fields + roles in Strapi)

## Performance Strategy
- 3D budgets: < 1 MB per model, compress GLTF/DRACO, lazy load, SSR placeholders
- Use transform-only animations, `will-change`, and reduced particle counts on mobile
- Edge caching for static assets; ISR/SSG where safe; dynamic for portals only; Strapi → Next.js webhook revalidation

## Internationalization
- Arabic default (RTL) with mirrored layouts; English fallback (LTR)
- Locale-aware routes; Strapi i18n localized entries; direction-safe components

## Environments
- Dev: dev.babpharma.com (feature flags enabled)
- Staging: staging.babpharma.com (content freeze for UAT)
- Prod: babpharma.com (observability and WAF/CDN hardened)

## CI/CD
- Lint, type-check, unit/integration tests on PR
- Build & deploy previews via Vercel
- Sentry release annotations; migrations via Supabase CLI

## Key Entities (DB)
- Products, TherapeuticAreas, Suppliers, Certifications, RegulatoryDocs
- Warehouses, Batches, Inventory, Customers, Orders, OrderItems, Shipments
- Partners, Tenders, TenderItems, Users (role-linked)

## Diagrams
- See `docs/diagrams/` for ERD, Cloud Architecture, Sequence, and Flow diagrams


