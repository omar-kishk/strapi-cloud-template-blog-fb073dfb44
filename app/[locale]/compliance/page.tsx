import { fetchRegulatoryDocs, type StrapiRegulatoryDoc } from "@/lib/cms/strapi";
import { isSupportedLocale } from "@/lib/i18n/config";

type Props = { params: Promise<{ locale: string }> };

export default async function CompliancePage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = isSupportedLocale(localeParam) ? localeParam : "ar";
  const docs = await fetchRegulatoryDocs(locale);

  return (
    <main className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">{locale === "ar" ? "مركز الامتثال" : "Compliance Center"}</h1>
      <ul className="space-y-3">
        {docs.map((d: StrapiRegulatoryDoc) => (
          <li key={d.id} className="border rounded-xl p-4">
            <div className="font-semibold">{d.title}</div>
            <div className="text-sm text-muted-foreground">
              {(locale === "ar" ? "الإصدار: " : "Version: ") + (d.version ?? "—")}
              {" · "}
              {(locale === "ar" ? "اعتمدت في: " : "Approved: ") + (d.approvedAt ?? "—")}
            </div>
            {d.fileUrl ? (
              <a
                href={d.fileUrl}
                className="inline-block mt-2 text-primary underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {locale === "ar" ? "تنزيل" : "Download"}
              </a>
            ) : null}
          </li>
        ))}
      </ul>
    </main>
  );
}


