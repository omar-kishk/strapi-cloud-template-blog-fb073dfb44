'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Building,
  Users,
  Phone,
  Calendar,
  Heart,
  Shield,
  Microscope,
  Truck,
  Globe,
  Award,
  GraduationCap,
  FileText,
  ChevronRight,
  Download,
  Briefcase
} from 'lucide-react';

interface SitemapProps {
  language?: 'en' | 'ar';
  showTitle?: boolean;
  className?: string;
}

const Sitemap: React.FC<SitemapProps> = ({ 
  language = 'en', 
  showTitle = true,
  className = '' 
}) => {

  const text = {
    en: {
      title: 'Website Map',
      subtitle: 'Complete navigation structure of BAB Pharmaceutical Industries website',
      mainPages: 'Main Pages',
      products: 'Products & Services',
      company: 'Company Information',
      resources: 'Resources & Support',
      legal: 'Legal & Compliance',
      external: 'External Links'
    },
    ar: {
      title: 'خريطة الموقع',
      subtitle: 'هيكل التنقل الكامل لموقع شركة بيت البطرجي للصناعات الدوائية',
      mainPages: 'الصفحات الرئيسية',
      products: 'المنتجات والخدمات',
      company: 'معلومات الشركة',
      resources: 'الموارد والدعم',
      legal: 'القانونية والامتثال',
      external: 'روابط خارجية'
    }
  };

  const sitemapStructure = {
    mainPages: [
      {
        name: language === 'ar' ? 'الرئيسية' : 'Home',
        href: '/',
        icon: Building,
        description: language === 'ar' ? 'الصفحة الرئيسية' : 'Homepage with company overview'
      },
      {
        name: language === 'ar' ? 'من نحن' : 'About Us',
        href: '/about',
        icon: Users,
        description: language === 'ar' ? 'تاريخ الشركة ورؤيتها' : 'Company history, vision, and mission',
        subPages: [
          { name: language === 'ar' ? 'تاريخنا' : 'Our History', href: '/about/history' },
          { name: language === 'ar' ? 'الإدارة' : 'Leadership Team', href: '/about/leadership' },
          { name: language === 'ar' ? 'القيم' : 'Our Values', href: '/about/values' },
          { name: language === 'ar' ? 'المسؤولية الاجتماعية' : 'Corporate Responsibility', href: '/about/responsibility' }
        ]
      },
      {
        name: language === 'ar' ? 'اتصل بنا' : 'Contact',
        href: '/contact',
        icon: Phone,
        description: language === 'ar' ? 'معلومات الاتصال والمواقع' : 'Contact information and locations',
        subPages: [
          { name: language === 'ar' ? 'المكاتب' : 'Office Locations', href: '/contact/locations' },
          { name: language === 'ar' ? 'دعم العملاء' : 'Customer Support', href: '/contact/support' },
          { name: language === 'ar' ? 'الطوارئ' : 'Emergency Contacts', href: '/contact/emergency' }
        ]
      },
      {
        name: language === 'ar' ? 'الأخبار' : 'News & Updates',
        href: '/news',
        icon: Calendar,
        description: language === 'ar' ? 'آخر الأخبار والإعلانات' : 'Latest news and announcements',
        subPages: [
          { name: language === 'ar' ? 'البيانات الصحفية' : 'Press Releases', href: '/news/press' },
          { name: language === 'ar' ? 'الأحداث' : 'Events', href: '/news/events' },
          { name: language === 'ar' ? 'النشرة الإخبارية' : 'Newsletter Archive', href: '/news/newsletter' }
        ]
      }
    ],
    
    products: [
      {
        name: language === 'ar' ? 'الأدوية الجنيسة الجديدة' : 'Novel Generics',
        href: '/products/generics',
        icon: Heart,
        description: language === 'ar' ? 'أدوية جنيسة مبتكرة' : 'Innovative generic pharmaceuticals',
        subPages: [
          { name: language === 'ar' ? 'أمراض القلب' : 'Cardiovascular', href: '/products/generics/cardiovascular' },
          { name: language === 'ar' ? 'السكري' : 'Diabetes', href: '/products/generics/diabetes' },
          { name: language === 'ar' ? 'الأعصاب' : 'Neurology', href: '/products/generics/neurology' },
          { name: language === 'ar' ? 'الأورام' : 'Oncology', href: '/products/generics/oncology' }
        ]
      },
      {
        name: language === 'ar' ? 'الأجهزة الطبية' : 'Medical Devices',
        href: '/products/devices',
        icon: Shield,
        description: language === 'ar' ? 'أجهزة طبية متطورة' : 'Advanced medical devices and equipment',
        subPages: [
          { name: language === 'ar' ? 'أجهزة التشخيص' : 'Diagnostic Equipment', href: '/products/devices/diagnostic' },
          { name: language === 'ar' ? 'الأجهزة الجراحية' : 'Surgical Instruments', href: '/products/devices/surgical' },
          { name: language === 'ar' ? 'أجهزة المراقبة' : 'Monitoring Devices', href: '/products/devices/monitoring' }
        ]
      },
      {
        name: language === 'ar' ? 'المكملات الغذائية' : 'Nutraceuticals',
        href: '/products/nutraceuticals',
        icon: Microscope,
        description: language === 'ar' ? 'مكملات غذائية عالية الجودة' : 'High-quality nutritional supplements',
        subPages: [
          { name: language === 'ar' ? 'الفيتامينات' : 'Vitamins', href: '/products/nutraceuticals/vitamins' },
          { name: language === 'ar' ? 'المعادن' : 'Minerals', href: '/products/nutraceuticals/minerals' },
          { name: language === 'ar' ? 'المكملات العشبية' : 'Herbal Supplements', href: '/products/nutraceuticals/herbal' }
        ]
      },
      {
        name: language === 'ar' ? 'الاستيراد والتوزيع' : 'Import & Distribution',
        href: '/import-distribution',
        icon: Truck,
        description: language === 'ar' ? 'خدمات الاستيراد والتوزيع' : 'Global import and distribution services',
        subPages: [
          { name: language === 'ar' ? 'الموردون' : 'Suppliers', href: '/import-distribution/suppliers' },
          { name: language === 'ar' ? 'اللوجستيات' : 'Logistics', href: '/import-distribution/logistics' },
          { name: language === 'ar' ? 'مراقبة الجودة' : 'Quality Control', href: '/import-distribution/quality' }
        ]
      }
    ],
    
    company: [
      {
        name: language === 'ar' ? 'البحث والتطوير' : 'Research & Development',
        href: '/research',
        icon: Microscope,
        description: language === 'ar' ? 'مشاريع البحث والابتكار' : 'Research projects and innovation',
        subPages: [
          { name: language === 'ar' ? 'المختبرات' : 'Laboratories', href: '/research/labs' },
          { name: language === 'ar' ? 'التجارب السريرية' : 'Clinical Trials', href: '/research/clinical-trials' },
          { name: language === 'ar' ? 'براءات الاختراع' : 'Patents', href: '/research/patents' }
        ]
      },
      {
        name: language === 'ar' ? 'الشراكات' : 'Partnerships',
        href: '/partnerships',
        icon: Globe,
        description: language === 'ar' ? 'شراكاتنا المحلية والدولية' : 'Local and international partnerships',
        subPages: [
          { name: language === 'ar' ? 'شركاء دوليون' : 'International Partners', href: '/partnerships/international' },
          { name: language === 'ar' ? 'شركاء محليون' : 'Local Partners', href: '/partnerships/local' },
          { name: language === 'ar' ? 'فرص الشراكة' : 'Partnership Opportunities', href: '/partnerships/opportunities' }
        ]
      },
      {
        name: language === 'ar' ? 'الوظائف' : 'Careers',
        href: '/careers',
        icon: Briefcase,
        description: language === 'ar' ? 'الفرص الوظيفية' : 'Career opportunities and job openings',
        subPages: [
          { name: language === 'ar' ? 'الوظائف المتاحة' : 'Open Positions', href: '/careers/openings' },
          { name: language === 'ar' ? 'ثقافة العمل' : 'Work Culture', href: '/careers/culture' },
          { name: language === 'ar' ? 'المزايا' : 'Benefits', href: '/careers/benefits' }
        ]
      },
      {
        name: language === 'ar' ? 'المستثمرون' : 'Investors',
        href: '/investors',
        icon: Award,
        description: language === 'ar' ? 'معلومات للمستثمرين' : 'Investor information and reports',
        subPages: [
          { name: language === 'ar' ? 'التقارير السنوية' : 'Annual Reports', href: '/investors/reports' },
          { name: language === 'ar' ? 'البيانات المالية' : 'Financial Statements', href: '/investors/financials' },
          { name: language === 'ar' ? 'أخبار المستثمرين' : 'Investor News', href: '/investors/news' }
        ]
      }
    ],
    
    resources: [
      {
        name: language === 'ar' ? 'مركز المساعدة' : 'Help Center',
        href: '/help',
        icon: Heart,
        description: language === 'ar' ? 'الدعم والمساعدة' : 'Support and assistance',
        subPages: [
          { name: language === 'ar' ? 'الأسئلة الشائعة' : 'FAQ', href: '/help/faq' },
          { name: language === 'ar' ? 'أدلة المنتجات' : 'Product Guides', href: '/help/guides' },
          { name: language === 'ar' ? 'الدعم الفني' : 'Technical Support', href: '/help/technical' }
        ]
      },
      {
        name: language === 'ar' ? 'ضمان الجودة' : 'Quality Assurance',
        href: '/quality',
        icon: Award,
        description: language === 'ar' ? 'معايير الجودة والشهادات' : 'Quality standards and certifications',
        subPages: [
          { name: language === 'ar' ? 'الشهادات' : 'Certifications', href: '/quality/certifications' },
          { name: language === 'ar' ? 'معايير الجودة' : 'Quality Standards', href: '/quality/standards' },
          { name: language === 'ar' ? 'اختبار الجودة' : 'Quality Testing', href: '/quality/testing' }
        ]
      },
      {
        name: language === 'ar' ? 'التدريب' : 'Training',
        href: '/training',
        icon: GraduationCap,
        description: language === 'ar' ? 'برامج التدريب والتعليم' : 'Training programs and education',
        subPages: [
          { name: language === 'ar' ? 'برامج المهنيين' : 'Professional Programs', href: '/training/professional' },
          { name: language === 'ar' ? 'ورش العمل' : 'Workshops', href: '/training/workshops' },
          { name: language === 'ar' ? 'الشهادات' : 'Certifications', href: '/training/certifications' }
        ]
      },
      {
        name: language === 'ar' ? 'التحميلات' : 'Downloads',
        href: '/downloads',
        icon: Download,
        description: language === 'ar' ? 'ملفات ووثائق للتحميل' : 'Downloadable files and documents',
        subPages: [
          { name: language === 'ar' ? 'كتالوج المنتجات' : 'Product Catalogs', href: '/downloads/catalogs' },
          { name: language === 'ar' ? 'المواصفات الفنية' : 'Technical Specifications', href: '/downloads/specs' },
          { name: language === 'ar' ? 'النماذج' : 'Forms', href: '/downloads/forms' }
        ]
      }
    ],
    
    legal: [
      {
        name: language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy',
        href: '/privacy',
        icon: Shield,
        description: language === 'ar' ? 'سياسة حماية البيانات' : 'Data protection and privacy policy'
      },
      {
        name: language === 'ar' ? 'شروط الخدمة' : 'Terms of Service',
        href: '/terms',
        icon: FileText,
        description: language === 'ar' ? 'الشروط والأحكام' : 'Terms and conditions of use'
      },
      {
        name: language === 'ar' ? 'الامتثال التنظيمي' : 'Regulatory Compliance',
        href: '/compliance',
        icon: Award,
        description: language === 'ar' ? 'معلومات الامتثال التنظيمي' : 'Regulatory compliance information'
      },
      {
        name: language === 'ar' ? 'سياسة الجودة' : 'Quality Policy',
        href: '/quality-policy',
        icon: Shield,
        description: language === 'ar' ? 'سياسة ضمان الجودة' : 'Quality assurance policy'
      }
    ]
  };

  const SectionComponent = ({ 
    title, 
    items
  }: { 
    title: string; 
    items: Array<{
      name: string;
      href: string;
      icon: React.ComponentType<{ className?: string }>;
      description: string;
      subPages?: Array<{ name: string; href: string }>;
    }>; 
  }) => (
    <div className="space-y-4">
      <h3 className={`text-xl font-bold text-foreground border-b border-border pb-2 ${language === 'ar' ? 'headline-ar' : 'headline-en'}`}>
        {title}
      </h3>
      <div className="grid gap-4">
        {items.map((item, index) => (
          <div key={index} className="bg-card rounded-lg p-4 border border-border hover:border-primary/30 transition-colors group">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <Link 
                    href={item.href}
                    className={`font-semibold text-foreground hover:text-primary transition-colors flex items-center gap-1 group ${language === 'ar' ? 'headline-ar' : 'headline-en'}`}
                  >
                    {item.name}
                    <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </div>
                <p className={`text-sm text-muted-foreground ${language === 'ar' ? 'body-ar' : 'body-en'}`}>
                  {item.description}
                </p>
                {item.subPages && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 pt-3 border-t border-border/50">
                    {item.subPages.map((subPage: { name: string; href: string }, subIndex: number) => (
                      <Link
                        key={subIndex}
                        href={subPage.href}
                        className={`text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group ${language === 'ar' ? 'body-ar' : 'body-en'}`}
                      >
                        <ChevronRight className="h-3 w-3" />
                        {subPage.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={`${className}`}>
      {showTitle && (
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-bold text-foreground mb-4 ${language === 'ar' ? 'headline-ar' : 'headline-en'}`}>
            {text[language].title}
          </h2>
          <p className={`text-lg text-muted-foreground max-w-3xl mx-auto ${language === 'ar' ? 'body-ar' : 'body-en'}`}>
            {text[language].subtitle}
          </p>
        </div>
      )}

      <div className="space-y-12">
        <SectionComponent 
          title={text[language].mainPages}
          items={sitemapStructure.mainPages}
        />
        
        <SectionComponent 
          title={text[language].products}
          items={sitemapStructure.products}
        />
        
        <SectionComponent 
          title={text[language].company}
          items={sitemapStructure.company}
        />
        
        <SectionComponent 
          title={text[language].resources}
          items={sitemapStructure.resources}
        />
        
        <SectionComponent 
          title={text[language].legal}
          items={sitemapStructure.legal}
        />
      </div>
    </div>
  );
};

export default Sitemap; 