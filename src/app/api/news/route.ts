import { NextResponse } from "next/server";
import { getNews } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const publishedNews = await getNews(true);
  return NextResponse.json({ success: true, news: publishedNews });
}
