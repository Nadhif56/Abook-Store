import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { updateNews, deleteNews, getNewsById } from "@/lib/db";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getCurrentUser();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Akses ditolak: Hanya admin." }, { status: 403 });
  }

  const item = await getNewsById(params.id);
  if (!item) {
    return NextResponse.json({ error: "Berita tidak ditemukan." }, { status: 404 });
  }
  return NextResponse.json({ success: true, news: item });
}

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

    const updated = await updateNews(id, body);
    return NextResponse.json({ success: true, news: updated });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Gagal memperbarui berita." },
      { status: 500 }
    );
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
    await deleteNews(id);
    return NextResponse.json({ success: true, message: "Berita berhasil dihapus." });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Gagal menghapus berita." },
      { status: 500 }
    );
  }
}

