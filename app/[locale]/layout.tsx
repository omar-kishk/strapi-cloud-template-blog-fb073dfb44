
import type { ReactNode } from "react";
import "../globals.css";
import { getDirForLocale, isSupportedLocale } from "@/lib/i18n/config";
import { ThemeProvider } from "@/components/theme-provider";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: localeParam } = await params;
  const locale = isSupportedLocale(localeParam) ? localeParam : "ar";
  const dir = getDirForLocale(locale);

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <head />
      <body className="antialiased min-h-screen bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} storageKey="bab-pharma-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}


