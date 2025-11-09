import Link from "next/link";
import { isSupportedLocale } from "@/lib/i18n/config";

type Props = { params: Promise<{ locale: string }> };

export default async function PartnersPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = isSupportedLocale(localeParam) ? localeParam : "ar";
  return (
    <main className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-4">{locale === "ar" ? "الشركاء" : "Partners"}</h1>
      <p className="text-muted-foreground mb-8">
        {locale === "ar"
          ? "تعرف على إمكانياتنا وكيفية الانضمام إلى شبكة شركائنا."
          : "Learn about our capabilities and how to join our partner network."}
      </p>
      <Link
        href="/portal/partner"
        className="inline-block rounded-lg bg-primary text-primary-foreground px-4 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        {locale === "ar" ? "دخول البوابة" : "Enter Portal"}
      </Link>
    </main>
  );
}


