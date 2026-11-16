import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getOrderById } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getCurrentUser();
  if (!session) {
    return NextResponse.json({ error: "Sesi login diperlukan." }, { status: 401 });
  }

  const order = await getOrderById(params.id);
  if (!order) {
    return NextResponse.json({ error: "Pesanan tidak ditemukan." }, { status: 404 });
  }

  // Pengguna hanya boleh melihat pesanan miliknya, kecuali admin
  if (order.user_id !== session.id && session.role !== "admin") {
    return NextResponse.json(
      { error: "Akses ditolak: Anda tidak memiliki akses ke pesanan ini." },
      { status: 403 }
    );
  }

  return NextResponse.json({ success: true, order });
}
