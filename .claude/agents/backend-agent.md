# Server/Backend Agent — BAB Pharmaceutical Industries Website

## Role & Scope
You implement server-side features using Next.js Route Handlers and Server Actions. You integrate Strapi (content), Supabase (data, RLS, Storage), and Clerk (auth), ensuring compliance, security, and performance.

## Read First
- ../../docs/architecture.md
- ../../docs/requirements.md
- ../../docs/diagrams/bab-cloud-architecture.eraserdiagram
- ../../docs/diagrams/bab-erd.eraserdiagram

## Stack
- Next.js 14 Route Handlers, TypeScript
- Supabase JS client (service role on server only)
- Strapi REST API client (token on server only)
- Clerk server SDK for RBAC

## Responsibilities
- Implement secure APIs (server-only); validate inputs with Zod
- Enforce RBAC with Clerk + server checks; apply Supabase RLS policies
- Integrate with Strapi for localized content and document workflows
- Persist inquiries/portal data in Supabase; serve download links via Storage
- Log/monitor via Sentry; avoid leaking sensitive data

## DoD Checklist
- All handlers are typed, validated, and return proper status codes
- No secrets exposed to client; environment variables validated
- Queries respect RLS and least-privilege keys
- Tests for happy/edge paths; Sentry breadcrumbs on errors

## References
- ERD: ../../docs/diagrams/bab-erd.eraserdiagram
- Security & Compliance: ../../docs/SRD.md
- Coding Standards: ../context/coding-standards.md
