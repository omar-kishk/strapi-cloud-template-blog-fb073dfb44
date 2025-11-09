import Link from "next/link";
import { fetchProducts, type StrapiProduct } from "@/lib/cms/strapi";
import { isSupportedLocale } from "@/lib/i18n/config";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ page?: string }>
};

export default async function ProductsPage({ params, searchParams }: Props) {
  const { locale: localeParam } = await params;
  const locale = isSupportedLocale(localeParam) ? localeParam : "ar";
  const searchParamsResolved = searchParams ? await searchParams : {};
  const page = Number(searchParamsResolved?.page ?? 1);
  const products = await fetchProducts(locale, page);

  return (
    <main className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">{locale === "ar" ? "المنتجات" : "Products"}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {products.map((p: StrapiProduct) => (
          <Link
            key={p.slug}
            href={`/${locale}/products/${p.slug}`}
            className="block border rounded-xl p-5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label={(locale === "ar" ? "عرض " : "View ") + p.title}
          >
            <div className="text-xl font-semibold mb-2">{p.title}</div>
            {p.summary ? <p className="text-muted-foreground">{p.summary}</p> : null}
          </Link>
        ))}
      </div>
    </main>
  );
}


