import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getRoles, createRole } from "@/lib/db";

export async function GET() {
  const session = await getCurrentUser();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Akses ditolak: Hanya admin." }, { status: 403 });
  }
  const roles = await getRoles();
  return NextResponse.json({ success: true, roles });
}

export async function POST(request: Request) {
  try {
    const session = await getCurrentUser();
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Akses ditolak: Hanya admin." }, { status: 403 });
    }

    const { name, description, permissions } = await request.json();

    if (!name) {
      return NextResponse.json({ error: "Nama role wajib diisi." }, { status: 400 });
    }

    const newRole = await createRole({
      name: name.trim().toLowerCase(),
      description: description || "",
      permissions: Array.isArray(permissions) ? permissions : ["read"],
      is_system: false,
    });

    return NextResponse.json({ success: true, role: newRole });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Gagal membuat role." }, { status: 500 });
  }
}

