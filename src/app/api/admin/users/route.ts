import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getUsers } from "@/lib/db";

export async function GET() {
  const session = await getCurrentUser();
  if (!session || session.role !== "admin") {
    return NextResponse.json(
      { error: "Akses ditolak: Hanya administrator yang diizinkan." },
      { status: 403 }
    );
  }

  const users = await getUsers();
  // Sembunyikan password_hash dari response
  const sanitized = users.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role_id: u.role_id,
    status: u.status,
    created_at: u.created_at,
    updated_at: u.updated_at,
  }));

  return NextResponse.json({ success: true, users: sanitized });
}

