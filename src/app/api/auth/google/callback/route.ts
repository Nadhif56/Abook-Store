import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { getUserByEmail, createUser } from "@/lib/db";
import { createSessionToken, hashPassword, COOKIE_NAME } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const stateRaw = searchParams.get("state");
  const error = searchParams.get("error");

  let redirectTarget = "/";
  if (stateRaw) {
    try {
      const parsed = JSON.parse(Buffer.from(stateRaw, "base64").toString("utf-8"));
      if (parsed.redirect) redirectTarget = parsed.redirect;
    } catch {
      redirectTarget = "/";
    }
  }

  if (error || !code) {
    console.error("Google OAuth Error:", error);
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("error", "google_auth_failed");
    return NextResponse.redirect(loginUrl);
  }

  const host = request.headers.get("x-forwarded-host") || request.headers.get("host") || "localhost:3000";
  const isLocal = host.includes("localhost") || host.includes("127.0.0.1");
  const proto = request.headers.get("x-forwarded-proto") || (isLocal ? "http" : "https");
  let baseUrl = `${proto}://${host}`;
  if (process.env.NEXT_PUBLIC_SITE_URL && !isLocal) {
    baseUrl = process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  const redirectUri = `${baseUrl}/api/auth/google/callback`;

  try {
    // 1. Tukar kode otorisasi dengan token dari Google
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID || "",
        client_secret: process.env.GOOGLE_CLIENT_SECRET || "",
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenRes.json();
    if (!tokenRes.ok || !tokenData.access_token) {
      throw new Error(tokenData.error_description || "Gagal menukar token dengan Google.");
    }

    // 2. Ambil informasi profil dari Google
    const userRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    const googleUser = await userRes.json();
    if (!userRes.ok || !googleUser.email) {
      throw new Error("Gagal mengambil data profil Google.");
    }

    const email = googleUser.email.toLowerCase().trim();
    const name = googleUser.name || email.split("@")[0];

    // 3. Cari pengguna di database atau daftarkan jika baru pertama kali login
    let user = await getUserByEmail(email);

    if (!user) {
      // Buat akun baru otomatis dengan role 'user'
      const randomPassword = uuidv4();
      const passwordHash = await hashPassword(randomPassword);

      user = await createUser({
        name,
        email,
        password_hash: passwordHash,
        role_id: "user",
        status: "active",
      });
    }

    // 4. Buat sesi JWT dan pasang di cookie httpOnly
    const sessionToken = await createSessionToken({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role_id,
    });

    const response = NextResponse.redirect(new URL(redirectTarget, request.url));
    response.cookies.set({
      name: COOKIE_NAME,
      value: sessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 hari
    });

    return response;
  } catch (err: any) {
    console.error("Gagal memproses login Google:", err);
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("error", "google_server_error");
    return NextResponse.redirect(loginUrl);
  }
}
