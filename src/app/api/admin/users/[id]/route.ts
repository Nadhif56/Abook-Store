import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getUsers, updateUser, deleteUser } from "@/lib/db";

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
    const { role_id, status } = await request.json();

    // Lindungi agar admin tidak menonaktifkan dirinya sendiri
    if (id === session.id && status === "inactive") {
      return NextResponse.json(
        { error: "Anda tidak dapat menonaktifkan akun admin Anda sendiri." },
        { status: 400 }
      );
    }

    // Lindungi agar admin tidak mengubah role dirinya sendiri menjadi non-admin
    if (id === session.id && role_id && role_id !== "admin") {
      return NextResponse.json(
        { error: "Anda tidak dapat mencabut hak admin dari akun Anda sendiri." },
        { status: 400 }
      );
    }

    // Cek jika menonaktifkan akun admin terakhir
    if (status === "inactive" || (role_id && role_id !== "admin")) {
      const allUsers = await getUsers();
      const activeAdmins = allUsers.filter(
        (u) => u.role_id === "admin" && u.status === "active" && u.id !== id
      );
      if (activeAdmins.length === 0) {
        return NextResponse.json(
          { error: "Tidak dapat mengubah role/status. Sistem harus memiliki minimal satu akun admin aktif." },
          { status: 400 }
        );
      }
    }

    const updates: any = {};
    if (role_id !== undefined) updates.role_id = role_id;
    if (status !== undefined) updates.status = status;

    const updated = await updateUser(id, updates);
    return NextResponse.json({ success: true, user: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Gagal memperbarui pengguna." }, { status: 500 });
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

    // Lindungi agar admin tidak menghapus dirinya sendiri
    if (id === session.id) {
      return NextResponse.json(
        { error: "Anda tidak dapat menghapus akun Anda sendiri saat sedang masuk." },
        { status: 400 }
      );
    }

    // Lindungi agar tidak menghapus admin terakhir
    const allUsers = await getUsers();
    const targetUser = allUsers.find((u) => u.id === id);
    if (targetUser?.role_id === "admin") {
      const remainingAdmins = allUsers.filter(
        (u) => u.role_id === "admin" && u.id !== id
      );
      if (remainingAdmins.length === 0) {
        return NextResponse.json(
          { error: "Tidak dapat menghapus admin terakhir pada sistem." },
          { status: 400 }
        );
      }
    }

    await deleteUser(id);
    return NextResponse.json({ success: true, message: "Pengguna berhasil dihapus." });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Gagal menghapus pengguna." }, { status: 500 });
  }
}

