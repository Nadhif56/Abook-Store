import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { updateRole, deleteRole, getRoles } from "@/lib/db";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getCurrentUser();
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Akses ditolak: Hanya admin." }, { status: 403 });
    }

    const { id } = params;
    const body = await request.json();

    const roles = await getRoles();
    const existing = roles.find((r) => r.id === id);
    if (existing?.is_system) {
      return NextResponse.json(
        { error: "Role sistem ('admin' dan 'user') tidak dapat dimodifikasi." },
        { status: 400 }
      );
    }

    const updated = await updateRole(id, {
      description: body.description,
      permissions: body.permissions,
    });

    return NextResponse.json({ success: true, role: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Gagal mengubah role." }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getCurrentUser();
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Akses ditolak: Hanya admin." }, { status: 403 });
    }

    const { id } = params;
    await deleteRole(id);
    return NextResponse.json({ success: true, message: "Role berhasil dihapus." });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Gagal menghapus role." }, { status: 400 });
  }
}

