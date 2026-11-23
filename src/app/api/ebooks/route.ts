import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    success: true,
    books: siteConfig.sampleBooks,
  });
}
