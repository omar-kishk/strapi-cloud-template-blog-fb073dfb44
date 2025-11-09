# BAB Pharmaceutical Industries — Website Requirements

## 1. Business Objectives
- Showcase fast growth, world-class manufacturing vision, and import/distribution strength
- Drive B2B leads (healthcare providers, NUPCO/government, pharmacies, international suppliers)
- Establish trust via compliance, certifications, and transparent operations
- Support bilingual (AR first, EN second), RTL-friendly experiences

## 2. Target Audiences & Journeys
- Healthcare Providers: Product discovery → specs → contact sales
- NUPCO/Government: Compliance review → tender participation → contract management
- International Suppliers: Capability review → partnership inquiry → onboarding
- Pharmacies: Product discovery → ordering/stock → delivery tracking

## 3. Core Information Architecture
- Homepage (Hero, metrics, map, value propositions, CTAs)
- Import & Distribution (global partners, inventory, cold chain, compliance)
- Manufacturing Excellence (facility tour, QC lab, process animations)
- Product Portfolio
  - Novel Generics (3D molecules, bioequivalence, regulatory timeline)
  - Medical Devices (3D demos, clinical use, training)
  - Nutraceuticals (benefits, research, education)
- Sales & Distribution (coverage maps, NUPCO partnership, order portal)
- Financial Highlights (public KPIs only)
- Supply Chain (supplier cycle, inventory, multi-company coordination)
- Partners (international/local onboarding & portal)
- Compliance Center (certifications, policies, documents)
- About, Careers, Contact, Support

## 4. Functional Requirements
- Product Catalog
  - Search, filter by therapeutic area, product type, dosage form, status
  - Product detail with specs, regulatory docs, media (3D, video), related items
  - Localization (AR/EN), RTL layout
- 3D Visualizations
  - React Three Fiber scenes for molecules and devices
  - Performance budget: < 1 MB per model, 60 fps desktop, reduced motion fallback
- Partner Portal
  - Secure registration, onboarding progress, document exchange
  - Capability forms with validation (React Hook Form + Zod)
- Compliance Center
  - Certifications (SFDA, ISO 13485, GMP, CE) with validity periods
  - Regulatory documents (IFU, SDS, COA) with versioning and approvals
- Sales & Distribution
  - Saudi coverage map, territories, sales contacts
  - Order request form and optional authenticated order portal
- Content Management
  - Strapi CMS for structured product and marketing content (AR/EN)
  - Versioning/approvals tracked via fields and roles; webhooks to revalidate site
- Authentication & Roles (Clerk)
  - Roles: admin, sales, regulator, partner, customer, viewer
  - RBAC for portals and sensitive docs
- Analytics
  - Vercel Analytics + custom KPIs (lead conversions, interaction rate, 3D engagement)

## 5. Non‑Functional Requirements
- Performance: < 2s TTFB on primary routes; Core Web Vitals all green
- Accessibility: WCAG 2.1 AA, `prefers-reduced-motion` support, keyboard navigation
- Security: HTTPS, CSP, audit logs, encryption in transit/at rest, RLS in DB
- SEO: International SEO with AR/EN, structured data for products, sitemaps
- Privacy/Compliance: GDPR readiness, Saudi FDA alignment for content handling

## 6. Technology Stack
- Next.js 14 (App Router), TypeScript, Tailwind, Shadcn/UI, Framer Motion
- 3D: @react-three/fiber, drei, three, 3Dmol.js
- CMS: Strapi; DB: Supabase (Postgres, Storage, RLS)
- Auth: Clerk; Deploy: Vercel; CDN: Cloudflare
- Monitoring: Sentry; Analytics: Vercel Analytics

## 7. Data Model (High-Level)
- Products (Novel Generic | Medical Device | Nutraceutical)
- TherapeuticAreas, Suppliers, Certifications, RegulatoryDocs
- Warehouses, Batches/Lots, Inventory
- Customers, Orders, OrderItems, Shipments
- Partners, Tenders/TenderItems (NUPCO), Users/Roles

## 8. Integrations
- Strapi (content), Supabase (data), Clerk (auth)
- Optional: Resend (email), NUPCO (tender APIs where applicable)
- Sentry (errors), Vercel Analytics (performance/engagement)

## 9. Localization
- Arabic primary (RTL), English secondary; mirrored layouts
- Localized content models in CMS; language switch persistence

## 10. Content Governance
- Regulatory approvals before publish (medical review → regulatory approval)
- Versioned documents; audit-ready histories
- Brand consistency per Brand-Guidelines.pdf (colors, typography, imagery)

## 11. KPIs
- Leads: +200% contacts, +150% partnerships, +300% downloads
- Engagement: 5+ min sessions, 60% 3D interaction, 40% return visitors
- Growth: +25% new customers via site, +100% international leads


