import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const redirectTarget = searchParams.get("redirect") || "/";

  // Dapatkan Base URL dinamis (bisa localhost atau domain Vercel production)
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host") || "localhost:3000";
  const proto = request.headers.get("x-forwarded-proto") || (host.startsWith("localhost") ? "http" : "https");
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || `${proto}://${host}`;

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  // Jika Google Client ID sudah dikonfigurasi, arahkan ke Google OAuth 2.0 resmi
  if (clientId && clientSecret && clientId !== "YOUR_GOOGLE_CLIENT_ID") {
    const redirectUri = `${baseUrl}/api/auth/google/callback`;
    const state = Buffer.from(JSON.stringify({ redirect: redirectTarget })).toString("base64");

    const googleAuthUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    googleAuthUrl.searchParams.set("client_id", clientId);
    googleAuthUrl.searchParams.set("redirect_uri", redirectUri);
    googleAuthUrl.searchParams.set("response_type", "code");
    googleAuthUrl.searchParams.set("scope", "openid email profile");
    googleAuthUrl.searchParams.set("access_type", "offline");
    googleAuthUrl.searchParams.set("prompt", "select_account");
    googleAuthUrl.searchParams.set("state", state);

    return NextResponse.redirect(googleAuthUrl.toString());
  }

  // Jika belum dikonfigurasi, alihkan ke halaman simulasi / demo Google login
  // agar pengguna dan tester bisa langsung mencoba pengalaman login Google tanpa terblokir
  const demoUrl = new URL("/auth/google-demo", request.url);
  demoUrl.searchParams.set("redirect", redirectTarget);
  return NextResponse.redirect(demoUrl.toString());
}
