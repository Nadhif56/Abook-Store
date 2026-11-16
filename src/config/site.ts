export interface BookItem {
  id: string;
  title: string;
  author: string;
  category: "Fiksi" | "Non-Fiksi" | "Pengembangan Diri" | "Edukasi" | "Sastra";
  price: number;
  originalPrice?: number;
  rating: number;
  coverImage: string;
  description: string;
  isPopular?: boolean;
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  thumbnail: string;
  category: string;
}

export const siteConfig = {
  name: "Abook Store",
  tagline: "Toko Buku Kurasi & Literasi Pilihan",
  businessSector: "Ritel & Perdagangan Buku (Toko Buku Fisik & Online)",
  description:
    "Abook Store adalah toko buku yang menyediakan beragam koleksi bacaan berkualitas—mulai dari novel fiksi, non-fiksi, buku pengembangan diri, buku edukasi, hingga koleksi buku bacaan pilihan dengan harga yang sangat terjangkau di kawasan Bogor Timur (Cileungsi/Jonggol).",
  location: "Kawasan Bogor Timur (Cileungsi / Jonggol), Jawa Barat, Indonesia",
  address: "Jl. Raya Cileungsi - Jonggol, Bogor Timur, Jawa Barat 16820",
  whatsapp: "081234567890",
  whatsappFormatted: "+62 812-3456-7890",
  email: "halo@abookstore.id",
  openingHours: "Senin - Minggu: 09:00 - 21:00 WIB",
  googleMapsLink: "https://maps.app.goo.gl/abookstore",
  googleMapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63432.362301395646!2d106.95890414863281!3d-6.455263000000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69971e64f89019%3A0xa9d7bfa98c68ab5b!2sToko%20Buku%20Bekas%20Indonesia%20Membaca!5e0!3m2!1sid!2sid!4v1794466998224!5m2!1sid!2sid",
  socials: {
    instagram: "https://instagram.com/abookstore.id",
    shopee: "https://shopee.co.id/abookstore",
    tokopedia: "https://tokopedia.com/abookstore",
  },
  stats: [
    { value: "5.000+", label: "Judul Kurasi" },
    { value: "100%", label: "Buku Asli & Berkualitas" },
    { value: "Rp 25rb+", label: "Harga Sangat Terjangkau" },
    { value: "Nusantara", label: "Pengiriman Cepat" },
  ],
  services: [
    {
      id: "koleksi-kurasi",
      title: "Koleksi Kurasi & Harga Terjangkau",
      description:
        "Ribuan judul buku pilihan dari penerbit terbaik: fiksi terlaris, non-fiksi mendalam, hingga buku edukasi dengan harga yang ramah kantong bagi pelajar, mahasiswa, dan keluarga.",
      icon: "BookOpen",
    },
    {
      id: "pengiriman-nusantara",
      title: "Pengiriman Cepat Seluruh Indonesia",
      description:
        "Pemesanan online diproses cepat dengan pengemasan berlapis bubble wrap tebal dan kardus pelindung sehingga buku sampai dalam kondisi mulus di mana pun Anda berada.",
      icon: "Truck",
    },
    {
      id: "toko-fisik-bogor",
      title: "Toko Buku Fisik Nyaman & Hangat",
      description:
        "Rasakan pengalaman memilih buku langsung di toko kami di Bogor Timur. Suasana tenang bernuansa kayu hangat yang nyaman untuk membolak-balik halaman.",
      icon: "Store",
    },
    {
      id: "titip-cari-buku",
      title: "Pencarian Judul Khusus (Request Buku)",
      description:
        "Mencari judul langka, cetakan lama, atau buku teks tertentu? Tim Abook Store siap membantu melacak dan menyediakannya untuk Anda.",
      icon: "SearchCheck",
    },
    {
      id: "donasi-komunitas",
      title: "Program Donasi & Pojok Literasi",
      description:
        "Kami aktif mendukung kemajuan literasi daerah dengan menyediakan paket hemat buku untuk taman bacaan masyarakat, sekolah, dan perpustakaan desa.",
      icon: "HeartHandshake",
    },
    {
      id: "layanan-ramah",
      title: "Rekomendasi Personal yang Ramah",
      description:
        "Bingung ingin membaca apa berikutnya? Konsultasikan minat baca Anda kepada kami untuk mendapatkan rekomendasi buku terbaik yang sesuai selera.",
      icon: "Sparkles",
    },
  ],
  sampleBooks: [
    {
      id: "buku-1",
      title: "Filosofi Teras: Hidup Tenang Tanpa Beban",
      author: "Henry Manampiring",
      category: "Pengembangan Diri",
      price: 68000,
      originalPrice: 98000,
      rating: 4.9,
      coverImage: "/images/book-filosofi-teras.svg",
      description: "Penerapan filsafat Stoisisme kuno untuk menghadapi kekhawatiran dan stres kehidupan modern.",
      isPopular: true,
    },
    {
      id: "buku-2",
      title: "Bumi Manusia",
      author: "Pramoedya Ananta Toer",
      category: "Sastra",
      price: 75000,
      originalPrice: 110000,
      rating: 5.0,
      coverImage: "/images/book-bumi-manusia.svg",
      description: "Kisah epik Minke dan Annelies dalam pergulatan harga diri anak bangsa di era kolonial.",
      isPopular: true,
    },
    {
      id: "buku-3",
      title: "Atomic Habits: Perubahan Kecil yang Memberikan Hasil Luar Biasa",
      author: "James Clear",
      category: "Pengembangan Diri",
      price: 72000,
      originalPrice: 108000,
      rating: 4.9,
      coverImage: "/images/book-atomic-habits.svg",
      description: "Strategi terbukti membangun kebiasaan baik dan menghilangkan kebiasaan buruk setiap hari.",
      isPopular: true,
    },
    {
      id: "buku-4",
      title: "Laut Bercerita",
      author: "Leila S. Chudori",
      category: "Fiksi",
      price: 65000,
      originalPrice: 95000,
      rating: 4.8,
      coverImage: "/images/book-laut-bercerita.svg",
      description: "Novel menggugah tentang kehilangan, keberanian aktivis mahasiswa, dan cinta keluarga yang tak lekang waktu.",
      isPopular: false,
    },
    {
      id: "buku-5",
      title: "Sapiens: Riwayat Singkat Umat Manusia",
      author: "Yuval Noah Harari",
      category: "Non-Fiksi",
      price: 85000,
      originalPrice: 135000,
      rating: 4.9,
      coverImage: "/images/book-sapiens.svg",
      description: "Menelusuri evolusi homo sapiens dari kera tak berarti hingga menjadi penguasa planet bumi.",
      isPopular: false,
    },
    {
      id: "buku-6",
      title: "Metodologi Penelitian & Penulisan Ilmiah Praktis",
      author: "Prof. Dr. Soepomo",
      category: "Edukasi",
      price: 45000,
      originalPrice: 65000,
      rating: 4.7,
      coverImage: "/images/book-metodologi.svg",
      description: "Panduan lengkap dan praktis bagi pelajar dan mahasiswa dalam menyusun skripsi dan karya ilmiah.",
      isPopular: false,
    },
  ],
  news: [
    {
      id: "news-1",
      title: "Abook Store Hadir di Kawasan Bogor Timur: Membawa Akses Buku Murah Berkualitas",
      slug: "abook-store-hadir-di-bogor-timur",
      excerpt: "Kini pencinta literasi di kawasan Cileungsi, Jonggol, dan sekitarnya tak perlu repot mencari toko buku lengkap dan terjangkau.",
      content: "Abook Store resmi menyapa pembaca di Bogor Timur. Dengan visi mendekatkan literasi ke setiap rumah, kami menyediakan ribuan judul mulai dari fiksi, self-improvement, hingga buku pelajaran sekolah dengan potongan harga istimewa.",
      author: "Redaksi Abook",
      date: "10 November 2026",
      thumbnail: "/images/news-festival.svg",
      category: "Kabar Toko",
    },
    {
      id: "news-2",
      title: "5 Rekomendasi Buku Pengembangan Diri untuk Memulai Kebiasaan Baru",
      slug: "5-rekomendasi-buku-pengembangan-diri",
      excerpt: "Ingin membangun rutinitas produktif dan kestabilan emosi? Simak 5 kurasi buku wajib baca pilihan tim kurator Abook Store.",
      content: "Membaca buku pengembangan diri bukan sekadar mencari motivasi sesaat, melainkan menemukan sistem dan pola pikir yang dapat diaplikasikan setiap hari...",
      author: "Kurator Buku",
      date: "04 November 2026",
      thumbnail: "/images/news-self-improvement.svg",
      category: "Resensi & Wawasan",
    },
    {
      id: "news-3",
      title: "Tips Memilih Buku Cerita yang Tepat untuk Menumbuhkan Minat Baca Anak",
      slug: "tips-memilih-buku-cerita-anak",
      excerpt: "Membangun kecintaan membaca sejak dini membutuhkan pendekatan visual dan bahasa yang relevan bagi buah hati.",
      content: "Anak-anak menyukai cerita dengan ilustrasi yang hidup dan narasi yang hangat. Di Abook Store, kami mengelompokkan buku anak berdasarkan usia agar orang tua mudah memilih.",
      author: "Tim Edukasi",
      date: "28 Oktober 2026",
      thumbnail: "/images/news-children-books.svg",
      category: "Edukasi Literasi",
    },
  ],
};
