type StrapiImage = {
  url: string;
  alternativeText?: string;
};

export type StrapiProduct = {
  id: number;
  slug: string;
  title: string;
  summary?: string;
  heroImage?: StrapiImage;
  therapeuticArea?: string;
};

export type StrapiRegulatoryDoc = {
  id: number;
  title: string;
  version?: string;
  fileUrl?: string;
  approvedAt?: string;
};

// Internal types for Strapi API responses
interface StrapiResponseItem {
  id: number;
  attributes?: Record<string, unknown>;
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

async function strapiFetch<T>(path: string, params?: Record<string, string | number | boolean>): Promise<T> {
  if (!STRAPI_URL) {
    throw new Error("STRAPI_URL not configured");
  }
  const url = new URL(`${STRAPI_URL}${path}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)));
  }
  const res = await fetch(url.toString(), {
    headers: {
      "Content-Type": "application/json",
      ...(STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {}),
    },
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error(`Strapi request failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

// Products
export async function fetchProducts(locale: string, page = 1, pageSize = 12): Promise<StrapiProduct[]> {
  try {
    const data = await strapiFetch<{ data: StrapiResponseItem[] }>("/api/products", {
      "pagination[page]": page,
      "pagination[pageSize]": pageSize,
      locale,
      populate: "heroImage",
    });
    return (data.data || []).map((item) => ({
      id: item.id,
      slug: (item.attributes?.slug as string) ?? "",
      title: (item.attributes?.title as string) ?? "",
      summary: (item.attributes?.summary as string) ?? "",
      heroImage: item.attributes?.heroImage && (item.attributes.heroImage as { data?: { attributes?: { url?: string } } }).data
        ? { url: (item.attributes.heroImage as { data: { attributes: { url: string } } }).data.attributes.url }
        : undefined,
      therapeuticArea: (item.attributes?.therapeuticArea as string) ?? "",
    }));
  } catch {
    // Fallback mock to keep the app functional during setup
    return [
      { id: 1, slug: "aspirin-plus", title: "Aspirin Plus", summary: "Analgesic / Antiplatelet" },
      { id: 2, slug: "vitamin-d3", title: "Vitamin D3", summary: "Nutraceutical" },
    ];
  }
}

export async function fetchProductBySlug(locale: string, slug: string): Promise<StrapiProduct | null> {
  try {
    const data = await strapiFetch<{ data: StrapiResponseItem[] }>("/api/products", {
      filters: JSON.stringify({ slug: { $eq: slug } }),
      locale,
      populate: "heroImage,regulatoryDocs",
    });
    const item = data.data?.[0];
    if (!item) return null;
    return {
      id: item.id,
      slug: (item.attributes?.slug as string) ?? "",
      title: (item.attributes?.title as string) ?? "",
      summary: (item.attributes?.summary as string) ?? "",
      heroImage: item.attributes?.heroImage && (item.attributes.heroImage as { data?: { attributes?: { url?: string } } }).data
        ? { url: (item.attributes.heroImage as { data: { attributes: { url: string } } }).data.attributes.url }
        : undefined,
      therapeuticArea: (item.attributes?.therapeuticArea as string) ?? "",
    };
  } catch {
    if (slug === "aspirin-plus") {
      return { id: 1, slug: "aspirin-plus", title: "Aspirin Plus", summary: "Analgesic / Antiplatelet" };
    }
    return null;
  }
}

// Compliance
export async function fetchRegulatoryDocs(locale: string): Promise<StrapiRegulatoryDoc[]> {
  try {
    const data = await strapiFetch<{ data: StrapiResponseItem[] }>("/api/regulatory-docs", { locale });
    return (data.data || []).map((d) => {
      type FileAttr = { file?: { data?: { attributes?: { url?: string } } } };
      const attrs = (d.attributes || {}) as FileAttr & {
        title?: string;
        version?: string;
        approvedAt?: string;
      };
      return {
        id: d.id,
        title: attrs.title ?? "",
        version: attrs.version ?? "",
        fileUrl: attrs.file?.data?.attributes?.url,
        approvedAt: attrs.approvedAt ?? "",
      };
    });
  } catch {
    return [{ id: 1, title: "SFDA License", version: "v2025.1", fileUrl: "#", approvedAt: "2025-01-01" }];
  }
}


