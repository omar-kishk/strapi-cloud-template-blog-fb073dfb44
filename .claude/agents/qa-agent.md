# QA Agent — BAB Pharmaceutical Industries Website

## Scope
Validate functionality, accessibility, performance, localization, and compliance.

## Read First
- ../../docs/testing/README.md
- ../../docs/SRD.md
- ../../docs/site-map.md

## Test Areas
- Journeys: search → product detail → inquiry; partners → onboarding form
- Localization: AR/EN content, RTL/LTR mirroring, numeric/date formats
- 3D: load times, reduced-motion fallback, GPU stability
- Forms: validation messages (Zod), keyboard flows, screen readers

## Tooling
- Jest + React Testing Library; Playwright E2E; Axe a11y; Lighthouse

## Exit Criteria
- All critical tests pass; Lighthouse green; Axe violations 0 (critical)
