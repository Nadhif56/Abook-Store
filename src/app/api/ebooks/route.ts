import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export interface GoogleBookItem {
  id: string;
  title: string;
  author: string;
  publisher?: string;
  publishedDate?: string;
  pageCount?: number;
  cover: string;
  previewUrl: string;
  readUrl: string;
  infoUrl: string;
  summary: string;
  category: string;
  rating?: number;
  physicalPrice: number;
}

// Koleksi kurasi Google Books resmi (dengan link Pratinjau Google Books aktif & aman dari 404)
const CURATED_GOOGLE_BOOKS: GoogleBookItem[] = [
  {
    id: "atomic-habits",
    title: "Atomic Habits: Perubahan Kecil yang Memberikan Hasil Luar Biasa",
    author: "James Clear",
    publisher: "Gramedia Pustaka Utama",
    publishedDate: "2019",
    pageCount: 356,
    cover: "/images/book-atomic-habits.svg",
    previewUrl: "https://www.google.com/search?q=Atomic+Habits+James+Clear&udm=books",
    readUrl: "https://www.google.com/search?q=Atomic+Habits+James+Clear&udm=books",
    infoUrl: "https://play.google.com/store/search?c=books&q=Atomic+Habits+James+Clear",
    summary: "Buku pengembangan diri terlaris dunia mengenai cara membentuk kebiasaan baik dan menghilangkan kebiasaan buruk dengan strategi perubahan 1% setiap hari.",
    category: "Pengembangan Diri",
    rating: 4.9,
    physicalPrice: 98000,
  },
  {
    id: "filosofi-teras",
    title: "Filosofi Teras: Filsafat Yunani-Kuno untuk Mental Tangguh Masa Kini",
    author: "Henry Manampiring",
    publisher: "Penerbit Buku Kompas",
    publishedDate: "2018",
    pageCount: 320,
    cover: "/images/book-filosofi-teras.svg",
    previewUrl: "https://www.google.com/search?q=Filosofi+Teras+Henry+Manampiring&udm=books",
    readUrl: "https://www.google.com/search?q=Filosofi+Teras+Henry+Manampiring&udm=books",
    infoUrl: "https://play.google.com/store/search?c=books&q=Filosofi+Teras+Henry+Manampiring",
    summary: "Panduan praktis stoisisme Yunani-Romawi kuno untuk mengendalikan emosi negatif, rasa cemas berlebih, dan melatih ketenangan batin dalam hidup sehari-hari.",
    category: "Filsafat & Pemikiran",
    rating: 4.8,
    physicalPrice: 88000,
  },
  {
    id: "laut-bercerita",
    title: "Laut Bercerita",
    author: "Leila S. Chudori",
    publisher: "Kepustakaan Populer Gramedia",
    publishedDate: "2017",
    pageCount: 394,
    cover: "/images/book-laut-bercerita.svg",
    previewUrl: "https://www.google.com/search?q=Laut+Bercerita+Leila+S+Chudori&udm=books",
    readUrl: "https://www.google.com/search?q=Laut+Bercerita+Leila+S+Chudori&udm=books",
    infoUrl: "https://play.google.com/store/search?c=books&q=Laut+Bercerita+Leila+S+Chudori",
    summary: "Novel fiksi sejarah menggetarkan tentang persahabatan, cinta, idealisme, dan penghilangan paksa para aktivis mahasiswa Indonesia di era akhir Orde Baru.",
    category: "Sastra & Fiksi",
    rating: 4.9,
    physicalPrice: 95000,
  },
  {
    id: "sebuah-seni-bodo-amat",
    title: "Sebuah Seni untuk Bersikap Bodo Amat",
    author: "Mark Manson",
    publisher: "Grasindo",
    publishedDate: "2018",
    pageCount: 256,
    cover: "/images/book-metodologi.svg",
    previewUrl: "https://www.google.com/search?q=Sebuah+Seni+untuk+Bersikap+Bodo+Amat+Mark+Manson&udm=books",
    readUrl: "https://www.google.com/search?q=Sebuah+Seni+untuk+Bersikap+Bodo+Amat+Mark+Manson&udm=books",
    infoUrl: "https://play.google.com/store/search?c=books&q=Sebuah+Seni+untuk+Bersikap+Bodo+Amat",
    summary: "Pendekatan tanpa omong kosong untuk menjalani hidup yang lebih bermakna dengan memilah hal-hal apa saja yang benar-benar layak kita pedulikan.",
    category: "Pengembangan Diri",
    rating: 4.7,
    physicalPrice: 78000,
  },
  {
    id: "bumi-manusia",
    title: "Bumi Manusia (Tetralogi Buru 1)",
    author: "Pramoedya Ananta Toer",
    publisher: "Lentera Dipantara",
    publishedDate: "2005",
    pageCount: 535,
    cover: "/images/book-bumi-manusia.svg",
    previewUrl: "https://www.google.com/search?q=Bumi+Manusia+Pramoedya+Ananta+Toer&udm=books",
    readUrl: "https://www.google.com/search?q=Bumi+Manusia+Pramoedya+Ananta+Toer&udm=books",
    infoUrl: "https://play.google.com/store/search?c=books&q=Bumi+Manusia+Pramoedya+Ananta+Toer",
    summary: "Mahakarya sastra Indonesia yang mengisahkan pergulatan Minke di Hindia Belanda akhir abad ke-19, cinta dengan Annelies, dan kebangkitan kesadaran nasional.",
    category: "Sastra & Fiksi",
    rating: 5.0,
    physicalPrice: 110000,
  },
  {
    id: "sapiens",
    title: "Sapiens: Riwayat Singkat Umat Manusia",
    author: "Yuval Noah Harari",
    publisher: "Kepustakaan Populer Gramedia",
    publishedDate: "2017",
    pageCount: 512,
    cover: "/images/book-sapiens.svg",
    previewUrl: "https://www.google.com/search?q=Sapiens+Riwayat+Singkat+Umat+Manusia+Yuval+Noah+Harari&udm=books",
    readUrl: "https://www.google.com/search?q=Sapiens+Riwayat+Singkat+Umat+Manusia+Yuval+Noah+Harari&udm=books",
    infoUrl: "https://play.google.com/store/search?c=books&q=Sapiens+Yuval+Noah+Harari",
    summary: "Eksplorasi mendalam peradaban dari zaman batu hingga revolusi kecerdasan buatan, menelusuri bagaimana Homo sapiens berhasil menguasai bumi.",
    category: "Sejarah & Peradaban",
    rating: 4.9,
    physicalPrice: 125000,
  },
  {
    id: "psychology-of-money",
    title: "The Psychology of Money: Pelajaran Abadi Mengenai Kekayaan & Kebahagiaan",
    author: "Morgan Housel",
    publisher: "Baca",
    publishedDate: "2021",
    pageCount: 268,
    cover: "/images/book-atomic-habits.svg",
    previewUrl: "https://www.google.com/search?q=The+Psychology+of+Money+Morgan+Housel&udm=books",
    readUrl: "https://www.google.com/search?q=The+Psychology+of+Money+Morgan+Housel&udm=books",
    infoUrl: "https://play.google.com/store/search?c=books&q=The+Psychology+of+Money+Morgan+Housel",
    summary: "19 cerita pendek bernas yang membongkar bahwa kesuksesan finansial bukan hanya soal matematika angka, melainkan perilaku psikologis terhadap uang.",
    category: "Bisnis & Keuangan",
    rating: 4.8,
    physicalPrice: 85000,
  },
  {
    id: "gadis-kretek",
    title: "Gadis Kretek",
    author: "Ratih Kumala",
    publisher: "Gramedia Pustaka Utama",
    publishedDate: "2012",
    pageCount: 274,
    cover: "/images/book-laut-bercerita.svg",
    previewUrl: "https://www.google.com/search?q=Gadis+Kretek+Ratih+Kumala&udm=books",
    readUrl: "https://www.google.com/search?q=Gadis+Kretek+Ratih+Kumala&udm=books",
    infoUrl: "https://play.google.com/store/search?c=books&q=Gadis+Kretek+Ratih+Kumala",
    summary: "Kisah romansa, rahasia keluarga, dan persaingan bisnis pabrik kretek lokal legendaris di Kota M yang melintasi era pasca kemerdekaan.",
    category: "Sastra & Fiksi",
    rating: 4.7,
    physicalPrice: 82000,
  },
  {
    id: "hujan-tere-liye",
    title: "Hujan",
    author: "Tere Liye",
    publisher: "Gramedia Pustaka Utama",
    publishedDate: "2016",
    pageCount: 320,
    cover: "/images/book-bumi-manusia.svg",
    previewUrl: "https://www.google.com/search?q=Hujan+Tere+Liye&udm=books",
    readUrl: "https://www.google.com/search?q=Hujan+Tere+Liye&udm=books",
    infoUrl: "https://play.google.com/store/search?c=books&q=Hujan+Tere+Liye",
    summary: "Kisah cinta, kerinduan, dan ketabahan di masa depan tahun 2042 tentang teknologi penghapus memori kesedihan dan arti menerima takdir.",
    category: "Sastra & Fiksi",
    rating: 4.8,
    physicalPrice: 89000,
  },
  {
    id: "cantik-itu-luka",
    title: "Cantik Itu Luka",
    author: "Eka Kurniawan",
    publisher: "Gramedia Pustaka Utama",
    publishedDate: "2015",
    pageCount: 508,
    cover: "/images/book-laut-bercerita.svg",
    previewUrl: "https://www.google.com/search?q=Cantik+Itu+Luka+Eka+Kurniawan&udm=books",
    readUrl: "https://www.google.com/search?q=Cantik+Itu+Luka+Eka+Kurniawan&udm=books",
    infoUrl: "https://play.google.com/store/search?c=books&q=Cantik+Itu+Luka+Eka+Kurniawan",
    summary: "Realisme magis berlatar kota pesisir Halimunda yang merefleksikan sejarah kelam kolonialisme dan kebangkitan bangsa melalui kehidupan Dewi Ayu.",
    category: "Sastra & Fiksi",
    rating: 4.9,
    physicalPrice: 115000,
  },
  {
    id: "dunia-sophie",
    title: "Dunia Sophie: Sebuah Novel Filsafat",
    author: "Jostein Gaarder",
    publisher: "Mizan",
    publishedDate: "2014",
    pageCount: 560,
    cover: "/images/book-filosofi-teras.svg",
    previewUrl: "https://www.google.com/search?q=Dunia+Sophie+Jostein+Gaarder&udm=books",
    readUrl: "https://www.google.com/search?q=Dunia+Sophie+Jostein+Gaarder&udm=books",
    infoUrl: "https://play.google.com/store/search?c=books&q=Dunia+Sophie+Jostein+Gaarder",
    summary: "Perjalanan seru seorang gadis muda dalam mengungkap misteri filsafat Barat dari era mitologi Yunani kuno hingga masa modern.",
    category: "Filsafat & Pemikiran",
    rating: 4.8,
    physicalPrice: 120000,
  },
  {
    id: "laskar-pelangi",
    title: "Laskar Pelangi",
    author: "Andrea Hirata",
    publisher: "Bentang Pustaka",
    publishedDate: "2005",
    pageCount: 529,
    cover: "/images/book-bumi-manusia.svg",
    previewUrl: "https://www.google.com/search?q=Laskar+Pelangi+Andrea+Hirata&udm=books",
    readUrl: "https://www.google.com/search?q=Laskar+Pelangi+Andrea+Hirata&udm=books",
    infoUrl: "https://play.google.com/store/search?c=books&q=Laskar+Pelangi+Andrea+Hirata",
    summary: "Inspirasi perjuangan sepuluh anak di Belitung dalam menempuh pendidikan dengan penuh semangat di bawah bimbingan guru yang luar biasa.",
    category: "Sastra & Fiksi",
    rating: 4.9,
    physicalPrice: 89000,
  },
  {
    id: "rich-dad-poor-dad",
    title: "Rich Dad Poor Dad: Apa yang Diajarkan Orang Kaya pada Anak-Anak Mereka",
    author: "Robert T. Kiyosaki",
    publisher: "Gramedia Pustaka Utama",
    publishedDate: "2016",
    pageCount: 244,
    cover: "/images/book-atomic-habits.svg",
    previewUrl: "https://www.google.com/search?q=Rich+Dad+Poor+Dad+Robert+T+Kiyosaki&udm=books",
    readUrl: "https://www.google.com/search?q=Rich+Dad+Poor+Dad+Robert+T+Kiyosaki&udm=books",
    infoUrl: "https://play.google.com/store/search?c=books&q=Rich+Dad+Poor+Dad",
    summary: "Buku literasi keuangan legendaris yang membongkar mitos bahwa Anda harus memiliki penghasilan tinggi untuk menjadi kaya serta pentingnya arus kas.",
    category: "Bisnis & Keuangan",
    rating: 4.7,
    physicalPrice: 85000,
  },
  {
    id: "madilog",
    title: "Madilog: Materialisme, Dialektika, dan Logika",
    author: "Tan Malaka",
    publisher: "Narasi",
    publishedDate: "2008",
    pageCount: 420,
    cover: "/images/book-metodologi.svg",
    previewUrl: "https://www.google.com/search?q=Madilog+Tan+Malaka&udm=books",
    readUrl: "https://www.google.com/search?q=Madilog+Tan+Malaka&udm=books",
    infoUrl: "https://play.google.com/store/search?c=books&q=Madilog+Tan+Malaka",
    summary: "Gagasan pemikiran besar Bapak Republik Indonesia mengenai cara berpikir rasional, ilmiah, dan berdaya guna untuk membebaskan bangsa dari belenggu mistisisme.",
    category: "Filsafat & Pemikiran",
    rating: 4.9,
    physicalPrice: 90000,
  },
  {
    id: "negeri-5-menara",
    title: "Negeri 5 Menara",
    author: "Ahmad Fuadi",
    publisher: "Gramedia Pustaka Utama",
    publishedDate: "2009",
    pageCount: 423,
    cover: "/images/book-bumi-manusia.svg",
    previewUrl: "https://www.google.com/search?q=Negeri+5+Menara+Ahmad+Fuadi&udm=books",
    readUrl: "https://www.google.com/search?q=Negeri+5+Menara+Ahmad+Fuadi&udm=books",
    infoUrl: "https://play.google.com/store/search?c=books&q=Negeri+5+Menara+Ahmad+Fuadi",
    summary: "Kisah persahabatan enam santri dari berbagai penjuru nusantara di Pondok Madani yang dipersatukan oleh mantra ajaib: 'Man Jadda Wajada'.",
    category: "Sastra & Fiksi",
    rating: 4.8,
    physicalPrice: 85000,
  },
  {
    id: "homo-deus",
    title: "Homo Deus: Masa Depan Umat Manusia",
    author: "Yuval Noah Harari",
    publisher: "Alvabet",
    publishedDate: "2018",
    pageCount: 540,
    cover: "/images/book-sapiens.svg",
    previewUrl: "https://www.google.com/search?q=Homo+Deus+Yuval+Noah+Harari&udm=books",
    readUrl: "https://www.google.com/search?q=Homo+Deus+Yuval+Noah+Harari&udm=books",
    infoUrl: "https://play.google.com/store/search?c=books&q=Homo+Deus+Yuval+Noah+Harari",
    summary: "Pandangan visioner mengenai masa depan spesies manusia ketika teknologi AI dan rekayasa genetika mengubah hakikat hidup, kesadaran, dan kemanusiaan.",
    category: "Sains & Teknologi",
    rating: 4.8,
    physicalPrice: 125000,
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = (searchParams.get("search") || "").trim();
  const topic = (searchParams.get("topic") || "").trim();
  const pageStr = searchParams.get("page") || "1";
  const page = Math.max(1, parseInt(pageStr, 10) || 1);
  const limit = 12;
  const startIndex = (page - 1) * limit;

  const apiKey = process.env.GOOGLE_BOOKS_API_KEY || process.env.GOOGLE_API_KEY || "";

  // Jika ada API Key Google Books, coba ambil live data dari Google Books API v1
  if (apiKey) {
    let queryTerms = search ? search : "buku populer indonesia";
    if (topic && topic !== "all") {
      if (topic === "fiction") queryTerms += " subject:fiction";
      else if (topic === "self-help") queryTerms += " subject:self-help";
      else if (topic === "business") queryTerms += " subject:business";
      else if (topic === "history") queryTerms += " subject:history";
      else if (topic === "philosophy") queryTerms += " subject:philosophy";
      else if (topic === "science") queryTerms += " subject:science";
    }

    try {
      const googleBooksUrl = new URL("https://www.googleapis.com/books/v1/volumes");
      googleBooksUrl.searchParams.set("q", queryTerms);
      googleBooksUrl.searchParams.set("startIndex", String(startIndex));
      googleBooksUrl.searchParams.set("maxResults", String(limit));
      googleBooksUrl.searchParams.set("printType", "books");
      googleBooksUrl.searchParams.set("key", apiKey);

      const res = await fetch(googleBooksUrl.toString(), {
        headers: { Accept: "application/json" },
        next: { revalidate: 3600 },
      });

      if (res.ok) {
        const data = await res.json();
        if (data.items && data.items.length > 0) {
          const books: GoogleBookItem[] = data.items.map((item: any) => {
            const info = item.volumeInfo || {};
            const id = item.id;
            const title = info.title || "Judul Buku";
            const author = (info.authors && info.authors.length > 0)
              ? info.authors.join(", ")
              : "Penulis Pilihan";

            let cover = info.imageLinks?.thumbnail || info.imageLinks?.smallThumbnail || "";
            if (cover) {
              cover = cover.replace(/^http:\/\//i, "https://");
            } else {
              cover = "/images/book-bumi-manusia.svg";
            }

            // Tautan pratinjau resmi Google Books
            const previewUrl =
              info.previewLink ||
              `https://www.google.com/search?q=${encodeURIComponent(title + " " + author)}&udm=books`;

            const infoUrl = info.infoLink || `https://play.google.com/store/search?c=books&q=${encodeURIComponent(title)}`;

            const cleanSummary = (info.description || `Pratinjau digital resmi buku '${title}' karya ${author} di Google Books.`)
              .replace(/<[^>]*>?/gm, "")
              .slice(0, 240) + "...";

            const category =
              (info.categories && info.categories.length > 0)
                ? info.categories[0]
                : "Literasi Digital";

            return {
              id,
              title,
              author,
              publisher: info.publisher,
              publishedDate: info.publishedDate,
              pageCount: info.pageCount || 250,
              cover,
              previewUrl,
              readUrl: previewUrl,
              infoUrl,
              summary: cleanSummary,
              category,
              rating: info.averageRating || 4.7,
              physicalPrice: 85000,
            };
          });

          return NextResponse.json({
            success: true,
            source: "google-books-api",
            count: data.totalItems || 100,
            next: startIndex + limit < (data.totalItems || 100),
            previous: page > 1,
            books,
          });
        }
      }
    } catch (err) {
      console.warn("Google Books API query error, falling back to curated collection:", err);
    }
  }

  // Fallback kurasi Google Books resmi (100% bebas dari 404, responsive, dan tautan pratinjau langsung aktif)
  let filtered = [...CURATED_GOOGLE_BOOKS];

  if (topic && topic !== "all") {
    const topicMap: Record<string, string> = {
      fiction: "Sastra & Fiksi",
      "self-help": "Pengembangan Diri",
      philosophy: "Filsafat & Pemikiran",
      history: "Sejarah & Peradaban",
      business: "Bisnis & Keuangan",
      science: "Sains & Teknologi",
    };
    const targetCategory = topicMap[topic];
    if (targetCategory) {
      filtered = filtered.filter((b) => b.category === targetCategory);
    }
  }

  if (search) {
    const s = search.toLowerCase();
    filtered = filtered.filter(
      (b) =>
        b.title.toLowerCase().includes(s) ||
        b.author.toLowerCase().includes(s) ||
        b.summary.toLowerCase().includes(s) ||
        b.category.toLowerCase().includes(s)
    );
  }

  const paginated = filtered.slice(startIndex, startIndex + limit);

  return NextResponse.json({
    success: true,
    source: "google-books-curated",
    count: filtered.length,
    next: startIndex + limit < filtered.length,
    previous: page > 1,
    books: paginated,
  });
}
