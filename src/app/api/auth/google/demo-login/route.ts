import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { getUserByEmail, createUser } from "@/lib/db";
import { createSessionToken, hashPassword, COOKIE_NAME } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const { name, email, redirect } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Format email Google tidak valid." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    const displayName = name || normalizedEmail.split("@")[0];

    // Cari atau buat pengguna baru
    let user = await getUserByEmail(normalizedEmail);
    if (!user) {
      const randomPassword = uuidv4();
      const passwordHash = await hashPassword(randomPassword);

      user = await createUser({
        name: displayName,
        email: normalizedEmail,
        password_hash: passwordHash,
        role_id: "user",
        status: "active",
      });
    }

    // Buat JWT token
    const token = await createSessionToken({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role_id,
    });

    const redirectUrl = redirect || "/";
    const response = NextResponse.json({
      success: true,
      message: `Berhasil masuk sebagai ${displayName}`,
      redirect: redirectUrl,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role_id,
      },
    });

    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Gagal masuk via akun Google." },
      { status: 500 }
    );
  }
}
