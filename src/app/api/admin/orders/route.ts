import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getOrders } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getCurrentUser();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Akses ditolak: Hanya administrator." }, { status: 403 });
  }

  // Admin mengambil seluruh pesanan
  const orders = await getOrders();
  return NextResponse.json({ success: true, orders });
}
