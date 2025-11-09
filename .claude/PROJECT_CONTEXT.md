# BAB Pharma — Claude Project Context

Business
- Pharmaceutical import, distribution, and manufacturing in KSA.
- Audiences: healthcare providers, NUPCO/government, pharmacies, international suppliers.

Goals
- Lead generation, trust via compliance, bilingual AR-first experience, modern 3D visuals.

Core Docs
- ../docs/requirements.md
- ../docs/architecture.md
- ../docs/site-map.md
- ../docs/content-strategy.md
- ../docs/Implementation-Roadmap.md
- Brand: ../docs/Brand-Guidelines.pdf

Tech Stack
- Next.js 14 (App Router), TypeScript, Tailwind, Shadcn/UI, Framer Motion
- R3F + drei + three + 3Dmol.js
- Strapi CMS, Supabase (Postgres, Storage, RLS), Clerk auth
- Vercel, Cloudflare, Sentry, Vercel Analytics

Quality Bars
- WCAG 2.1 AA; < 2s page loads; models < 1MB; 60fps target; reduced motion fallbacks.

Security & Compliance
- RBAC (Clerk) + server checks; RLS; CSP; audit trails; regulatory approvals in CMS.


