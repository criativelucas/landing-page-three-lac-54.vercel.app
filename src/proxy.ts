import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LOCALE_COOKIE = "locale";
const PT_COUNTRIES = new Set(["BR", "PT", "AO", "MZ", "CV", "GW", "ST", "TL"]);

// First-visit only: Vercel's edge sets x-vercel-ip-country on every request,
// so we use it once to pick a sensible default, then let the cookie (set
// here or overridden by the language switcher) win on every later request.
export function proxy(request: NextRequest) {
  if (request.cookies.has(LOCALE_COOKIE)) {
    return NextResponse.next();
  }

  const country = request.headers.get("x-vercel-ip-country") ?? "";
  const locale = PT_COUNTRIES.has(country) ? "pt" : "en";

  const response = NextResponse.next();
  response.cookies.set(LOCALE_COOKIE, locale, {
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
    sameSite: "lax",
  });
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\..*).*)"],
};
