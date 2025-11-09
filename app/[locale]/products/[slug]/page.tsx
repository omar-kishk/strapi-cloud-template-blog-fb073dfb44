import { fetchProductBySlug } from "@/lib/cms/strapi";
import { isSupportedLocale } from "@/lib/i18n/config";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ locale: string; slug: string }> };

export default async function ProductDetailPage({ params }: Props) {
  const { locale: localeParam, slug } = await params;
  const locale = isSupportedLocale(localeParam) ? localeParam : "ar";
  const product = await fetchProductBySlug(locale, slug);
  if (!product) notFound();

  return (
    <main className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-3">{product.title}</h1>
      {product.summary ? <p className="text-muted-foreground mb-8">{product.summary}</p> : null}
      <div className="rounded-xl border p-6">
        <h2 className="text-xl font-semibold mb-2">
          {locale === "ar" ? "المستندات التنظيمية" : "Regulatory Documents"}
        </h2>
        <p className="text-sm text-muted-foreground">
          {locale === "ar"
            ? "سيتم عرض المستندات المرتبطة بالمنتج هنا عند ربط Strapi."
            : "Product-linked regulatory documents will appear here once Strapi is connected."}
        </p>
      </div>
    </main>
  );
}


