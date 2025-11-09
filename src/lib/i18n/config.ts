export const supportedLocales = ["ar", "en"] as const;
export type SupportedLocale = (typeof supportedLocales)[number];

export const defaultLocale: SupportedLocale = "ar";

export const isSupportedLocale = (locale: string | null | undefined): locale is SupportedLocale => {
  return !!locale && supportedLocales.includes(locale as SupportedLocale);
};

export const getDirForLocale = (locale: SupportedLocale): "rtl" | "ltr" => {
  return locale === "ar" ? "rtl" : "ltr";
};


