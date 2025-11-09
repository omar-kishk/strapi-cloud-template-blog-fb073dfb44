'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Search, 
  Menu, 
  X, 
  Globe, 
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ModeToggle } from '@/components/ui/theme-toggle';

// Sample pharmaceutical search suggestions
const searchSuggestions = {
  en: [
    'Cardiovascular medications',
    'Diabetes treatment',
    'Pain management',
    'Antibiotics',
    'Blood pressure medication',
    'Cholesterol medication',
    'Respiratory drugs',
    'Neurological treatments'
  ],
  ar: [
    'أدوية القلب والأوعية الدموية',
    'علاج السكري',
    'إدارة الألم',
    'المضادات الحيوية',
    'أدوية ضغط الدم',
    'أدوية الكولسترول',
    'أدوية الجهاز التنفسي',
    'العلاجات العصبية'
  ]
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const [logoError, setLogoError] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      setShowSuggestions(false);
      // Here you would typically navigate to search results page
      // router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSearchInputChange = (value: string) => {
    setSearchQuery(value);
    
    if (value.trim()) {
      const suggestions = searchSuggestions[language];
      const filtered = suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    // Trigger search with the selected suggestion
    console.log('Searching for suggestion:', suggestion);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navigation = [
    { name: language === 'ar' ? 'الرئيسية' : 'Home', href: '/' },
    { name: language === 'ar' ? 'المنتجات' : 'Products', href: '/products' },
    { name: language === 'ar' ? 'الاستيراد والتوزيع' : 'Import & Distribution', href: '/import-distribution' },
    { name: language === 'ar' ? 'البحث والتطوير' : 'Research & Development', href: '/research' },
    { name: language === 'ar' ? 'من نحن' : 'About Us', href: '/about' },
    { name: language === 'ar' ? 'اتصل بنا' : 'Contact', href: '/contact' },
  ];

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsMenuOpen(false);
    };

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isMenuOpen]);

  // Update logo source when language changes or theme changes
  useEffect(() => {
    const getLogo = () => {
      // Check if we're in dark mode by looking at the document class
      const isDarkMode = document.documentElement.classList.contains('dark');
      
      if (isDarkMode) {
        // Use dark mode logo (logo-dark.svg) for both languages in dark mode
        return '/logo-dark.svg';
      } else {
        // Use language-specific logos for light mode
        return language === 'ar' ? '/bab-ar.svg' : '/bab-en.svg';
      }
    };

    const updateLogo = () => {
      setLogoSrc(getLogo());
    };

    // Update logo immediately
    updateLogo();

    // Listen for theme changes
    const observer = new MutationObserver(updateLogo);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, [language]);

  const [logoSrc, setLogoSrc] = useState(() => {
    // Initial logo source - will be updated when component mounts
    return language === 'ar' ? '/bab-ar.svg' : '/bab-en.svg';
  });

  const handleLogoError = () => {
    setLogoError(true);
  };

  const handleLogoLoad = () => {
    setLogoError(false);
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  return (
    <header className="bg-background/80 backdrop-blur-md border-b sticky top-0 z-50">
      {/* Main Header - Professional Height */}
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Logo - Enhanced Design with Debug Features */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <div className="relative w-[160px] h-12 transition-transform duration-300 group-hover:scale-105">
                {/* Subtle glow effect on hover - positioned behind with proper z-index */}
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-10 bg-gradient-to-r from-primary to-secondary transition-opacity duration-300 blur-sm z-0"></div>
                
                {/* Logo Image - positioned in front with higher z-index */}
                <div className="relative z-10 w-full h-full flex items-center">
                  {!logoError ? (
                    <Image
                      src={logoSrc}
                      alt={language === 'ar' ? 'صناعات باب الصيدلانية' : 'BAB Pharmaceutical Industries'}
                      width={160}
                      height={45}
                      className="object-contain transition-all duration-300"
                      onError={handleLogoError}
                      onLoad={handleLogoLoad}
                      priority
                    />
                  ) : (
                    // Fallback text when logo fails to load
                    <div className="w-full h-full flex items-center justify-center px-3 bg-primary text-primary-foreground rounded font-headline text-sm lg:text-base">
                      BAB Pharma
                    </div>
                  )}
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden lg:flex items-center space-x-6 flex-1 justify-center px-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-primary/5 whitespace-nowrap ${language === 'ar' ? 'body-ar' : 'body-en'}`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Section - Search, Language, Partner Button */}
          <div className="flex items-center space-x-2 md:space-x-4">
            
            {/* Enhanced Search Bar - Desktop Only */}
            <div className="hidden lg:flex items-center">
              <div ref={searchRef} className="relative">
                <form onSubmit={handleSearch} className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder={language === 'ar' ? 'البحث...' : 'Search...'}
                      value={searchQuery}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearchInputChange(e.target.value)}
                      onFocus={() => {
                        if (searchQuery.trim()) {
                          setShowSuggestions(true);
                        }
                      }}
                      className="w-64 pl-10 pr-4 py-2.5 text-sm bg-background/90 focus:border-primary focus:ring-2 focus:ring-ring/20 rounded-lg placeholder:text-muted-foreground shadow-sm transition-all duration-300 hover:shadow-md focus:shadow-lg"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => {
                          setSearchQuery('');
                          setShowSuggestions(false);
                        }}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <Button
                    type="submit"
                    size="sm"
                  >
                    {language === 'ar' ? 'بحث' : 'Search'}
                  </Button>
                </form>
                
                {/* Search Suggestions Dropdown */}
                {showSuggestions && filteredSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-popover border rounded-xl shadow-lg z-50 max-h-64 overflow-y-auto">
                    <div className="p-2">
                      <p className={`text-xs text-muted-foreground px-3 py-2 ${language === 'ar' ? 'body-ar' : 'body-en'}`}>
                        {language === 'ar' ? 'اقتراحات:' : 'Suggestions:'}
                      </p>
                      {filteredSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className={`w-full text-left px-3 py-2 text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors duration-200 flex items-center space-x-2 ${language === 'ar' ? 'body-ar' : 'body-en'}`}
                        >
                          <Search className="h-3 w-3 text-muted-foreground" />
                          <span>{suggestion}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Language Switcher */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="flex items-center space-x-1"
              >
                <Globe className="h-4 w-4" />
                <span className="text-sm font-medium">{language === 'ar' ? 'العربية' : 'English'}</span>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </div>
            
            {/* Theme Toggle */}
            <ModeToggle />

            {/* Partner With Us Button - Fixed Colors */}
            <Button
              size="sm"
              variant="secondary"
              className="hidden md:inline-flex"
            >
              {language === 'ar' ? 'شارك معنا' : 'Partner With Us'}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-foreground hover:bg-accent"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-background border-t">
          <div className="container mx-auto px-6 py-4">
            
            {/* Enhanced Mobile Search */}
            <div className="mb-4">
              <form onSubmit={handleSearch} className="flex space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder={language === 'ar' ? 'البحث...' : 'Search...'}
                    value={searchQuery}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearchInputChange(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 text-sm bg-background/90"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <Button
                  type="submit"
                  size="sm"
                >
                  {language === 'ar' ? 'بحث' : 'Search'}
                </Button>
              </form>
            </div>

            {/* Mobile Navigation */}
            <nav className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block text-sm font-medium text-foreground hover:text-primary hover:bg-accent rounded-lg px-3 py-2 ${language === 'ar' ? 'body-ar' : 'body-en'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Mobile Partner Button */}
            <div className="mt-4 pt-4 border-t">
              <Button
                size="sm"
                variant="secondary"
                className="w-full"
              >
                {language === 'ar' ? 'شارك معنا' : 'Partner With Us'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
} 