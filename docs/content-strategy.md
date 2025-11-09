# BAB Pharma — Content, Brand, SEO, and Compliance Strategy

## Brand & Tone
- Professional, credible, and innovation-forward; Saudi market first
- Consistent use of brand palette and typography per Brand-Guidelines.pdf
- Imagery: clean pharmaceutical environments, devices, lab processes; culturally aligned

## Localization
- Arabic (primary, RTL) + English (secondary, LTR)
- Mirrored layouts; localized assets where needed; date/number formats per locale

## Content Types
- Product pages (structured specs, media, regulatory docs)
- Manufacturing & facility showcases (3D tours, process animations)
- Compliance center (certifications, policies, approvals)
- Sales & distribution (coverage, NUPCO partnership, contacts)
- Partners (capabilities, onboarding, training)
- News/Media and Careers

## Governance & Approvals
- Workflow: Draft → Medical Review → Regulatory Approval → Publish
- Version control for all regulatory-content; keep approval trail
- Periodic reviews for accuracy (quarterly or upon regulation changes)

## SEO
- Semantic HTML, descriptive titles/meta, localized sitemaps
- Schema.org Product, Organization, and Breadcrumb structured data
- Fast pages, optimized media, internal linking by therapeutic area

## Accessibility (WCAG 2.1 AA)
- Keyboard navigable, focus-visible, alt text, sufficient contrast
- `prefers-reduced-motion` and 3D fallbacks
- Forms with labels, errors, and ARIA where appropriate

## Analytics & KPIs
- Track contacts, partnership inquiries, product downloads, 3D interactions
- Funnel analysis by audience; content engagement heatmaps
- Monitor Core Web Vitals and accessibility metrics

## CMS Modeling (Strapi)
- Collection Types:
  - Product (title, slug, type, therapeuticArea, summary, media, model3d, status, medicalApproved, regulatoryApproved)
  - RegulatoryDoc (title, version, file, approvedBy, approvedAt, validTo)
  - Certification (type, issuedBy, validFrom, validTo, file)
  - TherapeuticArea, PartnerProfile, Article/News
- Single Types:
  - HomePage, PartnersPage, CompliancePage, ContactPage, SiteSettings, Navigation
- Localization: Arabic (default) + English on all public types

## Editorial Guidelines
- Short, scannable sections; medical accuracy checks
- Use official terminology; link to primary sources where relevant
- Avoid consumer health claims for regulated categories

## Publishing & Revalidation
- Configure a Strapi webhook to call `/api/strapi-revalidate?secret=...`
- Revalidate by tag/path so content updates without rebuilds


