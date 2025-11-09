import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Official BAB Pharma Brand Colors (From Brand Guidelines)
        'bab-purple': {
          DEFAULT: '#40296e', // Hero Purple - Primary brand color (Pantone P 97-8 U)
          50: '#faf9fc',  // 20% tint
          100: '#f3f0f7', // 40% tint  
          200: '#e8e2ef', // 60% tint
          300: '#d5c9e1', // 80% tint
          400: '#bea8cf', // Lighter purple for better contrast
          500: '#a386bb', // Mid-tone purple
          600: '#8a69a4', // Brighter for dark mode text
          700: '#7056a0', // Enhanced contrast purple
          800: '#5c446e', // Slightly brighter than original
          900: '#40296e', // Official Brand Primary
          950: '#2a1a48', // Darkest shade
        },
        'bab-turquoise': {
          DEFAULT: '#62c6c2', // Medium Turquoise - Secondary brand color (Pantone P 121-13 U)
          50: '#f0fdfc',  // 20% tint
          100: '#ccfbf7', // 40% tint
          200: '#99f6f0', // 60% tint
          300: '#5eede7', // 80% tint
          400: '#2dd4cd', // Bright turquoise
          500: '#14b8b3', // Enhanced mid-tone
          600: '#0d9b97', // Darker turquoise
          700: '#0f7b78', // Deep turquoise
          800: '#62c6c2', // Official Brand Secondary
          900: '#164e4d', // Dark turquoise
          950: '#042f2e', // Darkest shade
        },
        'bab-charcoal': {
          DEFAULT: '#2E2A2B', // Professional charcoal (Pantone P 179-16 C)
          50: '#f6f6f6',  // 20% tint
          100: '#e7e7e7', // 40% tint
          200: '#d1d1d1', // 60% tint
          300: '#b0b0b0', // 80% tint
          400: '#888888', // Light charcoal
          500: '#6d6d6d', // Mid charcoal
          600: '#5d5d5d', // Medium charcoal
          700: '#4f4f4f', // Dark charcoal
          800: '#454545', // Darker charcoal
          900: '#2E2A2B', // Official Brand Charcoal
          950: '#1a1718', // Darkest charcoal for dark mode
        },
        'bab-whisper': {
          DEFAULT: '#F7F7F7', // Clean background (Pantone P 1-1 C)
          50: '#ffffff',  // Pure white
          100: '#F9F9F9', // Enhanced whisper for better contrast
          200: '#f0f0f0', // 40% tint
          300: '#e8e8e8', // 60% tint
          400: '#d1d1d1', // 80% tint
          500: '#b4b4b4', // Mid-tone
          600: '#9a9a9a', // Medium gray
          700: '#818181', // Dark gray
          800: '#6a6a6a', // Darker gray
          900: '#5a5a5a', // Dark whisper
          950: '#3a3a3a', // Darkest for contrast
        },
        // Pharmaceutical-specific colors for trust and medical precision
        'pharma-green': {
          DEFAULT: '#10b981',
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        'pharma-red': {
          DEFAULT: '#ef4444',
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        'pharma-blue': {
          DEFAULT: '#3b82f6',
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        // Shadcn/UI theme colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        // Official BAB Pharma Typography Standards
        // English Typography
        'headline': ['Lora', 'serif'], // Headlines (Lora Regular)
        'body': ['QuickSand', 'var(--font-quicksand)', 'sans-serif'], // Body text (QuickSand Regular/Light/Bold)
        
        // Arabic Typography
        'headline-ar': ['Bukra', 'sans-serif'], // Arabic headlines (Bukra Bold)
        'body-ar': ['Somar', 'sans-serif'], // Arabic body text (Somar Regular/Thin/Bold)
        
        // Fallback fonts for development
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'Courier New', 'monospace'],
      },
      fontSize: {
        // Pharmaceutical typography scale for precision and readability
        'pharma-xs': ['0.75rem', { lineHeight: '1rem' }],
        'pharma-sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'pharma-base': ['1rem', { lineHeight: '1.5rem' }],
        'pharma-lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'pharma-xl': ['1.25rem', { lineHeight: '1.75rem' }],
        'pharma-2xl': ['1.5rem', { lineHeight: '2rem' }],
        'pharma-3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        'pharma-4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        'pharma-5xl': ['3rem', { lineHeight: '1' }],
        'pharma-6xl': ['3.75rem', { lineHeight: '1' }],
      },
      spacing: {
        // Pharmaceutical spacing system for professional layouts
        'pharma-xs': '0.25rem',
        'pharma-sm': '0.5rem',
        'pharma-md': '1rem',
        'pharma-lg': '1.5rem',
        'pharma-xl': '2rem',
        'pharma-2xl': '3rem',
        'pharma-3xl': '4rem',
      },
      boxShadow: {
        // Pharmaceutical shadows using official brand colors
        'pharma-sm': '0 1px 2px 0 rgba(64, 41, 110, 0.05)',
        'pharma-md': '0 4px 6px -1px rgba(64, 41, 110, 0.1), 0 2px 4px -1px rgba(64, 41, 110, 0.06)',
        'pharma-lg': '0 10px 15px -3px rgba(64, 41, 110, 0.1), 0 4px 6px -2px rgba(64, 41, 110, 0.05)',
        'pharma-xl': '0 20px 25px -5px rgba(64, 41, 110, 0.1), 0 10px 10px -5px rgba(64, 41, 110, 0.04)',
        'pharma-turquoise': '0 4px 6px -1px rgba(98, 198, 194, 0.1), 0 2px 4px -1px rgba(98, 198, 194, 0.06)',
      },
      animation: {
        // Pharmaceutical-specific animations
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-subtle': 'bounce 2s infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'molecule-rotate': 'moleculeRotate 20s linear infinite',
        'heartbeat': 'heartbeat 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        moleculeRotate: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(360deg)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
      backgroundImage: {
        // Pharmaceutical gradients using brand colors
        'pharma-gradient': 'linear-gradient(135deg, #40296e 0%, #62c6c2 100%)',
        'pharma-gradient-subtle': 'linear-gradient(135deg, #faf9fc 0%, #f0fdfc 100%)',
        'pharma-mesh': `
          radial-gradient(at 40% 20%, #40296e 0px, transparent 50%),
          radial-gradient(at 80% 0%, #62c6c2 0px, transparent 50%),
          radial-gradient(at 0% 50%, #F7F7F7 0px, transparent 50%)
        `,
      },
      backdropBlur: {
        xs: '2px',
      },
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config; 