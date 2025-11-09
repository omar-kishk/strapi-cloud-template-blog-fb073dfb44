'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Award,
  Shield,
  FileText,
  Truck,
  Microscope,
  Heart,
  Users,
  Building,
  Clock,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Footer = () => {
  const [language] = useState<'en' | 'ar'>('en');
  const [logoSrc, setLogoSrc] = useState('/bab-en.svg');

  // Update logo source when theme changes
  useEffect(() => {
    const updateLogo = () => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      setLogoSrc(isDarkMode ? '/logo-dark.svg' : (language === 'ar' ? '/bab-ar.svg' : '/bab-en.svg'));
    };

    updateLogo();

    const observer = new MutationObserver(updateLogo);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, [language]);

  const text = {
    en: {
      newsletterTitle: 'Stay Updated',
      newsletterDesc: 'Get the latest pharmaceutical news and product updates',
      emailPlaceholder: 'Enter your email',
      subscribe: 'Subscribe',
      quickLinks: 'Quick Links',
      products: 'Products & Services',
      company: 'Company',
      support: 'Support & Resources',
      legal: 'Legal & Compliance',
      followUs: 'Follow Us',
      address: 'Riyadh, Kingdom of Saudi Arabia',
      phone: '+966 11 XXX XXXX',
      email: 'info@babpharma.com',
      emergency: '24/7 Emergency Line',
      emergencyPhone: '+966 11 XXX XXXX',
      copyright: '© 2024 BAB Pharmaceutical Industries. All rights reserved.',
      certifications: 'Certifications & Compliance',
      businessHours: 'Business Hours: Sunday - Thursday, 8:00 AM - 6:00 PM',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
      quality: 'Quality Assurance',
      careers: 'Careers',
      social: 'Follow Us',
    },
    ar: {
      newsletterTitle: 'ابق على اطلاع',
      newsletterDesc: 'احصل على آخر الأخبار الدوائية وتحديثات المنتجات',
      emailPlaceholder: 'أدخل بريدك الإلكتروني',
      subscribe: 'اشترك',
      quickLinks: 'روابط سريعة',
      products: 'المنتجات والخدمات',
      company: 'الشركة',
      support: 'الدعم والموارد',
      legal: 'القانونية والامتثال',
      followUs: 'تابعنا',
      address: 'الرياض، المملكة العربية السعودية',
      phone: '+966 11 XXX XXXX',
      email: 'info@babpharma.com',
      emergency: 'خط الطوارئ على مدار الساعة',
      emergencyPhone: '+966 11 XXX XXXX',
      copyright: '© 2024 شركة بيت البطرجي للصناعات الدوائية. جميع الحقوق محفوظة.',
      certifications: 'الشهادات والامتثال',
      businessHours: 'ساعات العمل: الأحد - الخميس، 8:00 ص - 6:00 م',
      privacyPolicy: 'سياسة الخصوصية',
      termsOfService: 'شروط الخدمة',
      quality: 'ضمان الجودة',
      careers: 'الوظائف',
      social: 'تابعنا',
    }
  };

  const footerSections = {
    quickLinks: [
      { name: language === 'ar' ? 'الرئيسية' : 'Home', href: '/', icon: Building },
      { name: language === 'ar' ? 'من نحن' : 'About Us', href: '/about', icon: Users },
      { name: language === 'ar' ? 'اتصل بنا' : 'Contact', href: '/contact', icon: Phone },
      { name: language === 'ar' ? 'الأخبار' : 'News', href: '/news', icon: FileText },
    ],
    products: [
      { name: language === 'ar' ? 'الأدوية الجنيسة' : 'Novel Generics', href: '/products/generics', icon: Heart },
      { name: language === 'ar' ? 'الأجهزة الطبية' : 'Medical Devices', href: '/products/devices', icon: Shield },
      { name: language === 'ar' ? 'المكملات الغذائية' : 'Nutraceuticals', href: '/products/nutraceuticals', icon: Microscope },
      { name: language === 'ar' ? 'الاستيراد والتوزيع' : 'Import & Distribution', href: '/import-distribution', icon: Truck },
    ],
    company: [
      { name: language === 'ar' ? 'البحث والتطوير' : 'Research & Development', href: '/research', icon: Microscope },
      { name: text[language].careers, href: '/careers', icon: Users },
      { name: language === 'ar' ? 'الشراكات' : 'Partnerships', href: '/partnerships', icon: Globe },
      { name: language === 'ar' ? 'المستثمرون' : 'Investors', href: '/investors', icon: Award },
    ],
    support: [
      { name: language === 'ar' ? 'مركز المساعدة' : 'Help Center', href: '/help', icon: Heart },
      { name: text[language].quality, href: '/quality', icon: Award },
      { name: language === 'ar' ? 'التدريب' : 'Training', href: '/training', icon: FileText },
      { name: language === 'ar' ? 'التحميلات' : 'Downloads', href: '/downloads', icon: FileText },
    ],
    legal: [
      { name: text[language].privacyPolicy, href: '/privacy', icon: Shield },
      { name: text[language].termsOfService, href: '/terms', icon: FileText },
      { name: language === 'ar' ? 'الامتثال التنظيمي' : 'Regulatory Compliance', href: '/compliance', icon: Award },
      { name: language === 'ar' ? 'سياسة الجودة' : 'Quality Policy', href: '/quality-policy', icon: Shield },
    ]
  };

  const certifications = [
    { name: 'Saudi FDA', icon: Award },
    { name: 'ISO 9001:2015', icon: Shield },
    { name: 'ISO 13485:2016', icon: Shield },
    { name: 'GMP Certified', icon: Award },
    { name: 'NUPCO Partner', icon: Globe },
  ];

  const socialLinks = [
    { name: 'LinkedIn', href: '#', icon: ExternalLink },
    { name: 'Twitter', href: '#', icon: ExternalLink },
    { name: 'YouTube', href: '#', icon: ExternalLink },
    { name: 'Instagram', href: '#', icon: ExternalLink },
  ];

  return (
    <footer className="bg-background text-foreground border-t border-border">
      {/* Newsletter Section */}
      <div className="border-b border-border/20">
        <div className="container mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="text-2xl font-bold text-foreground mb-4">Stay Updated</h3>
            <p className="text-muted-foreground mb-8">
              Get the latest pharmaceutical news and product updates
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-card border-border text-foreground placeholder:text-muted-foreground focus:border-primary px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
          
          {/* Company Info & Logo */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <Image
                src={logoSrc}
                alt="BAB Pharmaceutical Industries"
                width={160}
                height={48}
                className="mb-6"
              />
              <p className={`text-muted-foreground leading-relaxed mb-6 ${language === 'ar' ? 'body-ar' : 'body-en'}`}>
                {language === 'ar' 
                  ? 'شركة بيت البطرجي للصناعات الدوائية - رائدة في مجال الاستيراد والتوزيع والتصنيع الدوائي في المملكة العربية السعودية منذ 1979.'
                  : 'BAB Pharmaceutical Industries - Leading pharmaceutical import, distribution, and manufacturing excellence in Saudi Arabia since 1979.'
                }
              </p>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className={`text-foreground ${language === 'ar' ? 'body-ar' : 'body-en'}`}>
                    {text[language].address}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <p className={`text-foreground ${language === 'ar' ? 'body-ar' : 'body-en'}`}>
                  {text[language].phone}
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <a 
                  href={`mailto:${text[language].email}`}
                  className={`text-foreground hover:text-primary transition-colors ${language === 'ar' ? 'body-ar' : 'body-en'}`}
                >
                  {text[language].email}
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                <p className={`text-muted-foreground text-sm ${language === 'ar' ? 'body-ar' : 'body-en'}`}>
                  {text[language].businessHours}
                </p>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
              <div className="flex items-center gap-3 mb-2">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <h4 className={`font-semibold text-foreground ${language === 'ar' ? 'headline-ar' : 'headline-en'}`}>
                  {text[language].emergency}
                </h4>
              </div>
              <p className={`text-foreground font-medium ${language === 'ar' ? 'body-ar' : 'body-en'}`}>
                {text[language].emergencyPhone}
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`font-bold text-foreground mb-6 text-lg ${language === 'ar' ? 'headline-ar' : 'headline-en'}`}>
              {text[language].quickLinks}
            </h4>
            <ul className="space-y-3">
              {footerSections.quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className={`flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group ${language === 'ar' ? 'body-ar' : 'body-en'}`}
                  >
                    <link.icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    <span>{link.name}</span>
                    <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products & Services */}
          <div>
            <h4 className={`font-bold text-foreground mb-6 text-lg ${language === 'ar' ? 'headline-ar' : 'headline-en'}`}>
              {text[language].products}
            </h4>
            <ul className="space-y-3">
              {footerSections.products.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className={`flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group ${language === 'ar' ? 'body-ar' : 'body-en'}`}
                  >
                    <link.icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    <span>{link.name}</span>
                    <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className={`font-bold text-foreground mb-6 text-lg ${language === 'ar' ? 'headline-ar' : 'headline-en'}`}>
              {text[language].company}
            </h4>
            <ul className="space-y-3">
              {footerSections.company.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className={`flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group ${language === 'ar' ? 'body-ar' : 'body-en'}`}
                  >
                    <link.icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    <span>{link.name}</span>
                    <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div className="mt-8">
              <h5 className={`font-semibold text-foreground mb-4 ${language === 'ar' ? 'headline-ar' : 'headline-en'}`}>
                {text[language].social}
              </h5>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-300 group"
                    aria-label={social.name}
                  >
                    <social.icon className="h-4 w-4 text-foreground group-hover:text-primary-foreground" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Support & Legal */}
          <div>
            <h4 className={`font-bold text-foreground mb-6 text-lg ${language === 'ar' ? 'headline-ar' : 'headline-en'}`}>
              {text[language].support}
            </h4>
            <ul className="space-y-3 mb-8">
              {footerSections.support.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className={`flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group ${language === 'ar' ? 'body-ar' : 'body-en'}`}
                  >
                    <link.icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    <span>{link.name}</span>
                    <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className={`font-bold text-foreground mb-6 text-lg ${language === 'ar' ? 'headline-ar' : 'headline-en'}`}>
              {text[language].legal}
            </h4>
            <ul className="space-y-3">
              {footerSections.legal.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className={`flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group ${language === 'ar' ? 'body-ar' : 'body-en'}`}
                  >
                    <link.icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    <span>{link.name}</span>
                    <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Certifications Banner */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center mb-6">
            <h4 className={`font-bold text-foreground mb-4 ${language === 'ar' ? 'headline-ar' : 'headline-en'}`}>
              {text[language].certifications}
            </h4>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <cert.icon className="h-5 w-5" />
                <span className={`text-sm font-medium ${language === 'ar' ? 'body-ar' : 'body-en'}`}>
                  {cert.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className={`text-muted-foreground text-sm ${language === 'ar' ? 'body-ar' : 'body-en'}`}>
              {text[language].copyright}
            </p>
            <div className="flex gap-6">
              <Link 
                href="/privacy" 
                className={`text-muted-foreground hover:text-primary text-sm transition-colors ${language === 'ar' ? 'body-ar' : 'body-en'}`}
              >
                {text[language].privacyPolicy}
              </Link>
              <Link 
                href="/terms" 
                className={`text-muted-foreground hover:text-primary text-sm transition-colors ${language === 'ar' ? 'body-ar' : 'body-en'}`}
              >
                {text[language].termsOfService}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
