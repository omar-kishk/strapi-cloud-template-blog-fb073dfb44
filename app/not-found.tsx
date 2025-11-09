'use client';

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Home, Search } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function NotFound() {
  const [logoSrc, setLogoSrc] = useState('/bab-en.svg');

  // Update logo source when theme changes
  useEffect(() => {
    const updateLogo = () => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      setLogoSrc(isDarkMode ? '/logo-dark.svg' : '/bab-en.svg');
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
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-md mx-auto text-center">
        {/* BAB Pharma Logo */}
        <div className="mb-8">
          <Image
            src={logoSrc}
            alt="BAB Pharmaceutical Industries"
            width={128}
            height={40}
            className="mx-auto"
            priority
          />
        </div>

        {/* 404 Error */}
        <div className="mb-6">
          <h1 className="text-6xl font-bold text-primary mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Page Not Found
          </h2>
          <p className="text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button asChild size="lg" className="w-full">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Homepage
            </Link>
          </Button>
          
          <Button variant="outline" asChild size="lg" className="w-full">
            <Link href="/products">
              <Search className="mr-2 h-4 w-4" />
              Browse Products
            </Link>
          </Button>
        </div>

        {/* Help Text */}
        <div className="mt-8 text-sm text-muted-foreground">
          <p>
            Need help? Contact our support team at{' '}
            <a 
              href="mailto:info@babpharma.com" 
              className="text-primary hover:underline"
            >
              info@babpharma.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
} 