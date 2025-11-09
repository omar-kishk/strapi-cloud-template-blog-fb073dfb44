# Deployment

## Environments
- Development: dev.babpharma.com
- Staging: staging.babpharma.com
- Production: babpharma.com

## Steps
- Ensure env vars set in Vercel project
- npm run build; automatic via Vercel
- Preview deployments on PR; promote after QA

## Post-Deploy
- Verify health, analytics, Sentry errors
- Run lighthouse checks
