# System Requirements Document (SRD)

## 1. Performance
- < 2s TTFB primary routes; 60fps for rich interactions; models < 1MB

## 2. Availability & Reliability
- Vercel + CDN; SLOs defined; graceful degradation for motion/3D

## 3. Security
- HTTPS, CSP, secure headers; Clerk auth; Supabase RLS; audit logs

## 4. Accessibility
- WCAG 2.1 AA; keyboard navigation; reduced-motion variants

## 5. Internationalization
- Arabic default (RTL), English secondary (LTR); mirrored layouts

## 6. Observability
- Sentry (errors/perf), Vercel Analytics (web vitals + custom KPIs)

## 7. Maintainability
- Typed codebase, ESLint/Prettier, testing pyramid, CI/CD with previews
