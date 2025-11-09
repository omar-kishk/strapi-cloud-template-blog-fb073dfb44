# BAB Pharma - Complete Setup Checklist

Use this checklist to set up your production environment from scratch.

## ✅ Pre-Setup (Already Done)

- [x] Project initialized with Next.js
- [x] Code working locally (`npm run dev`)
- [x] Build passing (`npm run build`)
- [x] Strapi instance created
- [x] Environment variables configured locally

---

## 📝 Setup Steps

### STEP 1: GitHub Repository Setup

#### 1.1 Create GitHub Repository
```bash
# If not already done:
1. Go to https://github.com
2. Click "New repository"
3. Name: babpharma
4. Description: "BAB Pharmaceutical Industries Website"
5. Choose: Private
6. Click "Create repository"
```

#### 1.2 Connect Local Code to GitHub
```bash
# In your terminal (D:\BAB\babpharma):

# Initialize git (if not already done)
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: BAB Pharma website with Strapi integration"

# Connect to GitHub (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/babpharma.git

# Push code
git branch -M main
git push -u origin main
```

**Status:** ⬜ Not Started | ⏳ In Progress | ✅ Complete

---

### STEP 2: Vercel Deployment Setup

#### 2.1 Sign Up for Vercel
```
1. Visit: https://vercel.com
2. Click "Sign Up"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your GitHub
```
**Status:** ⬜

#### 2.2 Import Your Project
```
1. Click "Add New..." → "Project"
2. Find "babpharma" repository
3. Click "Import"
4. Vercel auto-detects Next.js ✓
5. DON'T click Deploy yet - configure env vars first!
```
**Status:** ⬜

#### 2.3 Configure Environment Variables

Copy these from your `env.local` file to Vercel:

**Required Variables:**
```bash
# Strapi CMS
NEXT_PUBLIC_STRAPI_URL=https://skilled-virtue-a9d87d8aaf.strapiapp.com
STRAPI_API_TOKEN=7816d0905c7f5df0bddba81a1698db8d0c781d7df1bb3f97300a17974639ed0a
STRAPI_WEBHOOK_SECRET=341fd3d61c1d7968c6971590fa70627c564bc59958aa006a3c51fff4ac2baa90
NEXT_REVALIDATE_SECRET=b2ce2cd802d1fea0e7c6495cb27b240333e2320437ea6b944c5a3d63ce762b19

# Supabase (if using)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Clerk Auth (if using)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
```

**How to add in Vercel:**
```
1. In project settings, go to "Environment Variables"
2. For each variable:
   - Enter Name (e.g., NEXT_PUBLIC_STRAPI_URL)
   - Enter Value
   - Select Environment: Production, Preview, Development (all 3)
   - Click "Add"
3. Repeat for all variables
```
**Status:** ⬜

#### 2.4 Deploy to Production
```
1. Click "Deploy"
2. Wait 2-3 minutes for build
3. ✅ Deployment successful!
4. You get: https://babpharma-xxx.vercel.app
```
**Status:** ⬜

#### 2.5 Configure Custom Domain
```
1. Go to Settings → Domains
2. Add domain: babpharma.com
3. Add domain: www.babpharma.com
4. Vercel provides DNS instructions
5. Update DNS at your domain registrar
6. Wait for DNS propagation (5-60 minutes)
7. ✅ Site live at babpharma.com
```
**Status:** ⬜

---

### STEP 3: Strapi Webhook Configuration

#### 3.1 Access Strapi Admin
```
1. Visit: https://skilled-virtue-a9d87d8aaf.strapiapp.com/admin
2. Login with your admin credentials
```
**Status:** ⬜

#### 3.2 Create Webhook
```
1. Go to Settings → Webhooks
2. Click "Create new webhook"
3. Configure:

Name: Next.js Production Revalidation
URL: https://babpharma.com/api/strapi-revalidate?secret=b2ce2cd802d1fea0e7c6495cb27b240333e2320437ea6b944c5a3d63ce762b19

Events (check all):
☑ Entry Create
☑ Entry Update
☑ Entry Delete
☑ Entry Publish
☑ Entry Unpublish

Headers:
Leave empty (not needed)

4. Click "Save"
```
**Status:** ⬜

#### 3.3 Test Webhook
```
1. In Strapi, edit any product
2. Click "Save" and "Publish"
3. Check webhook fired:
   - In Strapi: Settings → Webhooks → View logs
   - Should show 200 success status
4. Visit babpharma.com - content should update
```
**Status:** ⬜

---

### STEP 4: Strapi Content Setup

#### 4.1 Create Content Types (If not already done)

**Products Collection:**
```
Content-Type Builder → Create new collection type → "Product"

Fields:
- title (Text) - Required
- slug (UID from title) - Required
- summary (Text)
- therapeuticArea (Text)
- heroImage (Media - Single image)

Advanced Settings:
- Enable Internationalization (i18n)
- Locales: Arabic (default), English
```
**Status:** ⬜

**Regulatory Docs Collection:**
```
Content-Type Builder → Create new collection type → "Regulatory Doc"

Fields:
- title (Text) - Required
- version (Text)
- file (Media - Single file)
- approvedAt (Date)
- approvedBy (Text)

Advanced Settings:
- Enable i18n
```
**Status:** ⬜

#### 4.2 Add Sample Content
```
1. Create 2-3 sample products (Arabic + English)
2. Upload sample images
3. Publish content
4. Check appears on website
```
**Status:** ⬜

---

### STEP 5: GitHub Actions (Optional - Advanced CI/CD)

This step is **optional** but recommended for automated testing.

#### 5.1 Create Workflow File
```bash
# Create file: .github/workflows/ci.yml

name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'

    - name: Install dependencies
      run: npm install

    - name: Run TypeScript check
      run: npm run type-check

    - name: Run linter
      run: npm run lint

    - name: Build project
      run: npm run build
```
**Status:** ⬜ (Optional)

---

### STEP 6: Team Setup & Collaboration

#### 6.1 Add Team Members to GitHub
```
1. Go to repository settings → Collaborators
2. Invite team members by email/username
3. Assign appropriate permissions:
   - Admin: Full access
   - Write: Can push code
   - Read: Can only view
```
**Status:** ⬜

#### 6.2 Add Team Members to Strapi
```
1. Strapi Admin → Settings → Users
2. Create accounts for content team
3. Assign roles:
   - Author: Can create/edit content
   - Editor: Can review and publish
   - Admin: Full access
```
**Status:** ⬜

#### 6.3 Add Team Members to Vercel
```
1. Vercel Dashboard → Settings → Members
2. Invite team members
3. Assign roles:
   - Owner: Full access
   - Member: Deploy and view
   - Viewer: View only
```
**Status:** ⬜

---

### STEP 7: Monitoring & Analytics Setup

#### 7.1 Vercel Analytics
```
1. Already included automatically ✓
2. View at: Vercel Dashboard → Analytics
3. Monitors:
   - Page views
   - Core Web Vitals
   - User locations
```
**Status:** ⬜

#### 7.2 Sentry Error Tracking (Optional)
```
1. Sign up: https://sentry.io
2. Create new project → Next.js
3. Copy DSN
4. Add to Vercel env vars:
   SENTRY_DSN=your_sentry_dsn
5. Monitors runtime errors automatically
```
**Status:** ⬜ (Optional)

---

### STEP 8: SSL/HTTPS & Security

#### 8.1 HTTPS Certificate
```
✅ Automatic with Vercel
- Free SSL certificate
- Auto-renewal
- No configuration needed
```
**Status:** ✅ Auto-configured

#### 8.2 Security Headers
```
Already configured in next.config.js:
- Content Security Policy (CSP)
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy
```
**Status:** ✅ Already done

---

### STEP 9: Backup & Disaster Recovery

#### 9.1 Code Backup
```
✅ Automatic via GitHub
- All code versioned
- Complete history
- Can restore any previous version
```
**Status:** ✅ Auto-configured

#### 9.2 Strapi Content Backup
```
Recommended:
1. Strapi Cloud includes automatic backups
2. OR: Set up manual backup script
3. Export content weekly
4. Store in separate location
```
**Status:** ⬜

---

### STEP 10: Testing Everything

#### 10.1 Development Workflow Test
```bash
# Test the complete workflow:

# 1. Create feature branch
git checkout -b test/deployment

# 2. Make small change
echo "<!-- Test -->" >> README.md

# 3. Commit and push
git add .
git commit -m "Test deployment workflow"
git push origin test/deployment

# 4. Create Pull Request on GitHub
# 5. Vercel creates preview deployment
# 6. Test preview URL
# 7. Merge PR
# 8. Check production updates
```
**Status:** ⬜

#### 10.2 Content Update Test
```
1. Login to Strapi admin
2. Create new test product
3. Publish it
4. Check webhook fired successfully
5. Visit babpharma.com
6. Verify new product appears
7. Delete test product
```
**Status:** ⬜

#### 10.3 Performance Test
```
1. Visit: https://pagespeed.web.dev
2. Test: babpharma.com
3. Target scores:
   - Performance: > 90
   - Accessibility: > 90
   - Best Practices: > 90
   - SEO: > 90
4. Fix any issues if scores are low
```
**Status:** ⬜

---

## 🚀 Go Live Checklist

Before announcing to the world:

- [ ] Domain points to Vercel
- [ ] SSL certificate active (https://)
- [ ] All environment variables configured
- [ ] Strapi webhook working
- [ ] Sample content published
- [ ] Test all pages load correctly
- [ ] Test Arabic and English versions
- [ ] Mobile responsive design verified
- [ ] Forms working (if any)
- [ ] Analytics tracking
- [ ] Error monitoring setup
- [ ] Team members have access
- [ ] Documentation complete

---

## 📊 Post-Launch Monitoring

### Daily Checks (First Week)
- [ ] Check Vercel Analytics for traffic
- [ ] Monitor Sentry for errors
- [ ] Review Strapi content updates
- [ ] Check site speed (PageSpeed Insights)

### Weekly Checks
- [ ] Review user feedback
- [ ] Check for security updates
- [ ] Update dependencies if needed
- [ ] Review analytics trends

### Monthly Checks
- [ ] Performance audit
- [ ] Content audit
- [ ] Security audit
- [ ] Backup verification

---

## 🆘 Emergency Contacts & Resources

### If Site Goes Down
1. Check Vercel status: https://vercel-status.com
2. Check GitHub status: https://githubstatus.com
3. Check Strapi Cloud status
4. Contact Vercel support (if Pro plan)

### Documentation
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Strapi Docs: https://docs.strapi.io
- Your Deployment Guide: `docs/deployment.md`
- Architecture Explained: `docs/architecture-explained.md`

### Support Channels
- Vercel Support: support@vercel.com
- Strapi Support: support@strapi.io
- GitHub Issues: Your repository issues page

---

## ✅ Setup Complete!

When all items above are checked, you have:
- ✅ Professional production environment
- ✅ Automated CI/CD pipeline
- ✅ Content management system
- ✅ Team collaboration setup
- ✅ Monitoring and analytics
- ✅ Backup and recovery

**You're ready to scale!** 🎉
