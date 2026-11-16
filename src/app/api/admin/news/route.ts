import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getNews, createNews } from "@/lib/db";

export async function GET() {
  const session = await getCurrentUser();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Akses ditolak: Hanya admin." }, { status: 403 });
  }

  // Admin melihat semua artikel (baik draft maupun published)
  const news = await getNews(false);
  return NextResponse.json({ success: true, news });
}

export async function POST(request: Request) {
  try {
    const session = await getCurrentUser();
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Akses ditolak: Hanya admin." }, { status: 403 });
    }

    const { title, slug, excerpt, content, thumbnail_path, status } =
      await request.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: "Judul dan konten berita wajib diisi." },
        { status: 400 }
      );
    }

    const generatedSlug =
      slug ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const newArticle = await createNews({
      title: title.trim(),
      slug: generatedSlug,
      excerpt: excerpt || title.slice(0, 120),
      content: content.trim(),
      thumbnail_path:
        thumbnail_path || "/images/news-festival.svg",
      status: status === "draft" ? "draft" : "published",
      author_id: session.id,
    });

    return NextResponse.json({ success: true, news: newArticle });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Gagal membuat berita." },
      { status: 500 }
    );
  }
}

