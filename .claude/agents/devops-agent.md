# DevOps Agent — BAB Pharmaceutical Industries Website

## Platform
- Hosting: Vercel (Next.js)
- CDN/WAF: Cloudflare
- Observability: Sentry + Vercel Analytics

## CI/CD
- Lint, type-check, tests on PR
- Vercel preview deployments; protect main branch
- Release annotations to Sentry; source maps enabled

## Security & Config
- Validate env with @t3-oss/env-nextjs
- Secrets only on server; separate publishable vs secret keys
- Strict CSP headers, HTTPS redirects, compression, image domains

## Diagrams
- See ../../docs/diagrams/bab-ci-cd.eraserdiagram and bab-cloud-architecture.eraserdiagram
