import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const redirectTarget = searchParams.get("redirect") || "/";
  const from = searchParams.get("from") || "login";

  // Dapatkan Base URL dinamis (localhost atau URL Vercel production)
  const host = (request.headers.get("x-forwarded-host") || request.headers.get("host") || "localhost:3000").trim();
  const isLocal = host.includes("localhost") || host.includes("127.0.0.1");
  const proto = request.headers.get("x-forwarded-proto") || (isLocal ? "http" : "https");
  let baseUrl = `${proto}://${host}`;
  if (process.env.NEXT_PUBLIC_SITE_URL && !isLocal) {
    baseUrl = process.env.NEXT_PUBLIC_SITE_URL.trim().replace(/[\r\n\s]+/g, "").replace(/\/$/, "");
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  // Jika Google Client ID sudah ada, arahkan langsung ke server otentikasi Google asli
  if (clientId && clientSecret && clientId.trim() !== "") {
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

  // Jika belum diisi, arahkan kembali ke form login/register dengan peringatan yang jelas
  const fallbackUrl = new URL(from === "register" ? "/register" : "/login", request.url);
  fallbackUrl.searchParams.set("error", "google_not_configured");
  return NextResponse.redirect(fallbackUrl.toString());
}
