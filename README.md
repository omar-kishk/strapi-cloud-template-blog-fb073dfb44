# 🧬 Bait Al Batterjee Pharmaceutical Industries

**babpharma.com** - Leading pharmaceutical company website built with cutting-edge technology for healthcare innovation.

![BAB Pharma](https://img.shields.io/badge/BAB-Pharmaceutical-blue)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-blue)
![Three.js](https://img.shields.io/badge/Three.js-Molecular-green)

## 🚀 Overview

A modern, responsive pharmaceutical website featuring:
- **3D Molecular Visualizations** for drug compounds
- **Advanced Drug Catalog** with interactive components
- **HIPAA-Compliant** architecture
- **Pharmaceutical-Grade** UI/UX design
- **Real-time Analytics** and monitoring
- **Enterprise-Level** security and performance

## 🏗️ Tech Stack

### Frontend Framework
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations

### 3D & Visualization
- **React Three Fiber** for 3D rendering
- **Three.js** for molecular visualizations
- **@react-three/drei** for 3D helpers
- **3Dmol.js** for pharmaceutical molecules

### UI Components
- **Shadcn/UI** component library
- **Radix UI** primitives
- **Lucide React** icons
- **Custom pharmaceutical components**

### Backend & Database
- **Supabase** (PostgreSQL) for portal operational data
- **Strapi CMS** for content management (AR/EN, webhooks for revalidation)
- **Clerk** for authentication
- **Vercel** for deployment

### Analytics & Monitoring
- **Vercel Analytics** for performance
- **Sentry** for error tracking
- **Custom healthcare metrics**

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Quick Start

```bash
# Clone the repository
git clone https://github.com/bab-pharma/babpharma.git
cd babpharma

# Install dependencies
npm install

# Copy environment variables
cp env.example .env.local

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the website.

## 🔧 Configuration

### Environment Variables

Create `.env.local` file and configure:

```bash
# Database
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key

# Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret

# CMS (Strapi)
NEXT_PUBLIC_STRAPI_URL=https://your-strapi.example.com
STRAPI_API_TOKEN=your_strapi_api_token
STRAPI_WEBHOOK_SECRET=your_webhook_secret
NEXT_REVALIDATE_SECRET=your_webhook_secret

# AI Integration
OPENAI_API_KEY=your_openai_key
```

### Database Setup

1. Create Supabase project
2. Run database migrations
3. Configure Row Level Security
4. Set up pharmaceutical data tables

### CMS Configuration (Strapi)

1. Deploy or run Strapi v4 (Cloud/Self-hosted)
2. Enable i18n (Arabic default, English)
3. Create API Token (read-only) and add to `.env.local`
4. Configure Webhook → `POST /api/strapi-revalidate?secret=...`
5. Allow your domain in CORS; set image provider (e.g., Cloudinary)

## 🧬 Pharmaceutical Features

### Drug Catalog System
- **Interactive Drug Cards** with detailed information
- **Prescription vs OTC** categorization
- **Dosage and Usage** guidelines
- **Safety Information** and warnings
- **Price and Availability** tracking

### 3D Molecular Visualization
- **Interactive molecule viewer** with React Three Fiber
- **Chemical structure rendering** for drug compounds
- **Atom-level interaction** and information panels
- **Pre-built molecular libraries** (Aspirin, etc.)
- **Custom molecule loading** capabilities

### Healthcare Compliance
- **HIPAA-compliant** data handling
- **FDA regulation** compliance features
- **Clinical trial** data integration
- **Quality assurance** tracking
- **Regulatory documentation** management

## 🎨 Component Library

### Pharmaceutical Components
```typescript
// Drug information card
<DrugCard 
  name="BAB-Aspirin Plus"
  genericName="Acetylsalicylic Acid"
  category="Analgesic"
  prescriptionRequired={false}
  rating={4.8}
  price="SAR 25.00"
/>

// 3D Molecular viewer
<MolecularVisualization
  moleculeName="Aspirin (C₉H₈O₄)"
  atoms={ASPIRIN_MOLECULE.atoms}
  bonds={ASPIRIN_MOLECULE.bonds}
  autoRotate={true}
/>
```

### UI Components
- Buttons, Cards, Forms, Dialogs
- Data tables and charts
- Navigation and layout components
- Pharmaceutical-specific icons and badges

## 📱 Features

### Core Functionality
- ✅ **Product Catalog** - Comprehensive drug database
- ✅ **3D Visualization** - Interactive molecular models
- ✅ **Search & Filter** - Advanced pharmaceutical search
- ✅ **User Authentication** - Secure healthcare professional login
- ✅ **Content Management** - Dynamic content updates
- ✅ **Analytics Dashboard** - Real-time metrics and insights

### Advanced Features
- 🔬 **Clinical Trial Integration**
- 📊 **Drug Interaction Checker**
- 🏥 **Healthcare Provider Portal**
- 📱 **Mobile-First Design**
- 🌐 **Multi-language Support**
- 🔐 **Enterprise Security**

## 🛠️ Development

### Project Structure
```
babpharma/
├── app/                    # Next.js App Router
│   ├── drugs/             # Drug catalog pages
│   ├── research/          # R&D section
│   └── compliance/        # Regulatory pages
├── src/
│   ├── components/
│   │   ├── pharmaceutical/ # Drug-specific components
│   │   ├── 3d/            # Three.js components
│   │   ├── ui/            # Shadcn components
│   │   └── forms/         # Compliance forms
│   └── lib/
│       ├── pharmaceutical/ # Drug calculations
│       ├── 3d/            # Three.js utilities
│       └── compliance/    # Regulatory helpers
└── public/                # Static assets
```

### Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript checking

# Testing
npm run test         # Run tests
npm run test:watch   # Watch mode testing
npm run test:e2e     # End-to-end tests

# Database
npm run db:generate  # Generate database types
npm run db:migrate   # Run migrations
npm run db:seed      # Seed with sample data
```

## 🧪 Testing

### Unit Testing
- **Jest** for unit tests
- **React Testing Library** for component testing
- **Pharmaceutical calculation** testing

### E2E Testing
- **Playwright** for end-to-end testing
- **Critical user journeys** testing
- **Drug search and visualization** testing

### Performance Testing
- **Lighthouse** scoring
- **3D rendering** performance
- **Mobile optimization** testing

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Deploy to Vercel
npm install -g vercel
vercel --prod
```

### Environment-Specific Deployments
- **Development**: `dev.babpharma.com`
- **Staging**: `staging.babpharma.com` 
- **Production**: `babpharma.com`

## 📊 Analytics & Monitoring

### Performance Monitoring
- **Vercel Analytics** for web vitals
- **Custom pharmaceutical metrics**
- **3D rendering performance** tracking
- **User engagement** analytics

### Error Monitoring
- **Sentry** for error tracking
- **Healthcare compliance** monitoring
- **API performance** tracking
- **User experience** monitoring

## 🔐 Security

### Healthcare Compliance
- **HIPAA compliance** implementation
- **Data encryption** at rest and in transit
- **Audit logging** for all actions
- **Role-based access** control

### Security Features
- **Content Security Policy** (CSP)
- **HTTPS enforcement**
- **API rate limiting**
- **Input sanitization**

## 🤝 Contributing

### Development Guidelines
1. Follow pharmaceutical industry standards
2. Ensure HIPAA compliance
3. Test all 3D components thoroughly
4. Document drug calculation functions
5. Maintain accessibility standards

### Code Style
- **Prettier** for formatting
- **ESLint** for code quality
- **TypeScript** strict mode
- **Pharmaceutical naming** conventions

## 📖 Documentation

### Core Docs
- [Requirements](./docs/requirements.md)
- [Architecture](./docs/architecture.md)
- [Information Architecture & Site Map](./docs/site-map.md)
- [Content, Brand, SEO & Compliance Strategy](./docs/content-strategy.md)
- Brand Guide: [docs/Brand-Guidelines.pdf](./docs/Brand-Guidelines.pdf)

### Diagrams (Eraser)
- [ERD](./docs/diagrams/bab-erd.eraserdiagram)
- [Cloud Architecture](./docs/diagrams/bab-cloud-architecture.eraserdiagram)
- [Sequence: Healthcare Provider Journey](./docs/diagrams/bab-sequence-healthcare-provider.eraserdiagram)
- [Flow: Regulatory Content Publishing](./docs/diagrams/bab-flow-regulatory-content.eraserdiagram)

### API Documentation
- [Drug Database API](./docs/api/drugs.md)
- [Molecular Data API](./docs/api/molecules.md)
- [Clinical Trials API](./docs/api/trials.md)

### Component Documentation
- [Pharmaceutical Components](./docs/components/pharmaceutical.md)
- [3D Visualization Components](./docs/components/3d.md)
- [Form Components](./docs/components/forms.md)

## 🆘 Support

### Technical Support
- **Email**: tech@babpharma.com
- **Documentation**: [docs.babpharma.com](https://docs.babpharma.com)
- **GitHub Issues**: [Report issues](https://github.com/bab-pharma/babpharma/issues)

### Healthcare Inquiries
- **Medical Information**: medical@babpharma.com
- **Regulatory Questions**: regulatory@babpharma.com
- **Clinical Trials**: trials@babpharma.com

## 📄 License

Copyright © 2024 Bait Al Batterjee Pharmaceutical Industries. All rights reserved.

This project is proprietary software. Unauthorized copying, distribution, or modification is strictly prohibited.

---

**Built with ❤️ for Healthcare Innovation**

*Bait Al Batterjee Pharmaceutical Industries - Leading the future of healthcare through innovative pharmaceutical solutions.*
