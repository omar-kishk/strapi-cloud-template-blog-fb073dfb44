# BAB Pharma - Architecture & CI/CD Explained

## Overview: The Complete System

Your BAB Pharma website is built using a **modern JAMstack architecture** with three main components that work together:

```
┌─────────────────────────────────────────────────────────────────┐
│                     BAB PHARMA ECOSYSTEM                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐      ┌──────────────┐      ┌──────────────┐ │
│  │   GITHUB     │─────▶│   VERCEL     │─────▶│    USERS     │ │
│  │              │      │              │      │              │ │
│  │  Source Code │      │  Hosting &   │      │  Visitors    │ │
│  │  Version Ctrl│      │  Build Site  │      │  browsing    │ │
│  └──────────────┘      └──────────────┘      │  your site   │ │
│                               │               └──────────────┘ │
│                               │                                │
│                               ▼                                │
│                        ┌──────────────┐                        │
│                        │   STRAPI     │                        │
│                        │   (CMS)      │                        │
│                        │              │                        │
│                        │  Content     │                        │
│                        │  Management  │                        │
│                        └──────────────┘                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 1. What is Vercel? (Your Hosting Platform)

**Vercel is your website hosting and deployment platform.** Think of it as your website's home on the internet.

### What Vercel Does:

1. **Hosts Your Website**
   - Makes your site available at `babpharma.com`
   - Serves your website to visitors worldwide
   - Provides ultra-fast global CDN (Content Delivery Network)

2. **Builds Your Code**
   - Takes your Next.js code from GitHub
   - Runs `npm run build` automatically
   - Creates optimized production-ready files

3. **Automatic Deployments**
   - Every time you push to GitHub, Vercel automatically deploys
   - No manual deployment needed
   - Preview URLs for every pull request

4. **Performance & Analytics**
   - Monitors site speed (Core Web Vitals)
   - Tracks visitor analytics
   - Provides error logging

### Vercel in Simple Terms:
```
Your Code (GitHub) → Vercel Builds It → Live Website (babpharma.com)
```

---

## 2. What is Strapi? (Your Content Management System)

**Strapi is your Content Management System (CMS).** It's where you manage all your website content without touching code.

### What Strapi Does:

1. **Content Management**
   - Products (drugs, medical devices)
   - Regulatory documents
   - Certifications
   - News articles
   - Any text/images on your site

2. **Admin Dashboard**
   - User-friendly interface (no coding needed)
   - Your team can add/edit content easily
   - Multiple users with different permissions

3. **API for Your Website**
   - Provides data to your Next.js website
   - Your website fetches content from Strapi
   - Real-time content updates

4. **Internationalization**
   - Manages Arabic and English content
   - Easy translation workflow

### Strapi in Simple Terms:
```
You add/edit content in Strapi → Next.js fetches it → Displays on website
```

### Current Setup:
- **URL**: `https://skilled-virtue-a9d87d8aaf.strapiapp.com`
- **Already configured** in your `env.local`
- **Admin panel**: Visit URL + `/admin` to manage content

---

## 3. What is GitHub? (Your Code Storage & Version Control)

**GitHub is where your code lives and is versioned.** Think of it as Dropbox for code, but much more powerful.

### What GitHub Does:

1. **Code Storage**
   - Stores all your project files
   - Backup of your entire codebase
   - History of every change ever made

2. **Version Control**
   - Track who changed what and when
   - Revert to previous versions if needed
   - Branch for new features

3. **Collaboration**
   - Multiple developers can work together
   - Code reviews via Pull Requests
   - Team collaboration

4. **Trigger Deployments**
   - When you push code, Vercel sees it
   - Automatically starts building and deploying

### GitHub in Simple Terms:
```
Developer writes code → Pushes to GitHub → Vercel deploys to live site
```

---

## 4. How They All Connect: The Complete Workflow

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                    DEVELOPMENT & DEPLOYMENT FLOW                     │
└─────────────────────────────────────────────────────────────────────┘

  STEP 1: DEVELOPMENT
  ┌──────────────────┐
  │  Your Computer   │
  │                  │
  │  - Write code    │
  │  - Test locally  │
  │  - npm run dev   │
  └────────┬─────────┘
           │
           │ git push
           ▼
  STEP 2: VERSION CONTROL
  ┌──────────────────┐
  │     GITHUB       │
  │                  │
  │  - Stores code   │
  │  - Track changes │
  │  - Collaboration │
  └────────┬─────────┘
           │
           │ Webhook triggers
           ▼
  STEP 3: BUILD & DEPLOY
  ┌──────────────────┐
  │     VERCEL       │
  │                  │
  │  1. Pull code    │
  │  2. npm install  │
  │  3. npm build    │
  │  4. Deploy       │
  └────────┬─────────┘
           │
           │ Site goes live
           ▼
  STEP 4: LIVE WEBSITE
  ┌──────────────────┐
  │  babpharma.com   │
  │                  │
  │  Visitors see    │
  │  your website    │
  └────────┬─────────┘
           │
           │ Fetches content
           ▼
  STEP 5: CONTENT (STRAPI)
  ┌──────────────────┐
  │     STRAPI       │
  │                  │
  │  - Products      │
  │  - Documents     │
  │  - Content       │
  └──────────────────┘
```

---

## 5. Complete CI/CD Workflow (Step-by-Step)

### Scenario: You Want to Add a New Feature

#### **Day-to-Day Development Workflow**

**Step 1: Local Development**
```bash
# On your computer
cd D:\BAB\babpharma

# Create a new branch for your feature
git checkout -b feature/new-product-page

# Make changes to your code
# Edit files in VS Code

# Test locally
npm run dev
# Visit http://localhost:3000 to test

# Check for errors
npm run type-check
npm run lint
```

**Step 2: Commit Your Changes**
```bash
# Add files to git
git add .

# Commit with a message
git commit -m "Add new product page layout"

# Push to GitHub
git push origin feature/new-product-page
```

**Step 3: GitHub Receives Your Code**
- Code is now stored in GitHub repository
- Other team members can see your changes
- You can create a Pull Request for review

**Step 4: Vercel Automatically Deploys**
```
GitHub push detected
         ↓
Vercel webhook triggered
         ↓
Vercel clones your branch
         ↓
Runs: npm install
         ↓
Runs: npm run build
         ↓
Deploys to preview URL
         ↓
You get: https://babpharma-feature-xyz.vercel.app
```

**Step 5: Review Preview**
- Visit the preview URL
- Test your changes in production-like environment
- Share with team for feedback

**Step 6: Merge to Production**
```bash
# After review is approved
git checkout main
git merge feature/new-product-page
git push origin main
```

**Step 7: Production Deployment**
```
GitHub detects push to main
         ↓
Vercel automatically deploys
         ↓
Live site updates: babpharma.com
         ↓
Users see your changes!
```

---

## 6. Content Update Workflow (Non-Developers)

### For Marketing/Content Team (No Code Required)

**Step 1: Login to Strapi**
```
Visit: https://skilled-virtue-a9d87d8aaf.strapiapp.com/admin
Login with your credentials
```

**Step 2: Edit Content**
```
1. Click on "Products" in sidebar
2. Click "Add new product"
3. Fill in:
   - Product name (Arabic & English)
   - Description
   - Upload images
   - Add regulatory documents
4. Click "Save"
5. Click "Publish"
```

**Step 3: Website Automatically Updates**
```
Strapi sends webhook to Next.js
         ↓
Next.js revalidates cache
         ↓
New content appears on babpharma.com
         ↓
No deployment needed!
```

**Time to Live**: Changes appear in **seconds**, not hours!

---

## 7. Complete Setup Guide (If Starting Fresh)

### A. Setup GitHub Repository

```bash
# Initialize git in your project
cd D:\BAB\babpharma
git init

# Add all files
git add .

# First commit
git commit -m "Initial commit: BAB Pharma website"

# Create repository on GitHub.com
# Then connect it:
git remote add origin https://github.com/yourusername/babpharma.git
git branch -M main
git push -u origin main
```

### B. Setup Vercel

1. **Sign Up**
   - Visit https://vercel.com
   - Sign up with your GitHub account

2. **Import Project**
   ```
   Click "Add New Project"
   → Select your GitHub repository
   → Vercel auto-detects Next.js
   → Click "Deploy"
   ```

3. **Configure Environment Variables**
   ```
   In Vercel Dashboard:
   → Settings → Environment Variables
   → Add all variables from your .env.local:

   NEXT_PUBLIC_STRAPI_URL=https://skilled-virtue-a9d87d8aaf.strapiapp.com
   STRAPI_API_TOKEN=your_token
   NEXT_REVALIDATE_SECRET=your_secret
   (add all others from env.local)
   ```

4. **Configure Domain**
   ```
   → Settings → Domains
   → Add babpharma.com
   → Follow DNS configuration instructions
   ```

### C. Configure Strapi Webhook

1. **Login to Strapi Admin**
   - Visit `https://skilled-virtue-a9d87d8aaf.strapiapp.com/admin`

2. **Add Webhook**
   ```
   Settings → Webhooks → Create new webhook

   Name: Next.js Revalidation
   URL: https://babpharma.com/api/strapi-revalidate?secret=YOUR_SECRET
   Events: Select all Entry events (create, update, delete)
   ```

3. **Test Webhook**
   - Edit any content in Strapi
   - Save and publish
   - Check that website updates

---

## 8. Environments Explained

Your project should have **3 environments**:

### Development (Local)
```
Location: Your computer (localhost:3000)
Purpose: Active development and testing
Database: Local or dev Strapi instance
Used by: Developers only
```

### Staging (Preview)
```
Location: https://staging.babpharma.com
Purpose: Testing before production
Database: Staging Strapi instance
Used by: QA team, stakeholders
How it updates: Automatically from 'develop' branch
```

### Production (Live)
```
Location: https://babpharma.com
Purpose: Live website for public
Database: Production Strapi instance
Used by: Everyone (public visitors)
How it updates: Automatically from 'main' branch
```

---

## 9. Branch Strategy (Git Workflow)

```
main (production)
  ↑
  │ merge after testing
  │
develop (staging)
  ↑
  │ merge after feature complete
  │
feature/product-page ←── You work here
feature/contact-form ←── Another developer works here
```

### Typical Workflow:

1. **Create feature branch**
   ```bash
   git checkout -b feature/new-feature
   ```

2. **Work on feature**
   - Write code
   - Test locally
   - Commit often

3. **Push and create Pull Request**
   ```bash
   git push origin feature/new-feature
   # Then create PR on GitHub
   ```

4. **Code Review**
   - Team reviews your PR
   - Request changes if needed
   - Approve when ready

5. **Merge to develop**
   - Automatically deploys to staging
   - Test on staging environment

6. **Merge to main**
   - Automatically deploys to production
   - Live on babpharma.com

---

## 10. Monitoring & Maintenance

### Daily Operations

**For Developers:**
- Check Vercel Dashboard for build errors
- Monitor GitHub for pull requests
- Review Sentry for runtime errors

**For Content Team:**
- Use Strapi admin panel for content updates
- No need to touch code or deployment

**For Everyone:**
- Check Vercel Analytics for site performance
- Review visitor metrics
- Monitor uptime

### When Things Go Wrong

**Build Fails on Vercel:**
```
1. Check Vercel deployment logs
2. Look for error messages
3. Test locally: npm run build
4. Fix errors and push again
```

**Content Not Updating:**
```
1. Check Strapi webhook is configured
2. Test webhook manually
3. Check Next.js revalidation secret matches
```

**Site is Down:**
```
1. Check Vercel status page
2. Check domain DNS settings
3. Contact Vercel support if needed
```

---

## 11. Cost Breakdown

### Free Tier (Getting Started)

**Vercel:**
- ✅ Free for hobby projects
- ✅ Automatic HTTPS
- ✅ Unlimited bandwidth
- ✅ Preview deployments
- ⚠️ Limit: 100GB bandwidth/month

**Strapi Cloud:**
- ✅ Free tier available
- ⚠️ Limited to 1GB assets
- ⚠️ Single environment

**GitHub:**
- ✅ Free for public repositories
- ✅ Unlimited collaborators

**Total for Testing: $0/month**

### Production Ready (Recommended)

**Vercel Pro: $20/month**
- Commercial use license
- Team collaboration
- Advanced analytics
- Priority support

**Strapi Cloud Standard: $99/month**
- Multiple environments
- 10GB assets storage
- CDN included
- Priority support

**GitHub: Free or $4/month per user**
- Private repositories
- Advanced features

**Total for Production: ~$120-150/month**

---

## 12. Security Best Practices

### Environment Variables
```bash
# ✅ DO: Store secrets in Vercel
# ❌ DON'T: Commit .env.local to GitHub

# Add to .gitignore:
.env.local
.env*.local
```

### API Tokens
```bash
# Strapi token should be:
- Read-only for public content
- Stored securely in Vercel
- Rotated every 90 days
```

### Webhook Security
```bash
# Use webhook secret to verify requests
NEXT_REVALIDATE_SECRET=strong-random-string-here
```

---

## 13. Quick Reference Commands

### Local Development
```bash
npm run dev          # Start development server
npm run build        # Test production build
npm run type-check   # Check TypeScript errors
npm run lint         # Check code quality
```

### Git Commands
```bash
git status                    # Check changes
git add .                     # Stage all changes
git commit -m "message"       # Commit changes
git push                      # Push to GitHub
git pull                      # Get latest changes
git checkout -b feature/name  # Create new branch
```

### Deployment
```bash
# Automatic via Vercel (no manual commands needed)
# Just: git push → Vercel deploys automatically
```

---

## 14. Troubleshooting Guide

### Common Issues

**Issue: Build fails with type errors**
```bash
Solution:
npm run type-check  # Check errors locally
# Fix errors
git commit -m "Fix type errors"
git push
```

**Issue: Content not updating on site**
```bash
Solution:
1. Check Strapi webhook is working
2. Visit: /api/strapi-revalidate?secret=YOUR_SECRET
3. Should return {"ok":true}
```

**Issue: Environment variables not working**
```bash
Solution:
1. Go to Vercel Dashboard
2. Settings → Environment Variables
3. Make sure all vars are set
4. Redeploy: Deployments → Click "..." → Redeploy
```

---

## Summary: The Big Picture

```
┌─────────────────────────────────────────────────────────────┐
│                    YOUR WORKFLOW                             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  YOU (Developer)                                            │
│    ↓                                                         │
│  Write Code (VS Code)                                       │
│    ↓                                                         │
│  Test Locally (npm run dev)                                 │
│    ↓                                                         │
│  Push to GitHub (git push)                                  │
│    ↓                                                         │
│  GitHub triggers Vercel                                     │
│    ↓                                                         │
│  Vercel builds & deploys                                    │
│    ↓                                                         │
│  Site goes live (babpharma.com)                             │
│    ↓                                                         │
│  Content team updates Strapi                                │
│    ↓                                                         │
│  Webhook updates Next.js                                    │
│    ↓                                                         │
│  Visitors see fresh content!                                │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Time from code to production: ~2-5 minutes** ⚡

Everything is automated. You focus on writing great code, and the infrastructure handles the rest!
