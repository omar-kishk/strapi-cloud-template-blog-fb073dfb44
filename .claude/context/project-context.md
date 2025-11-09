# Project Context — BAB Pharmaceutical Industries Website

## Overview
- Company: BAB Pharmaceutical Industries (KSA)
- Site: Corporate/B2B website with interactive 3D, product portfolio, compliance center, partner/customer portals (auth), AR-first with full RTL.

## Objectives
- Lead generation and partnership inquiries
- Trust via transparency (SFDA, ISO, GMP, CE)
- Showcase import/distribution network and manufacturing vision

## Primary Stack
- Next.js 14 (App Router), React, TypeScript
- Tailwind CSS, Shadcn/UI, Framer Motion
- 3D: @react-three/fiber, drei, three, 3Dmol.js
- Content: Strapi CMS
- Data: Supabase (Postgres, Storage, RLS)
- Auth: Clerk
- Hosting/Edge: Vercel + Cloudflare CDN/WAF
- Observability: Sentry + Vercel Analytics

## Read First
- ../../docs/requirements.md
- ../../docs/architecture.md
- ../../docs/site-map.md
- ../../docs/content-strategy.md
- ../../docs/Implementation-Roadmap.md
- Brand: ../../docs/Brand-Guidelines.pdf
- 3D Guide: ../../PHARMACEUTICAL_3D_BACKGROUND.md

## Quality Bars
- Performance: < 2s loads; 60fps target; < 1MB per model
- Accessibility: WCAG 2.1 AA; `prefers-reduced-motion` support
- Security: RBAC (Clerk) + server checks; RLS; CSP; audit logs

## Notes
- Arabic is the primary locale; mirror layouts for RTL.
- Use Tailwind brand tokens from tailwind.config.ts.
- All diagrams live in ../../docs/diagrams/ (Eraser).
