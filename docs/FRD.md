# Functional Requirements Document (FRD)

## 1. User Roles
- Admin, Sales, Regulator, Partner, Customer, Viewer

## 2. Core Features
- Product Catalog: search/filter, localized details, media, related items
- 3D Visualization: molecule/device viewers with fallbacks
- Partner Portal: onboarding, document exchange, capability forms
- Compliance Center: certifications browser, regulatory docs with versions
- Sales & Distribution: coverage maps, NUPCO partnership, contact directory
- Contact & Inquiry: validated forms, email notifications, CRM-ready payloads

## 3. Flows
- See sequence and flow diagrams in ./diagrams/

## 4. Data Rules
- Versioning for regulatory documents; approval required to publish
- RLS policies enforce per-role/per-entity access
- Localization for text and media where required

## 5. Non-functional (cross-ref SRD)
- Performance, a11y, SEO, security as specified in SRD
