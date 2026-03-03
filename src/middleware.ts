// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const DEFAULT_LOCALE = process.env.NEXT_PUBLIC_DEFAULT_LOCALE || "pt";
const OTHER_LOCALES = (process.env.NEXT_PUBLIC_OTHER_LOCALES || "en").split(",");
const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // skip internals
  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || PUBLIC_FILE.test(pathname)) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  let locale = DEFAULT_LOCALE;
  let response: NextResponse;

  // strip `/pt` prefix
  if (segments[0] === DEFAULT_LOCALE) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(`/${DEFAULT_LOCALE}`, "") || "/";
    response = NextResponse.rewrite(url);
  }
  // already prefixed with en|es
  else if (OTHER_LOCALES.includes(segments[0])) {
    locale = segments[0];
    response = NextResponse.next();
  }
  // no prefix → default
  else {
    response = NextResponse.next();
  }

  // set the cookie so SSR/API can read it
  // you can choose any name, here “NEXT_LOCALE”
  response.cookies.set({
    name: "fisio:locale",
    value: locale,
    path: "/", // cookie available everywhere
    maxAge: 60 * 60 * 24 * 30 // 30 days, adjust as needed
  });

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
