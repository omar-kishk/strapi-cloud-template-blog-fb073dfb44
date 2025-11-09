'use client'

import React from 'react'
import { motion, Variants } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  ArrowRight, 
  Users, 
  Globe, 
  Award, 
  Microscope,
  TrendingUp
} from 'lucide-react'

import { TherapeuticArea3DIcons } from '@/components/icons/Medical3DIcons'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import SupplyChainMap from '@/components/pharmaceutical/SupplyChainMap'
import DrugCards from '@/components/pharmaceutical/DrugCards'
import AdvancedAnimations from '@/components/3d/AdvancedAnimations'

import { usePathname } from 'next/navigation'

export default function HomePage() {
  const pathname = usePathname()
  const seg = pathname?.split('/')?.[1]
  const language: 'en' | 'ar' = seg === 'ar' ? 'ar' : 'en'

  // Enhanced animation variants following the guidelines
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    show: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const text = {
    en: {
      // Hero Section - Aitia Bio Inspired
      heroTitle: 'Building Tomorrow\'s Healthcare Excellence',
      heroSubtitle: 'in the Kingdom of Saudi Arabia',
      heroDescription: 'Since 1979, BAB Pharmaceutical Industries has been the cornerstone of pharmaceutical innovation in Saudi Arabia, serving over 50 million patients across 25+ countries with world-class manufacturing, import & distribution excellence, and cutting-edge research & development.',
      heroCtaPrimary: 'Explore Our Solutions',
      heroCta: 'Partner With Us',
      heroTrustBadge: 'Trusted by 10,000+ Healthcare Providers',
      
      // Stats
      patientsServed: 'Patients Served Globally',
      yearsExperience: 'Years of Pharmaceutical Excellence',
      countriesReached: 'Countries & Regions Reached',
      researchProjects: 'Active Research Projects',
      
      // Business Areas
      businessAreasTitle: 'Three Pillars of Pharmaceutical Excellence',
      businessAreasSubtitle: 'Comprehensive pharmaceutical solutions spanning the entire healthcare value chain',
      
      importDistribution: 'Global Import & Distribution',
      importDesc: 'Extensive international supplier network delivering quality pharmaceuticals across Saudi Arabia with FDA-compliant cold chain management and real-time tracking systems.',
      
      manufacturing: 'World-Class Manufacturing',
      manufacturingDesc: 'State-of-the-art GMP-certified facilities producing Novel Generics, Advanced Medical Devices, and Premium Nutraceutical products meeting international quality standards.',
      
      researchDev: 'Innovation & Research',
      researchDesc: 'Cutting-edge pharmaceutical research driving breakthrough innovations in drug development, bioequivalence studies, and next-generation therapeutic solutions.',
      
      // Featured Products
      featuredTitle: 'Featured Pharmaceutical Portfolio',
      featuredSubtitle: 'Discover our comprehensive range of evidence-based therapeutic solutions',
      
      // Company Values
      valuesTitle: 'Why Healthcare Leaders Choose BAB Pharma',
      valuesSubtitle: 'Our unwavering commitment to pharmaceutical excellence and patient outcomes',
      
      qualityAssurance: 'Pharmaceutical Quality Excellence',
      qualityDesc: 'Saudi FDA licensed with ISO 9001, ISO 13485, and GMP certified manufacturing processes ensuring pharmaceutical-grade quality and regulatory compliance.',
      
      patientCare: 'Patient-Centric Innovation',
      patientDesc: 'Comprehensive 24/7 pharmaceutical support with dedicated healthcare professional consultation, adverse event monitoring, and patient safety programs.',
      
      innovation: 'Scientific Innovation Leadership',
      innovationDesc: 'Continuous R&D investment developing breakthrough therapeutic solutions, advanced drug delivery systems, and personalized medicine approaches.',
      
      // Supply Chain
      supplyChainTitle: 'Real-Time Global Supply Chain Intelligence',
      supplyChainDesc: 'Advanced interactive visualization of our global pharmaceutical supply network spanning international suppliers to local healthcare providers',
      
      // CTA Section
      ctaTitle: 'Ready to Partner with Saudi Arabia\'s Premier Pharmaceutical Company?',
      ctaDesc: 'Join our expanding network of healthcare providers, government institutions, research centers, and international pharmaceutical partners',
      ctaButton: 'Initiate Partnership Discussion',
      ctaContact: 'Contact Our Expert Team',
      
      // Contact Info
      emergencySupport: '24/7 Emergency Pharmaceutical Support Available',
      nupcoPartner: 'Certified NUPCO Government Procurement Partner',
      fdaLicensed: 'Saudi FDA Licensed & Internationally Compliant',
      networkStatus: 'Global Network Status: Fully Operational'
    },
    ar: {
      // Hero Section
      heroTitle: 'بناء تميز الرعاية الصحية للمستقبل',
      heroSubtitle: 'في المملكة العربية السعودية',
      heroDescription: 'منذ عام 1979، تُعتبر شركة بيت البطرجي للصناعات الدوائية حجر الأساس للابتكار الدوائي في المملكة العربية السعودية، حيث تخدم أكثر من 50 مليون مريض عبر 25+ دولة بتميز التصنيع العالمي والاستيراد والتوزيع والبحث والتطوير المتطور.',
      heroCtaPrimary: 'استكشف حلولنا',
      heroCta: 'شارك معنا',
      heroTrustBadge: 'موثوق من قبل 10,000+ مقدم رعاية صحية',
      
      // Stats
      patientsServed: 'مريض تم خدمته عالمياً',
      yearsExperience: 'عام من التميز الدوائي',
      countriesReached: 'دولة ومنطقة تم الوصول إليها',
      researchProjects: 'مشروع بحثي نشط',
      
      // Business Areas
      businessAreasTitle: 'الركائز الثلاث للتميز الدوائي',
      businessAreasSubtitle: 'حلول دوائية شاملة تغطي سلسلة القيمة الصحية بالكامل',
      
      importDistribution: 'الاستيراد والتوزيع العالمي',
      importDesc: 'شبكة عالمية من الموردين المعتمدين',
      
      manufacturing: 'التصنيع العالمي',
      manufacturingDesc: 'مرافق معتمدة بأعلى المعايير العالمية',
      
      researchDev: 'البحث والتطوير',
      researchDesc: 'ابتكارات علمية رائدة في تطوير الأدوية',
      
      // Featured Products
      featuredTitle: 'محفظة المنتجات الدوائية المميزة',
      featuredSubtitle: 'اكتشف مجموعتنا الشاملة من الحلول العلاجية المبنية على الأدلة',
      
      // Company Values
      valuesTitle: 'لماذا يختار قادة الرعاية الصحية بيت البطرجي',
      valuesSubtitle: 'التزامنا الثابت بالتميز الدوائي ونتائج المرضى',
      
      qualityAssurance: 'ضمان الجودة الدوائية',
      qualityDesc: 'معايير عالمية لضمان الجودة الدوائية',
      
      patientCare: 'العناية المتمركزة حول المريض',
      patientDesc: 'دعم شامل ومتقدم للمرضى والمهنيين الصحيين',
      
      innovation: 'قيادة الابتكار العلمي',
      innovationDesc: 'استثمار مستمر في البحث والتطوير',
      
      // Supply Chain
      supplyChainTitle: 'ذكاء سلسلة التوريد العالمية في الوقت الفعلي',
      supplyChainDesc: 'تصور تفاعلي متقدم لشبكة التوريد الدوائية العالمية',
      
      // CTA Section
      ctaTitle: 'هل أنت مستعد للشراكة مع الشركة الدوائية الرائدة في السعودية؟',
      ctaDesc: 'انضم إلى شبكتنا المتنامية من مقدمي الرعاية الصحية والمؤسسات الحكومية',
      ctaButton: 'بدء مناقشة الشراكة',
      ctaContact: 'اتصل بفريق الخبراء',
      
      // Contact Info
      emergencySupport: 'دعم طارئ دوائي متاح على مدار الساعة',
      nupcoPartner: 'شريك معتمد لمشتريات نوبكو الحكومية',
      fdaLicensed: 'مرخص من هيئة الغذاء والدواء السعودية',
      networkStatus: 'حالة الشبكة العالمية: تعمل بالكامل'
    }
  }

  const stats = [
    { value: '50M+', label: text[language].patientsServed, icon: Users, color: 'text-primary' },
    { value: '45+', label: text[language].yearsExperience, icon: Award, color: 'text-secondary' },
    { value: '25+', label: text[language].countriesReached, icon: Globe, color: 'text-primary' },
    { value: '200+', label: text[language].researchProjects, icon: Microscope, color: 'text-foreground' },
  ]

  // Commented out temporarily since 3D and complex sections are removed for performance
  /*
  const businessAreas = [
    {
      title: text[language].importDistribution,
      description: text[language].importDesc,
      icon: Truck,
      color: 'bg-gradient-to-br from-bab-turquoise to-bab-turquoise/90',
      features: ['Global Supplier Network', 'Cold Chain Management', 'FDA Compliance', 'Real-time Tracking', 'Quality Assurance']
    },
    {
      title: text[language].manufacturing,
      description: text[language].manufacturingDesc,
      icon: Factory,
      color: 'bg-gradient-to-br from-bab-purple to-bab-purple/90',
      features: ['Novel Generics', 'Medical Devices', 'Nutraceuticals', 'GMP Certified', 'ISO Standards']
    },
    {
      title: text[language].researchDev,
      description: text[language].researchDesc,
      icon: Microscope,
      color: 'bg-gradient-to-br from-bab-charcoal to-bab-charcoal/90',
      features: ['Drug Development', 'Clinical Trials', 'Bioequivalence', 'Innovation Labs', 'Patent Portfolio']
    }
  ]

  const values = [
    {
      title: text[language].qualityAssurance,
      description: text[language].qualityDesc,
      icon: Shield,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      title: text[language].patientCare,
      description: text[language].patientDesc,
      icon: Heart,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: text[language].innovation,
      description: text[language].innovationDesc,
      icon: Star,
      color: 'text-foreground',
      bgColor: 'bg-foreground/10'
    }
  ]
  */

  return (
    <div className={`min-h-screen bg-background ${language === 'ar' ? 'rtl' : 'ltr'} relative`}>
      {/* 3D Pharmaceutical Background */}
      {/* <PharmaceuticalBackground scrollProgress={scrollProgress} /> */}
      
      <div className="relative z-10">
      <Header />
      
        {/* Hero Section - Aitia Bio Inspired Design */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Sophisticated Background with BAB Brand Colors */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,hsl(var(--primary)/0.08),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,hsl(var(--secondary)/0.06),transparent_50%)]" />
          
          {/* Animated Floating Elements */}
          <motion.div
            className="absolute top-20 left-20 w-4 h-4 bg-secondary/30 rounded-full"
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 6,
              ease: "easeInOut"
            }}
            viewport={{ once: true }}
          />
          <motion.div
            className="absolute top-40 right-32 w-3 h-3 bg-primary/40 rounded-full"
            animate={{
              y: [0, 15, 0],
              x: [0, -15, 0],
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 8,
              ease: "easeInOut",
              delay: 1
            }}
            viewport={{ once: true }}
          />
          <motion.div
            className="absolute bottom-32 left-40 w-2 h-2 bg-secondary/50 rounded-full"
            animate={{
              y: [0, -25, 0],
              rotate: [0, 360, 0],
            }}
            transition={{
              duration: 10,
              ease: "linear"
            }}
            viewport={{ once: true }}
          />
          
          {/* Enhanced Connecting Lines - Aitia Bio Style */}
          <motion.div 
            className="absolute top-1/4 left-1/4 w-24 h-px bg-gradient-to-r from-secondary/30 to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          />
          <motion.div 
            className="absolute top-1/3 right-1/3 w-16 h-px bg-gradient-to-l from-primary/30 to-transparent rotate-45"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 1 }}
          />
          <motion.div 
            className="absolute bottom-1/4 left-1/3 w-20 h-px bg-gradient-to-r from-secondary/40 to-transparent rotate-12"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 1.5 }}
          />
        
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="max-w-7xl mx-auto">
              {/* Aitia-Inspired Hero Content */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="text-center space-y-16"
              >
                {/* Brand Goal Statement - Elegant Pill Shape */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.3, duration: 1, ease: "backOut" }}
                  className="space-y-6"
                >
                  <motion.div 
                    className="inline-flex items-center gap-3 bg-primary/10 px-10 py-5 rounded-full border border-primary/20 backdrop-blur-sm"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div 
                      className="w-2 h-2 bg-secondary rounded-full"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
                    />
                    <span className="text-foreground font-semibold tracking-wider uppercase text-sm">
                      {language === 'ar' ? 'رسالة باب الدوائية' : 'BAB\'s Pharmaceutical Mission'}
                    </span>
                  </motion.div>
              </motion.div>

                {/* Main Hero Title - Bold Aitia Style */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
                  className="space-y-8"
                >
                  <h1 className={`text-5xl lg:text-7xl xl:text-8xl font-bold leading-none tracking-tight text-foreground ${language === 'ar' ? 'headline-ar' : 'headline-en'}`}>
                    <motion.span 
                      className="block text-muted-foreground mb-4"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1, duration: 0.8 }}
                    >
                      {language === 'ar' ? 'بناء' : 'BUILDING'}
                    </motion.span>
                    <motion.span 
                      className="block bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent mb-4"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.2, duration: 1, ease: "backOut" }}
                    >
                      {language === 'ar' ? 'معرفة عميقة' : 'DEEP KNOWLEDGE'}
                    </motion.span>
                    <motion.span 
                      className="block text-muted-foreground/80 text-3xl lg:text-5xl xl:text-6xl font-medium"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.4, duration: 0.8 }}
                    >
                      {language === 'ar' ? 'من البيولوجيا الدوائية المعقدة' : 'OF COMPLEX PHARMACEUTICAL BIOLOGY'}
                    </motion.span>
                  </h1>
                  
                  <motion.p 
                    className={`text-lg lg:text-xl font-medium text-muted-foreground max-w-4xl mx-auto uppercase tracking-wider ${language === 'ar' ? 'body-ar' : 'body-en'}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.6, duration: 0.8 }}
                  >
                    {language === 'ar' 
                      ? 'لقيادة الجيل التالي من العلاجات الرائدة في المملكة العربية السعودية'
                      : 'TO DRIVE THE NEXT GENERATION OF BREAKTHROUGH THERAPIES IN SAUDI ARABIA'
                    }
                  </motion.p>
                </motion.div>

                {/* Call-to-Action Buttons */}
              <motion.div
                  initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8, duration: 0.8 }}
                  className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Button
                    size="lg"
                      className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300"
                  >
                    {text[language].heroCtaPrimary}
                      <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
                  
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Button
                    size="lg"
                    className="bab-button-secondary px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    {text[language].heroCta}
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
            </div>
          </div>
        </section>

        {/* Therapeutic Areas Section - Enhanced with Pharmaceutical Icons */}
        <section className="py-20 bg-gradient-to-br from-background to-background/50 relative overflow-hidden">
          <div className="container mx-auto px-6">
            
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <motion.h2 
                className={`text-4xl lg:text-5xl font-bold text-foreground mb-6 ${language === 'ar' ? 'headline-ar' : 'headline-en'}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                {language === 'ar' ? 'التخصصات العلاجية' : 'Therapeutic Specialties'}
              </motion.h2>
              <motion.p 
                className={`text-xl text-muted-foreground max-w-3xl mx-auto ${language === 'ar' ? 'body-ar' : 'body-en'}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
              >
                {language === 'ar' 
                  ? 'نغطي مجموعة واسعة من التخصصات الطبية بحلول دوائية متطورة ومبتكرة'
                  : 'Comprehensive pharmaceutical solutions across diverse medical specialties and therapeutic areas'
                }
              </motion.p>
            </motion.div>

            {/* Therapeutic Areas Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              
              {/* Cardiovascular */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
                className="group"
              >
                <div className="bg-background border border-primary/10 rounded-2xl p-6 hover:shadow-xl hover:border-primary/30 transition-all duration-300 relative overflow-hidden">
                  {/* 3D Background Icon */}
                  <div className="absolute top-2 right-2 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                    <TherapeuticArea3DIcons.cardiovascular.primary size="xl" color="primary" />
                  </div>
                  
                  <div className="flex items-center gap-4 mb-4 relative z-10">
                    <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                      <TherapeuticArea3DIcons.cardiovascular.primary size="lg" color="primary" />
                    </div>
                    <div className="flex gap-2">
                      <div className="p-2 bg-secondary/5 rounded-lg group-hover:bg-secondary/10 transition-colors duration-300">
                        <TherapeuticArea3DIcons.cardiovascular.secondary size="sm" color="secondary" />
                      </div>
                      <div className="p-2 bg-foreground/5 rounded-lg group-hover:bg-foreground/10 transition-colors duration-300">
                        <TherapeuticArea3DIcons.cardiovascular.tertiary size="sm" color="custom" customColor="#2E2A2B" />
                      </div>
                    </div>
                  </div>
                  <h3 className={`text-lg font-semibold text-foreground mb-2 ${language === 'ar' ? 'headline-ar' : 'headline-en'}`}>
                    {language === 'ar' ? 'أمراض القلب والأوعية الدموية' : 'Cardiovascular Medicine'}
                  </h3>
                  <p className={`text-sm text-muted-foreground/60 ${language === 'ar' ? 'body-ar' : 'body-en'}`}>
                    {language === 'ar' 
                      ? 'أدوية متطورة لعلاج أمراض القلب وضغط الدم'
                      : 'Advanced therapies for heart disease, hypertension, and cardiac care'
                    }
                  </p>
                </div>
              </motion.div>

              {/* Neurology */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
                className="group"
              >
                <div className="bg-background border border-secondary/10 rounded-2xl p-6 hover:shadow-xl hover:border-secondary/30 transition-all duration-300 relative overflow-hidden">
                  {/* 3D Background Icon */}
                  <div className="absolute top-2 right-2 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                    <TherapeuticArea3DIcons.neurology.primary size="xl" color="secondary" />
                  </div>
                  
                  <div className="flex items-center gap-4 mb-4 relative z-10">
                    <div className="p-3 bg-secondary/10 rounded-xl group-hover:bg-secondary/20 transition-all duration-300 group-hover:scale-110">
                      <TherapeuticArea3DIcons.neurology.primary size="lg" color="secondary" />
                    </div>
                    <div className="flex gap-2">
                      <div className="p-2 bg-primary/5 rounded-lg group-hover:bg-primary/10 transition-colors duration-300">
                        <TherapeuticArea3DIcons.neurology.secondary size="sm" color="primary" />
                      </div>
                      <div className="p-2 bg-foreground/5 rounded-lg group-hover:bg-foreground/10 transition-colors duration-300">
                        <TherapeuticArea3DIcons.neurology.tertiary size="sm" color="custom" customColor="#2E2A2B" />
                      </div>
                    </div>
                  </div>
                  <h3 className={`text-lg font-semibold text-foreground mb-2 ${language === 'ar' ? 'headline-ar' : 'headline-en'}`}>
                    {language === 'ar' ? 'طب الأعصاب' : 'Neurology & Psychiatry'}
                  </h3>
                  <p className={`text-sm text-muted-foreground/60 ${language === 'ar' ? 'body-ar' : 'body-en'}`}>
                    {language === 'ar' 
                      ? 'علاجات الجهاز العصبي والصحة النفسية'
                      : 'Neurological disorders, mental health, and brain therapeutics'
                    }
                  </p>
                </div>
              </motion.div>

              {/* Oncology */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
                className="group"
              >
                <div className="bg-background border border-foreground/10 rounded-2xl p-6 hover:shadow-xl hover:border-foreground/30 transition-all duration-300 relative overflow-hidden">
                  {/* 3D Background Icon */}
                  <div className="absolute top-2 right-2 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                    <TherapeuticArea3DIcons.oncology.primary size="xl" color="custom" customColor="#2E2A2B" />
                  </div>
                  
                  <div className="flex items-center gap-4 mb-4 relative z-10">
                    <div className="p-3 bg-foreground/10 rounded-xl group-hover:bg-foreground/20 transition-all duration-300 group-hover:scale-110">
                      <TherapeuticArea3DIcons.oncology.primary size="lg" color="custom" customColor="#2E2A2B" />
                    </div>
                    <div className="flex gap-2">
                      <div className="p-2 bg-primary/5 rounded-lg group-hover:bg-primary/10 transition-colors duration-300">
                        <TherapeuticArea3DIcons.oncology.secondary size="sm" color="primary" />
                      </div>
                      <div className="p-2 bg-secondary/5 rounded-lg group-hover:bg-secondary/10 transition-colors duration-300">
                        <TherapeuticArea3DIcons.oncology.tertiary size="sm" color="secondary" />
                      </div>
                    </div>
                  </div>
                  <h3 className={`text-lg font-semibold text-foreground mb-2 ${language === 'ar' ? 'headline-ar' : 'headline-en'}`}>
                    {language === 'ar' ? 'علاج الأورام' : 'Oncology & Cancer Care'}
                  </h3>
                  <p className={`text-sm text-muted-foreground/60 ${language === 'ar' ? 'body-ar' : 'body-en'}`}>
                    {language === 'ar' 
                      ? 'علاجات متقدمة لمكافحة السرطان والأورام'
                      : 'Advanced cancer therapeutics and targeted oncology treatments'
                    }
                  </p>
                </div>
              </motion.div>

              {/* Endocrinology */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
                className="group"
              >
                <div className="bg-background border border-primary/10 rounded-2xl p-6 hover:shadow-xl hover:border-primary/30 transition-all duration-300 relative overflow-hidden">
                  {/* 3D Background Icon */}
                  <div className="absolute top-2 right-2 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                    <TherapeuticArea3DIcons.endocrinology.primary size="xl" color="primary" />
                  </div>
                  
                  <div className="flex items-center gap-4 mb-4 relative z-10">
                    <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                      <TherapeuticArea3DIcons.endocrinology.primary size="lg" color="primary" />
                    </div>
                    <div className="flex gap-2">
                      <div className="p-2 bg-secondary/5 rounded-lg group-hover:bg-secondary/10 transition-colors duration-300">
                        <TherapeuticArea3DIcons.endocrinology.secondary size="sm" color="secondary" />
                      </div>
                      <div className="p-2 bg-foreground/5 rounded-lg group-hover:bg-foreground/10 transition-colors duration-300">
                        <TherapeuticArea3DIcons.endocrinology.tertiary size="sm" color="custom" customColor="#2E2A2B" />
                      </div>
                    </div>
                  </div>
                  <h3 className={`text-lg font-semibold text-foreground mb-2 ${language === 'ar' ? 'headline-ar' : 'headline-en'}`}>
                    {language === 'ar' ? 'الغدد الصماء والسكري' : 'Endocrinology & Diabetes'}
                  </h3>
                  <p className={`text-sm text-muted-foreground/60 ${language === 'ar' ? 'body-ar' : 'body-en'}`}>
                    {language === 'ar' 
                      ? 'علاجات السكري وأمراض الغدد الصماء'
                      : 'Diabetes management, endocrine disorders, and metabolic health'
                    }
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Additional Therapeutic Areas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
              
              {/* Infectious Diseases */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
                className="group"
              >
                <div className="bg-background border border-secondary/10 rounded-2xl p-6 hover:shadow-xl hover:border-secondary/30 transition-all duration-300 relative overflow-hidden">
                  {/* 3D Background Icon */}
                  <div className="absolute top-2 right-2 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                    <TherapeuticArea3DIcons.infectious.primary size="xl" color="secondary" />
                  </div>
                  
                  <div className="flex items-center gap-4 mb-4 relative z-10">
                    <div className="p-3 bg-secondary/10 rounded-xl group-hover:bg-secondary/20 transition-all duration-300 group-hover:scale-110">
                      <TherapeuticArea3DIcons.infectious.primary size="lg" color="secondary" />
                    </div>
                    <div className="flex gap-2">
                      <div className="p-2 bg-primary/5 rounded-lg group-hover:bg-primary/10 transition-colors duration-300">
                        <TherapeuticArea3DIcons.infectious.secondary size="sm" color="primary" />
                      </div>
                      <div className="p-2 bg-foreground/5 rounded-lg group-hover:bg-foreground/10 transition-colors duration-300">
                        <TherapeuticArea3DIcons.infectious.tertiary size="sm" color="custom" customColor="#2E2A2B" />
                      </div>
                    </div>
                  </div>
                  <h3 className={`text-lg font-semibold text-foreground mb-2 ${language === 'ar' ? 'headline-ar' : 'headline-en'}`}>
                    {language === 'ar' ? 'الأمراض المعدية' : 'Infectious Diseases'}
                  </h3>
                  <p className={`text-sm text-muted-foreground/60 ${language === 'ar' ? 'body-ar' : 'body-en'}`}>
                    {language === 'ar' 
                      ? 'مضادات حيوية ومضادات فيروسية متطورة'
                      : 'Advanced antibiotics, antivirals, and antimicrobial therapies'
                    }
                  </p>
                </div>
              </motion.div>

              {/* Respiratory */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
                className="group"
              >
                <div className="bg-background border border-foreground/10 rounded-2xl p-6 hover:shadow-xl hover:border-foreground/30 transition-all duration-300 relative overflow-hidden">
                  {/* 3D Background Icon */}
                  <div className="absolute top-2 right-2 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                    <TherapeuticArea3DIcons.respiratory.primary size="xl" color="custom" customColor="#2E2A2B" />
                  </div>
                  
                  <div className="flex items-center gap-4 mb-4 relative z-10">
                    <div className="p-3 bg-foreground/10 rounded-xl group-hover:bg-foreground/20 transition-all duration-300 group-hover:scale-110">
                      <TherapeuticArea3DIcons.respiratory.primary size="lg" color="custom" customColor="#2E2A2B" />
                    </div>
                    <div className="flex gap-2">
                      <div className="p-2 bg-secondary/5 rounded-lg group-hover:bg-secondary/10 transition-colors duration-300">
                        <TherapeuticArea3DIcons.respiratory.secondary size="sm" color="secondary" />
                      </div>
                      <div className="p-2 bg-primary/5 rounded-lg group-hover:bg-primary/10 transition-colors duration-300">
                        <TherapeuticArea3DIcons.respiratory.tertiary size="sm" color="primary" />
                      </div>
                    </div>
                  </div>
                  <h3 className={`text-lg font-semibold text-foreground mb-2 ${language === 'ar' ? 'headline-ar' : 'headline-en'}`}>
                    {language === 'ar' ? 'أمراض الجهاز التنفسي' : 'Respiratory Medicine'}
                  </h3>
                  <p className={`text-sm text-muted-foreground/60 ${language === 'ar' ? 'body-ar' : 'body-en'}`}>
                    {language === 'ar' 
                      ? 'علاجات الربو والجهاز التنفسي'
                      : 'Asthma, COPD, and respiratory disorder treatments'
                    }
                  </p>
                </div>
              </motion.div>

              {/* Pain Management */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
                className="group"
              >
                <div className="bg-background border border-primary/10 rounded-2xl p-6 hover:shadow-xl hover:border-primary/30 transition-all duration-300 relative overflow-hidden">
                  {/* 3D Background Icon */}
                  <div className="absolute top-2 right-2 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                    <TherapeuticArea3DIcons.painManagement.primary size="xl" color="primary" />
                  </div>
                  
                  <div className="flex items-center gap-4 mb-4 relative z-10">
                    <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                      <TherapeuticArea3DIcons.painManagement.primary size="lg" color="primary" />
                    </div>
                    <div className="flex gap-2">
                      <div className="p-2 bg-secondary/5 rounded-lg group-hover:bg-secondary/10 transition-colors duration-300">
                        <TherapeuticArea3DIcons.painManagement.secondary size="sm" color="secondary" />
                      </div>
                      <div className="p-2 bg-foreground/5 rounded-lg group-hover:bg-foreground/10 transition-colors duration-300">
                        <TherapeuticArea3DIcons.painManagement.tertiary size="sm" color="custom" customColor="#2E2A2B" />
                      </div>
                    </div>
                  </div>
                  <h3 className={`text-lg font-semibold text-foreground mb-2 ${language === 'ar' ? 'headline-ar' : 'headline-en'}`}>
                    {language === 'ar' ? 'إدارة الألم' : 'Pain Management'}
                  </h3>
                  <p className={`text-sm text-muted-foreground/60 ${language === 'ar' ? 'body-ar' : 'body-en'}`}>
                    {language === 'ar' 
                      ? 'مسكنات متطورة وعلاجات الألم المزمن'
                      : 'Advanced pain relief and chronic pain management solutions'
                    }
                  </p>
                </div>
              </motion.div>

              {/* Mental Health */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
                className="group"
              >
                <div className="bg-background border border-secondary/10 rounded-2xl p-6 hover:shadow-xl hover:border-secondary/30 transition-all duration-300 relative overflow-hidden">
                  {/* 3D Background Icon */}
                  <div className="absolute top-2 right-2 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                    <TherapeuticArea3DIcons.mentalHealth.primary size="xl" color="secondary" />
                  </div>
                  
                  <div className="flex items-center gap-4 mb-4 relative z-10">
                    <div className="p-3 bg-secondary/10 rounded-xl group-hover:bg-secondary/20 transition-all duration-300 group-hover:scale-110">
                      <TherapeuticArea3DIcons.mentalHealth.primary size="lg" color="secondary" />
                    </div>
                    <div className="flex gap-2">
                      <div className="p-2 bg-primary/5 rounded-lg group-hover:bg-primary/10 transition-colors duration-300">
                        <TherapeuticArea3DIcons.mentalHealth.secondary size="sm" color="primary" />
                      </div>
                      <div className="p-2 bg-foreground/5 rounded-lg group-hover:bg-foreground/10 transition-colors duration-300">
                        <TherapeuticArea3DIcons.mentalHealth.tertiary size="sm" color="custom" customColor="#2E2A2B" />
                      </div>
                    </div>
                  </div>
                  <h3 className={`text-lg font-semibold text-foreground mb-2 ${language === 'ar' ? 'headline-ar' : 'headline-en'}`}>
                    {language === 'ar' ? 'الصحة النفسية' : 'Mental Health'}
                  </h3>
                  <p className={`text-sm text-muted-foreground/60 ${language === 'ar' ? 'body-ar' : 'body-en'}`}>
                    {language === 'ar' 
                      ? 'علاجات الاكتئاب والقلق والصحة النفسية'
                      : 'Depression, anxiety, and comprehensive mental health treatments'
                    }
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

      {/* Statistics Section */}
      <section className="py-20 bg-gradient-to-br from-background to-background relative overflow-hidden">
        {/* Animated Background Elements */}
        <motion.div
          className="absolute top-10 left-10 w-20 h-20 bg-primary/10 rounded-full"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15,
            ease: "easeInOut"
          }}
          viewport={{ once: true }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-16 h-16 bg-secondary/10 rounded-full"
          animate={{
            y: [0, 20, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 12,
            ease: "easeInOut"
          }}
          viewport={{ once: true }}
        />
        
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 
              className="text-4xl font-bold text-foreground mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "backOut" }}
              viewport={{ once: true }}
            >
              Our Impact in Numbers
            </motion.h2>
            <motion.p 
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Delivering excellence across the Kingdom with measurable results
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              { icon: Users, number: "50,000+", label: "Healthcare Professionals Served", color: "text-primary", bgColor: "bg-primary/10" },
              { icon: Globe, number: "25+", label: "International Suppliers", color: "text-secondary", bgColor: "bg-secondary/10" },
              { icon: Award, number: "98%", label: "Quality Compliance Rate", color: "text-primary", bgColor: "bg-primary/10" },
              { icon: TrendingUp, number: "300%", label: "Growth in 5 Years", color: "text-secondary", bgColor: "bg-secondary/10" }
            ].map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ 
                    y: -10,
                    rotateY: 5,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  className="text-center bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 group"
                >
                  <motion.div 
                    className={`w-16 h-16 mx-auto mb-4 rounded-full ${stat.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {/* Icon Glow */}
                    <motion.div
                      className={`absolute inset-0 ${stat.color === 'text-primary' ? 'bg-primary/20' : stat.color === 'text-secondary' ? 'bg-secondary/20' : 'bg-primary/20'} rounded-2xl opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500`}
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        ease: "easeInOut"
                      }}
                      viewport={{ once: true }}
                    />
                    <IconComponent className={`h-8 w-8 ${stat.color} relative z-10`} />
                  </motion.div>
                
                  <motion.div 
                    className={`text-4xl lg:text-5xl font-black ${stat.color} mb-2 ${language === 'ar' ? 'headline-ar' : 'headline-en'} relative`}
                    initial={{ scale: 0, rotateY: 180 }}
                    whileInView={{ scale: 1, rotateY: 0 }}
                    transition={{ 
                      delay: 0.2 + index * 0.1, 
                      duration: 0.8,
                      type: "spring",
                      stiffness: 200
                    }}
                    viewport={{ once: true }}
                  >
                    {/* Number with typing effect */}
                    <motion.span
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ 
                        delay: 0.4 + index * 0.1,
                        duration: 0.5
                      }}
                      viewport={{ once: true }}
                    >
                      {stat.number}
                    </motion.span>
                    
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-background/30 to-transparent -skew-x-12"
                      animate={{
                        x: ["-100%", "100%"]
                      }}
                      transition={{
                        duration: 2,
                        ease: "easeInOut",
                        delay: 1 + index * 0.5
                      }}
                      viewport={{ once: true }}
                    />
                  </motion.div>
                
                  <motion.p 
                    className={`text-muted-foreground/70 font-medium ${language === 'ar' ? 'body-ar' : 'body-en'} relative`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: 0.6 + index * 0.1, 
                      duration: 0.6 
                    }}
                    viewport={{ once: true }}
                  >
                    {stat.label}
                  </motion.p>
                
                  {/* Hover border animation */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl border-2 border-transparent"
                    whileHover={{
                      borderColor: [
                        "transparent",
                        stat.color === 'text-primary' ? "#62c6c2" : 
                        stat.color === 'text-secondary' ? "#40296e" : "#62c6c2",
                        "transparent"
                      ]
                    }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                  />
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Supply Chain Map Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-foreground mb-6">Global Supply Chain Network</h2>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto mb-8">
              Interactive visualization of our worldwide pharmaceutical supply chain and distribution network
            </p>
          </motion.div>
        </div>
        <SupplyChainMap />
      </section>

      {/* Drug Portfolio Section */}
      <section className="py-20">
        <DrugCards />
      </section>

      {/* Advanced 3D Animations Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-foreground mb-6">Advanced Molecular Visualizations</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Explore cutting-edge 3D molecular animations showcasing drug mechanisms and pharmaceutical processes
            </p>
          </motion.div>
        </div>
        <AdvancedAnimations />
      </section>

      {/* Enhanced Statistics Section */}
      <section className="py-20 bg-muted/30 relative overflow-hidden">
        {/* Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 4 + i,
              ease: "easeInOut",
              delay: i * 0.5
            }}
            viewport={{ once: true }}
          />
        ))}
        
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "backOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={`stat-${index}`}
                variants={itemVariants}
                whileHover={{ 
                  y: -15,
                  scale: 1.05,
                  rotateY: 5,
                  transition: { 
                    type: "spring", 
                    stiffness: 300,
                    damping: 20
                  }
                }}
                className="group text-center p-8 bg-card rounded-2xl border border-primary/10 hover:border-primary/20 hover:shadow-xl transition-all duration-500 relative overflow-hidden"
              >
                {/* Glow Effect on Hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={false}
                />
                
                <motion.div 
                  className={`w-16 h-16 ${stat.color === 'text-primary' ? 'bg-primary/10' : stat.color === 'text-secondary' ? 'bg-secondary/10' : 'bg-primary/10'} rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative`}
                  whileHover={{ 
                    rotate: [0, -10, 10, 0],
                    transition: { duration: 0.6 }
                  }}
                >
                  {/* Icon Glow */}
                  <motion.div
                    className={`absolute inset-0 ${stat.color === 'text-primary' ? 'bg-primary/20' : stat.color === 'text-secondary' ? 'bg-secondary/20' : 'bg-primary/20'} rounded-2xl opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500`}
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      ease: "easeInOut"
                    }}
                    viewport={{ once: true }}
                  />
                  <stat.icon className={`h-8 w-8 ${stat.color} relative z-10`} />
                </motion.div>
                
                <motion.div 
                  className={`text-4xl lg:text-5xl font-black ${stat.color} mb-2 ${language === 'ar' ? 'headline-ar' : 'headline-en'} relative`}
                  initial={{ scale: 0, rotateY: 180 }}
                  whileInView={{ scale: 1, rotateY: 0 }}
                  transition={{ 
                    delay: 0.2 + index * 0.1, 
                    duration: 0.8,
                    type: "spring",
                    stiffness: 200
                  }}
                  viewport={{ once: true }}
                >
                  {/* Number with typing effect */}
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ 
                      delay: 0.4 + index * 0.1,
                      duration: 0.5
                    }}
                    viewport={{ once: true }}
                  >
                    {stat.value}
                  </motion.span>
                  
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-background/30 to-transparent -skew-x-12"
                    animate={{
                      x: ["-100%", "100%"]
                    }}
                    transition={{
                      duration: 2,
                      ease: "easeInOut",
                      delay: 1 + index * 0.5
                    }}
                    viewport={{ once: true }}
                  />
                </motion.div>
                
                <motion.p 
                  className={`text-muted-foreground/70 font-medium ${language === 'ar' ? 'body-ar' : 'body-en'} relative`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 0.6 + index * 0.1, 
                    duration: 0.6 
                  }}
                  viewport={{ once: true }}
                >
                  {stat.label}
                </motion.p>
                
                {/* Hover border animation */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-transparent"
                  whileHover={{
                    borderColor: [
                      "transparent",
                      stat.color === 'text-primary' ? "#62c6c2" : 
                      stat.color === 'text-secondary' ? "#40296e" : "#62c6c2",
                      "transparent"
                    ]
                  }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call-to-Action Section - Enhanced & Fixed Colors */}
      <section className="py-24 bg-primary text-background relative overflow-hidden">
        {/* Animated Background Elements */}
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(98,198,194,0.1),transparent_50%)]"
          animate={{
            background: [
              "radial-gradient(circle_at_30%_70%,rgba(98,198,194,0.1),transparent_50%)",
              "radial-gradient(circle_at_70%_30%,rgba(98,198,194,0.15),transparent_60%)",
              "radial-gradient(circle_at_30%_70%,rgba(98,198,194,0.1),transparent_50%)"
            ]
          }}
          transition={{ duration: 8, ease: "easeInOut" }}
          viewport={{ once: true }}
        />
        
        {/* Floating Geometric Shapes */}
        <motion.div
          className="absolute top-20 left-20 w-8 h-8 bg-foreground/10 rounded-full"
          animate={{
            y: [0, -40, 0],
            x: [0, 20, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 12,
            ease: "easeInOut"
          }}
          viewport={{ once: true }}
        />
        <motion.div
          className="absolute top-40 right-32 w-6 h-6 bg-primary/30 rotate-45"
          animate={{
            y: [0, 30, 0],
            rotate: [45, 225, 405],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 10,
            ease: "easeInOut"
          }}
          viewport={{ once: true }}
        />
        <motion.div
          className="absolute bottom-32 left-1/4 w-4 h-4 bg-foreground/20 rounded-full"
          animate={{
            y: [0, -25, 0],
            x: [0, -15, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{
            duration: 8,
            ease: "easeInOut",
            delay: 2
          }}
          viewport={{ once: true }}
        />
        
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 80, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, ease: "backOut" }}
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-8"
            >
              <motion.h2 
                className={`text-4xl lg:text-5xl xl:text-6xl font-bold text-background leading-tight ${language === 'ar' ? 'headline-ar' : 'headline-en'}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                {text[language].ctaTitle.split(' ').map((word, index) => (
                  <motion.span
                    key={index}
                    className="inline-block mr-2"
                    initial={{ opacity: 0, y: 30, rotateX: 90 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ 
                      delay: 0.3 + index * 0.1, 
                      duration: 0.6,
                      ease: "backOut"
                    }}
                    viewport={{ once: true }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h2>
              
              <motion.p 
                className={`text-xl lg:text-2xl text-background/90 max-w-4xl mx-auto leading-relaxed ${language === 'ar' ? 'body-ar' : 'body-en'}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                viewport={{ once: true }}
              >
                {text[language].ctaDesc}
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <motion.div
                  whileHover={{ 
                    scale: 1.05,
                    y: -5
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative group"
                >
                  {/* Button glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-background/50 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      ease: "easeInOut"
                    }}
                    viewport={{ once: true }}
                  />
                  <Button 
                    size="lg" 
                    className="bg-background hover:bg-background/90 text-primary px-10 py-5 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative z-10"
                  >
                    {text[language].ctaButton}
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ 
                        duration: 1.5, 
                        ease: "easeInOut"
                      }}
                      viewport={{ once: true }}
                    >
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </motion.div>
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={{ 
                    scale: 1.05,
                    y: -5
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative group"
                >
                  {/* Border animation */}
                  <motion.div
                    className="absolute inset-0 rounded-xl border-2 border-background/50"
                    animate={{
                      borderColor: [
                        "rgba(247,247,247,0.5)",
                        "rgba(247,247,247,0.9)",
                        "rgba(247,247,247,0.5)"
                      ]
                    }}
                    transition={{
                      duration: 2,
                      ease: "easeInOut"
                    }}
                    viewport={{ once: true }}
                  />
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-2 border-background text-primary-foreground hover:bg-background hover:text-primary px-10 py-5 text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl relative z-10 bg-transparent"
                  >
                    {text[language].ctaContact}
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  </div>
  )
}
