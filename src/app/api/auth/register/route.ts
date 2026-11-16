import { NextResponse } from "next/server";
import { getUserByEmail, createUser } from "@/lib/db";
import { hashPassword, createSessionToken, COOKIE_NAME } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Nama, email, dan kata sandi wajib diisi." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Kata sandi minimal harus 6 karakter." },
        { status: 400 }
      );
    }

    const existing = await getUserByEmail(email);
    if (existing) {
      return NextResponse.json(
        { error: "Alamat email ini sudah terdaftar. Silakan login." },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);
    const newUser = await createUser({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password_hash: passwordHash,
      role_id: "user", // Pendaftaran umum selalu menghasilkan role 'user'
      status: "active",
    });

    const sessionUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role_id,
    };

    const token = await createSessionToken(sessionUser);

    const response = NextResponse.json({
      success: true,
      user: sessionUser,
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
      { error: err.message || "Gagal melakukan pendaftaran." },
      { status: 500 }
    );
  }
}

