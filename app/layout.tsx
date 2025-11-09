import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://babpharma.com'),
  title: "BAB Pharmaceutical Industries - Building Tomorrow's Healthcare Excellence",
  description: "Since 1979, BAB Pharmaceutical Industries has been the cornerstone of pharmaceutical innovation in Saudi Arabia, serving over 50 million patients across 25+ countries with world-class manufacturing, import & distribution excellence, and cutting-edge research & development.",
  keywords: "pharmaceutical, Saudi Arabia, BAB Pharma, medical devices, novel generics, nutraceuticals, healthcare, NUPCO, FDA licensed",
  authors: [{ name: "BAB Pharmaceutical Industries" }],
  creator: "BAB Pharmaceutical Industries",
  publisher: "BAB Pharmaceutical Industries",
  robots: "index, follow",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/bab-en.svg", sizes: "32x32", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: "/bab-en.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://babpharma.com",
    title: "BAB Pharmaceutical Industries - Healthcare Excellence Since 1979",
    description: "Leading pharmaceutical company in Saudi Arabia specializing in novel generics, medical devices, and nutraceuticals. Serving 50+ million patients across 25+ countries.",
    siteName: "BAB Pharmaceutical Industries",
    images: [
      {
        url: "/bab-en.svg",
        width: 1200,
        height: 630,
        alt: "BAB Pharmaceutical Industries Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BAB Pharmaceutical Industries",
    description: "Leading pharmaceutical innovation in Saudi Arabia since 1979",
    images: ["/bab-en.svg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#40296e", // BAB Pharma brand purple
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
          storageKey="bab-pharma-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
