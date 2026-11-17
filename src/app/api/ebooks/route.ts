import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface GutendexAuthor {
  name: string;
  birth_year?: number;
  death_year?: number;
}

interface GutendexBook {
  id: number;
  title: string;
  authors: GutendexAuthor[];
  summaries?: string[];
  subjects: string[];
  bookshelves: string[];
  languages: string[];
  copyright: boolean;
  media_type: string;
  formats: Record<string, string>;
  download_count: number;
}

function formatAuthorName(name: string): string {
  if (!name) return "Penulis Anonim";
  // Convert "Austen, Jane" -> "Jane Austen"
  const parts = name.split(",");
  if (parts.length === 2) {
    return `${parts[1].trim()} ${parts[0].trim()}`;
  }
  return name.trim();
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const topic = searchParams.get("topic") || "";
  const page = searchParams.get("page") || "1";

  try {
    const gutendexUrl = new URL("https://gutendex.com/books");
    if (search.trim()) gutendexUrl.searchParams.set("search", search.trim());
    if (topic.trim() && topic !== "all") gutendexUrl.searchParams.set("topic", topic.trim());
    gutendexUrl.searchParams.set("page", page);

    const res = await fetch(gutendexUrl.toString(), {
      headers: {
        "Accept": "application/json",
        "User-Agent": "AbookStore-DigitalBookstore/1.0",
      },
      next: { revalidate: 3600 }, // Cache 1 jam
    });

    if (!res.ok) {
      throw new Error(`Gutendex API returned status ${res.status}`);
    }

    const data = await res.json();

    const books = (data.results || []).map((item: GutendexBook) => {
      const author = item.authors && item.authors.length > 0
        ? formatAuthorName(item.authors[0].name)
        : "Penulis Klasik";

      // Cari format cover terbaik
      const cover =
        item.formats["image/jpeg"] ||
        `https://www.gutenberg.org/cache/epub/${item.id}/pg${item.id}.cover.medium.jpg`;

      // Cari format baca online (HTML atau teks)
      const readUrl =
        item.formats["text/html"] ||
        item.formats["text/html; charset=utf-8"] ||
        item.formats["text/plain; charset=utf-8"] ||
        `https://www.gutenberg.org/ebooks/${item.id}.html.images`;

      // Cari format unduh EPUB
      const downloadEpub =
        item.formats["application/epub+zip"] ||
        `https://www.gutenberg.org/ebooks/${item.id}.epub3.images`;

      // Ringkasan
      const summary =
        item.summaries && item.summaries.length > 0
          ? item.summaries[0]
          : `E-book klasik '${item.title}' karya ${author}. Koleksi literasi digital Project Gutenberg yang bebas dibaca dan diunduh.`;

      // Filter kategori singkat
      const category = item.subjects && item.subjects.length > 0
        ? item.subjects[0].split("--")[0].trim()
        : "Sastra Klasik";

      return {
        id: item.id,
        title: item.title,
        author,
        cover,
        readUrl,
        downloadEpub,
        summary,
        category,
        downloadCount: item.download_count,
        physicalPrice: 85000, // Harga estimasi buku cetak fisik jika ingin pesan cetak di Abook Store
      };
    });

    return NextResponse.json({
      success: true,
      count: data.count,
      next: data.next ? true : false,
      previous: data.previous ? true : false,
      books,
    });
  } catch (err: any) {
    console.error("Gagal mengambil data dari Gutendex:", err);
    return NextResponse.json(
      {
        success: false,
        error: "Gagal memuat e-book dari server Gutendex. Coba beberapa saat lagi.",
        books: [],
      },
      { status: 500 }
    );
  }
}
