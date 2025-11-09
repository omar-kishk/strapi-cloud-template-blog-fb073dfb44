import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

const SECRET = process.env.NEXT_REVALIDATE_SECRET || process.env.STRAPI_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const secret = url.searchParams.get("secret");
    if (!SECRET || secret !== SECRET) {
      return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
    }

    const body: Record<string, unknown> = await request.json().catch(() => ({} as Record<string, unknown>));
    // Optional: derive tag from Strapi model
    const model: string | undefined = (typeof body?.model === 'string' ? body.model : undefined) ||
                                     (typeof body?.event === 'string' ? body.event : undefined) ||
                                     url.searchParams.get("tag") || undefined;

    // Revalidate common tags or specific paths as needed
    if (model) {
      const tag = model.toString().toLowerCase();
      revalidateTag(tag);
    }
    // General pages we know depend on content
    revalidateTag("products");
    revalidateTag("compliance");
    revalidateTag("pages");

    // Home and product listing pages
    revalidatePath("/ar");
    revalidatePath("/en");
    revalidatePath("/ar/products");
    revalidatePath("/en/products");

    return NextResponse.json({ ok: true, model: model || null });
  } catch {
    return NextResponse.json({ ok: false, error: "failed" }, { status: 500 });
  }
}


