import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode(
  process.env.AUTH_SECRET || "abook-store-super-secret-jwt-key-2026-safe"
);

const COOKIE_NAME = "abook_session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(COOKIE_NAME)?.value;

  let session: { id: string; name: string; email: string; role: string } | null = null;

  if (token) {
    try {
      const { payload } = await jwtVerify(token, SECRET_KEY);
      session = {
        id: payload.id as string,
        name: payload.name as string,
        email: payload.email as string,
        role: payload.role as string,
      };
    } catch {
      session = null;
    }
  }

  // 1. Proteksi Halaman Dashboard (Hanya role admin)
  if (pathname.startsWith("/dashboard")) {
    if (!session) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (session.role !== "admin") {
      // User biasa mencoba akses dashboard -> alihkan ke beranda dengan peringatan
      const homeUrl = new URL("/", request.url);
      homeUrl.searchParams.set("error", "unauthorized_admin");
      return NextResponse.redirect(homeUrl);
    }
  }

  // 2. Jika sudah login dan membuka /login atau /register
  if (pathname === "/login" || pathname === "/register") {
    if (session) {
      if (session.role === "admin") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};

