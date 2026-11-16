import { NextResponse } from "next/server";
import { getCurrentUser, verifyPassword, hashPassword } from "@/lib/auth";
import { getUserById, updateUser } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const session = await getCurrentUser();
    if (!session) {
      return NextResponse.json({ error: "Sesi telah berakhir. Silakan login kembali." }, { status: 401 });
    }

    const { oldPassword, newPassword } = await request.json();

    if (!oldPassword || !newPassword) {
      return NextResponse.json(
        { error: "Kata sandi lama dan baru wajib diisi." },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "Kata sandi baru minimal 6 karakter." },
        { status: 400 }
      );
    }

    const user = await getUserById(session.id);
    if (!user) {
      return NextResponse.json({ error: "Pengguna tidak ditemukan." }, { status: 404 });
    }

    const isValid = await verifyPassword(oldPassword, user.password_hash);
    if (!isValid) {
      return NextResponse.json(
        { error: "Kata sandi saat ini tidak cocok." },
        { status: 400 }
      );
    }

    const newHash = await hashPassword(newPassword);
    await updateUser(session.id, { password_hash: newHash });

    return NextResponse.json({
      success: true,
      message: "Kata sandi berhasil diperbarui dengan aman.",
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Gagal memperbarui kata sandi." },
      { status: 500 }
    );
  }
}

