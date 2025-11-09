# BAB Pharma — Deployment Guide

## Overview

This guide covers deployment of the BAB Pharmaceutical Industries website, including Strapi CMS, Next.js frontend, Supabase database, and all supporting services.

## Architecture Summary

- **Frontend**: Next.js 14 on Vercel
- **CMS**: Strapi (Cloud or Self-hosted)
- **Database**: Supabase (PostgreSQL)
- **Auth**: Clerk
- **CDN**: Cloudflare
- **Monitoring**: Sentry + Vercel Analytics

---

## Prerequisites

Before deploying, ensure you have:
- Node.js 18+ installed
- Git repository access
- Access to required service accounts:
  - Vercel account
  - Strapi Cloud account (or hosting provider)
  - Supabase account
  - Clerk account
  - Cloudflare account (optional, for CDN/WAF)
  - Sentry account (for error tracking)

---

## 1. Strapi CMS Deployment

### Option A: Strapi Cloud (Recommended for Quick Setup)

1. **Create Strapi Cloud Project**
   - Visit https://cloud.strapi.io
   - Create new project
   - Choose region (prefer Middle East/EU for KSA users)
   - Note your Strapi URL: `https://your-project.strapiapp.com`

2. **Configure Strapi**
   ```bash
   # If you have a local Strapi instance with schemas
   # Deploy schemas to Strapi Cloud
   npm run strapi deploy
   ```

3. **Enable Internationalization (i18n)**
   - Go to Settings → Internationalization
   - Add locales: Arabic (ar) as default, English (en)
   - Enable i18n on all public collection types

4. **Create Collection Types**
   - **Product**
     - Fields: title (text), slug (uid), summary (text), therapeuticArea (text)
     - Media: heroImage (single media)
     - Enable i18n
   - **RegulatoryDoc**
     - Fields: title (text), version (text), approvedAt (date), approvedBy (text)
     - Media: file (single media)
     - Enable i18n
   - **Certification**
     - Fields: type (text), issuedBy (text), validFrom (date), validTo (date)
     - Media: file (single media)
     - Enable i18n

5. **Create API Token**
   - Go to Settings → API Tokens
   - Create new token: "Next.js Frontend"
   - Type: Read-Only
   - Duration: Unlimited
   - Copy token for `.env.local`

6. **Configure Webhook for Revalidation**
   - Go to Settings → Webhooks
   - Create new webhook
   - Name: "Next.js Revalidation"
   - URL: `https://your-domain.com/api/strapi-revalidate?secret=YOUR_SECRET`
   - Events: Select all Entry events (create, update, delete)
   - Save webhook

### Option B: Self-Hosted Strapi

1. **Deploy Strapi Instance**
   ```bash
   # Create new Strapi project
   npx create-strapi-app@latest bab-strapi
   cd bab-strapi

   # Install dependencies
   npm install

   # Configure database (PostgreSQL recommended)
   # Edit config/database.js
   ```

2. **Configure Production Database**
   ```javascript
   // config/database.js
   module.exports = ({ env }) => ({
     connection: {
       client: 'postgres',
       connection: {
         host: env('DATABASE_HOST'),
         port: env.int('DATABASE_PORT', 5432),
         database: env('DATABASE_NAME'),
         user: env('DATABASE_USERNAME'),
         password: env('DATABASE_PASSWORD'),
         ssl: env.bool('DATABASE_SSL', false) && {
           rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false),
         },
       },
     },
   });
   ```

3. **Deploy to Platform** (Choose one):
   - **Railway**: Connect repo, configure env vars
   - **Render**: Connect repo, use PostgreSQL add-on
   - **DigitalOcean App Platform**: Connect repo, add database
   - **AWS/GCP**: Use container services

4. **Set Environment Variables**
   ```bash
   NODE_ENV=production
   DATABASE_HOST=your-db-host
   DATABASE_PORT=5432
   DATABASE_NAME=strapi
   DATABASE_USERNAME=strapi
   DATABASE_PASSWORD=your-password
   DATABASE_SSL=true
   ADMIN_JWT_SECRET=generate-secure-secret
   API_TOKEN_SALT=generate-secure-salt
   APP_KEYS=generate-secure-keys
   JWT_SECRET=generate-secure-secret
   ```

---

## 2. Supabase Database Setup

1. **Create Supabase Project**
   - Visit https://supabase.com
   - Create new project
   - Choose region closest to users (EU/Middle East)
   - Save your credentials:
     - Project URL
     - Anon/Public key
     - Service role key (keep secure)

2. **Run Database Migrations** (if applicable)
   ```bash
   # Install Supabase CLI
   npm install -g supabase

   # Link to your project
   supabase link --project-ref your-project-ref

   # Run migrations
   supabase db push
   ```

3. **Configure Row Level Security (RLS)**
   - Enable RLS on all tables
   - Create policies for authenticated users
   - Example policy:
     ```sql
     -- Products are public read
     CREATE POLICY "Products are viewable by everyone"
     ON products FOR SELECT
     USING (true);

     -- Orders require authentication
     CREATE POLICY "Orders viewable by owner"
     ON orders FOR SELECT
     USING (auth.uid() = user_id);
     ```

4. **Set Up Storage Buckets**
   ```sql
   -- Create public bucket for product images
   INSERT INTO storage.buckets (id, name, public)
   VALUES ('product-images', 'product-images', true);

   -- Create private bucket for regulatory docs
   INSERT INTO storage.buckets (id, name, public)
   VALUES ('regulatory-docs', 'regulatory-docs', false);
   ```

---

## 3. Clerk Authentication Setup

1. **Create Clerk Application**
   - Visit https://clerk.com
   - Create new application
   - Enable authentication methods:
     - Email/Password
     - Email Magic Links
     - OAuth (optional): Google, Microsoft

2. **Configure User Roles**
   - Go to Roles & Permissions
   - Create roles:
     - `admin` - Full access
     - `sales` - Sales portal access
     - `regulator` - Compliance center access
     - `partner` - Partner portal access
     - `customer` - Customer portal access
     - `viewer` - Read-only access

3. **Copy API Keys**
   - Get Publishable Key
   - Get Secret Key
   - Save for `.env.local`

4. **Configure Sign-in/Sign-up URLs**
   - Sign-in URL: `/sign-in`
   - Sign-up URL: `/sign-up`
   - After sign-in: `/dashboard`
   - After sign-up: `/dashboard`

---

## 4. Next.js Frontend Deployment (Vercel)

### 4.1 Prepare Environment Variables

Create `.env.local` with all required variables:

```bash
# Database (Supabase)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Authentication (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-key
CLERK_SECRET_KEY=your-clerk-secret
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# CMS (Strapi)
NEXT_PUBLIC_STRAPI_URL=https://your-strapi.strapiapp.com
STRAPI_API_TOKEN=your-strapi-token
STRAPI_WEBHOOK_SECRET=generate-secure-secret
NEXT_REVALIDATE_SECRET=generate-secure-secret

# Analytics & Monitoring
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your-analytics-id
SENTRY_DSN=your-sentry-dsn
SENTRY_ORG=your-sentry-org
SENTRY_PROJECT=your-sentry-project

# Optional Services
OPENAI_API_KEY=your-openai-key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-maps-key
```

### 4.2 Deploy to Vercel

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm install -g vercel

   # Login to Vercel
   vercel login

   # Deploy
   vercel --prod
   ```

2. **Or Deploy via Vercel Dashboard**
   - Visit https://vercel.com
   - Import Git Repository
   - Configure project:
     - Framework Preset: Next.js
     - Build Command: `npm run build`
     - Output Directory: `.next`
   - Add all environment variables from `.env.local`
   - Deploy

3. **Configure Custom Domain**
   - Go to Project Settings → Domains
   - Add domain: `babpharma.com`
   - Add www redirect: `www.babpharma.com` → `babpharma.com`
   - Configure DNS records as instructed

4. **Set Up Preview Deployments**
   - Every PR gets automatic preview URL
   - Use for testing before production merge

### 4.3 Configure Vercel Settings

1. **Environment Variables**
   - Production: Add all production secrets
   - Preview: Use staging/test credentials
   - Development: Use development credentials

2. **Build & Development Settings**
   ```json
   {
     "buildCommand": "npm run build",
     "devCommand": "npm run dev",
     "installCommand": "npm install",
     "framework": "nextjs"
   }
   ```

3. **Caching & Performance**
   - Enable Edge Network
   - Configure ISR revalidation: 60 seconds
   - Enable image optimization

---

## 5. Cloudflare CDN/WAF Setup (Optional)

1. **Add Site to Cloudflare**
   - Add `babpharma.com` to Cloudflare
   - Update nameservers at registrar
   - Wait for DNS propagation

2. **Configure DNS**
   ```
   Type: CNAME
   Name: @
   Target: cname.vercel-dns.com
   Proxy: Enabled (orange cloud)
   ```

3. **Enable Security Features**
   - SSL/TLS: Full (strict)
   - Always Use HTTPS: On
   - WAF: Configure rules for pharmaceutical site
   - Bot Fight Mode: On
   - DDoS Protection: Automatic

4. **Configure Page Rules**
   - Cache Level: Standard
   - Browser Cache TTL: 4 hours
   - Edge Cache TTL: Respect existing headers

---

## 6. Sentry Error Tracking Setup

1. **Create Sentry Project**
   - Visit https://sentry.io
   - Create new project: Next.js
   - Copy DSN

2. **Configure Sentry in Next.js**
   ```javascript
   // sentry.client.config.js
   import * as Sentry from "@sentry/nextjs";

   Sentry.init({
     dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
     tracesSampleRate: 1.0,
     environment: process.env.NODE_ENV,
   });
   ```

3. **Set Up Release Tracking**
   ```bash
   # In vercel.json or build script
   sentry-cli releases new $VERCEL_GIT_COMMIT_SHA
   sentry-cli releases set-commits $VERCEL_GIT_COMMIT_SHA --auto
   sentry-cli releases finalize $VERCEL_GIT_COMMIT_SHA
   ```

---

## 7. Post-Deployment Checklist

### 7.1 Content Setup

- [ ] Create admin user in Strapi
- [ ] Configure roles and permissions in Strapi
- [ ] Create initial content (products, regulatory docs)
- [ ] Upload media assets to Strapi
- [ ] Test Arabic and English locales
- [ ] Verify webhook revalidation works

### 7.2 Testing

- [ ] Test all pages load correctly
- [ ] Verify Arabic (RTL) layout works
- [ ] Test authentication flows (sign-in, sign-up)
- [ ] Test product catalog with Strapi content
- [ ] Test compliance center with regulatory docs
- [ ] Verify 3D visualizations load and perform well
- [ ] Test forms and submissions
- [ ] Check mobile responsiveness
- [ ] Test accessibility (WCAG 2.1 AA)
- [ ] Run Lighthouse audit (target: 90+ scores)

### 7.3 Performance

- [ ] Verify Core Web Vitals are green
- [ ] Check image optimization
- [ ] Test 3D model loading performance
- [ ] Verify ISR revalidation works
- [ ] Check edge caching effectiveness
- [ ] Test page load times < 2s

### 7.4 Security

- [ ] Verify HTTPS enforcement
- [ ] Test CSP headers
- [ ] Verify Clerk authentication works
- [ ] Test Supabase RLS policies
- [ ] Check API route protection
- [ ] Verify Strapi API token security
- [ ] Test CORS configuration
- [ ] Review environment variables (no leaks)

### 7.5 SEO & Analytics

- [ ] Submit sitemap to Google Search Console
- [ ] Verify structured data (Schema.org)
- [ ] Test Open Graph tags
- [ ] Configure Google Analytics (if using)
- [ ] Verify Vercel Analytics tracking
- [ ] Set up Sentry alerts
- [ ] Configure uptime monitoring

---

## 8. Environment-Specific Deployments

### Development (dev.babpharma.com)
- Use development Strapi instance
- Use Supabase development project
- Enable feature flags
- Detailed error logging

### Staging (staging.babpharma.com)
- Mirror production setup
- Content freeze for UAT
- Full monitoring enabled
- Test with production-like data

### Production (babpharma.com)
- Production Strapi
- Production Supabase
- WAF/CDN hardened
- Full observability
- Backup and disaster recovery

---

## 9. Maintenance & Operations

### Backups

**Strapi Content**
- Strapi Cloud: Automatic backups
- Self-hosted: Daily database dumps

**Supabase Database**
- Automatic daily backups (Pro plan)
- Point-in-time recovery available

### Monitoring

**Uptime Monitoring**
- Use Vercel Analytics
- Set up external monitoring (e.g., UptimeRobot)
- Configure alerts for downtime

**Error Tracking**
- Sentry for runtime errors
- Slack/email notifications for critical errors

**Performance Monitoring**
- Vercel Analytics for Web Vitals
- Custom metrics for 3D engagement
- API response time tracking

### Updates

**Dependencies**
- Monthly security updates
- Quarterly feature updates
- Test in staging before production

**Content**
- Regular content audits
- Regulatory document version control
- Quarterly compliance reviews

---

## 10. Troubleshooting

### Common Issues

**Strapi Connection Errors**
- Verify API token is correct
- Check CORS settings in Strapi
- Ensure Strapi URL is accessible

**Authentication Issues**
- Verify Clerk keys are correct
- Check sign-in/sign-up URLs configuration
- Review Clerk dashboard for errors

**Build Failures**
- Check environment variables are set
- Verify Node.js version (18+)
- Review build logs in Vercel

**Slow Page Loads**
- Check 3D model sizes (< 1MB)
- Verify image optimization
- Review ISR revalidation settings
- Check CDN configuration

**Content Not Updating**
- Verify Strapi webhook is configured
- Check revalidation secret matches
- Test manual revalidation endpoint

---

## 11. Support & Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Strapi Docs](https://docs.strapi.io)
- [Supabase Docs](https://supabase.com/docs)
- [Clerk Docs](https://clerk.com/docs)
- [Vercel Docs](https://vercel.com/docs)

### Internal Resources
- [Requirements](./requirements.md)
- [Architecture](./architecture.md)
- [Content Strategy](./content-strategy.md)
- [Implementation Roadmap](./Implementation-Roadmap.md)

### Emergency Contacts
- DevOps Team: devops@babpharma.com
- Technical Support: tech@babpharma.com
- On-call: +966-XXX-XXXX

---

## Summary

This deployment guide covers the complete setup of the BAB Pharmaceutical Industries website. Follow the steps in order, test thoroughly at each stage, and refer to the troubleshooting section if issues arise.

**Key URLs to Configure:**
- Strapi CMS: `https://your-strapi.strapiapp.com`
- Production: `https://babpharma.com`
- Staging: `https://staging.babpharma.com`
- Development: `https://dev.babpharma.com`

**Last Updated:** 2025-01-09
