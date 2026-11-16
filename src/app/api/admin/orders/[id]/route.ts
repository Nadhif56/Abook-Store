import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { updateOrderStatus } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getCurrentUser();
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Akses ditolak: Hanya administrator." }, { status: 403 });
    }

    const { id } = params;
    const body = await request.json();
    const { status, notes } = body;

    if (!["menunggu_konfirmasi", "dikonfirmasi", "dibatalkan"].includes(status)) {
      return NextResponse.json(
        { error: "Status pesanan tidak valid ('menunggu_konfirmasi', 'dikonfirmasi', 'dibatalkan')." },
        { status: 400 }
      );
    }

    const updated = await updateOrderStatus(id, status, notes);
    return NextResponse.json({ success: true, order: updated });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Gagal memperbarui status pesanan." },
      { status: 500 }
    );
  }
}
