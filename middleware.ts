import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, isSupportedLocale, supportedLocales } from "./src/lib/i18n/config";

const LOCALE_COOKIE = "NEXT_LOCALE";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignore next internals and static assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon") ||
    pathname.includes(".") // assets
  ) {
    return NextResponse.next();
  }

  // If path already has a supported locale, persist it to cookie and continue
  const pathLocale = pathname.split("/")[1];
  if (isSupportedLocale(pathLocale)) {
    const res = NextResponse.next();
    // Persist chosen locale
    res.cookies.set(LOCALE_COOKIE, pathLocale, { path: "/", sameSite: "lax" });
    return res;
  }

  // Determine desired locale from cookie -> Accept-Language -> default
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  const headerLocale = request.headers.get("accept-language")?.split(",")[0]?.split("-")[0];
  const detected =
    (cookieLocale && isSupportedLocale(cookieLocale) && cookieLocale) ||
    (headerLocale && isSupportedLocale(headerLocale) && headerLocale) ||
    defaultLocale;

  // Redirect to locale-prefixed path
  const redirectUrl = new URL(`/${detected}${pathname}`, request.url);
  const response = NextResponse.redirect(redirectUrl);
  response.cookies.set(LOCALE_COOKIE, detected, { path: "/", sameSite: "lax" });
  return response;
}

export const config = {
  matcher: ["/((?!_next|static|.*\\..*).*)"],
};


