import { v4 as uuidv4 } from "uuid";

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  is_system: boolean;
  created_at: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  role_id: string;
  status: "active" | "inactive";
  created_at: string;
  updated_at: string;
}

export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnail_path: string;
  status: "draft" | "published";
  author_id: string;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  book_id: string;
  book_title: string;
  quantity: number;
  price_per_unit: number;
  total_amount: number;
  recipient_name: string;
  phone: string;
  address: string;
  notes: string;
  status: "menunggu_konfirmasi" | "dikonfirmasi" | "dibatalkan";
  created_at: string;
  updated_at: string;
}

// In-Memory Global Store for Development Fallback
declare global {
  var __abookLocalDb:
    | {
        roles: Role[];
        users: User[];
        news: NewsItem[];
        orders: Order[];
      }
    | undefined;
}

function getLocalStore() {
  if (!global.__abookLocalDb) {
    const now = new Date().toISOString();
    global.__abookLocalDb = {
      roles: [
        {
          id: "role-admin",
          name: "admin",
          description: "Administrator Utama dengan hak akses penuh",
          permissions: ["all"],
          is_system: true,
          created_at: now,
        },
        {
          id: "role-user",
          name: "user",
          description: "Pelanggan / Pengguna terdaftar",
          permissions: ["read", "profile", "orders"],
          is_system: true,
          created_at: now,
        },
      ],
      users: [
        {
          id: "usr-admin-initial",
          name: "Administrator Abook",
          email: "admin@gmail.com",
          password_hash:
            "$2a$10$HFuJqx80NYFFjs.r2UeTR.mozfZHgy7FhBAxP9fo4o7SJGYrH2Sji", // bcrypt hash for '123456'
          role_id: "admin",
          status: "active",
          created_at: now,
          updated_at: now,
        },
      ],
      news: [
        {
          id: "news-1",
          title: "Abook Store Hadir di Kawasan Bogor Timur: Membawa Akses Buku Murah Berkualitas",
          slug: "abook-store-hadir-di-bogor-timur",
          excerpt:
            "Kini pencinta literasi di kawasan Cileungsi, Jonggol, dan sekitarnya tak perlu repot mencari toko buku lengkap dan terjangkau.",
          content:
            "Abook Store resmi menyapa pembaca di Bogor Timur. Dengan visi mendekatkan literasi ke setiap rumah, kami menyediakan ribuan judul mulai dari fiksi, self-improvement, hingga buku pelajaran sekolah dengan potongan harga istimewa.",
          thumbnail_path: "/images/news-festival.svg",
          status: "published",
          author_id: "usr-admin-initial",
          created_at: now,
          updated_at: now,
        },
        {
          id: "news-2",
          title: "5 Rekomendasi Buku Pengembangan Diri untuk Memulai Kebiasaan Baru",
          slug: "5-rekomendasi-buku-pengembangan-diri",
          excerpt:
            "Ingin membangun rutinitas produktif dan kestabilan emosi? Simak 5 kurasi buku wajib baca pilihan tim kurator Abook Store.",
          content:
            "Membaca buku pengembangan diri bukan sekadar mencari motivasi sesaat, melainkan menemukan sistem dan pola pikir yang dapat diaplikasikan setiap hari untuk kemajuan hidup.",
          thumbnail_path: "/images/news-self-improvement.svg",
          status: "published",
          author_id: "usr-admin-initial",
          created_at: now,
          updated_at: now,
        },
      ],
      orders: [],
    };
  }
  return global.__abookLocalDb;
}

async function callAppsScript(payload: {
  action: string;
  table: string;
  data?: any;
  id?: string;
  query?: any;
}) {
  const url = process.env.APPS_SCRIPT_URL;
  const secret = process.env.APPS_SCRIPT_SECRET;

  if (!url || !url.startsWith("http")) {
    return null; // Gunakan fallback database lokal
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, secret }),
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Apps Script responded with HTTP ${res.status}`);
    }

    const json = await res.json();
    if (!json.success) {
      throw new Error(json.error || "Apps Script returned an error");
    }
    return json.data;
  } catch (err) {
    console.warn("Apps Script fetch error, falling back to local DB:", err);
    return null;
  }
}

// ================= USER OPERATIONS =================
export async function getUsers(): Promise<User[]> {
  const remote = await callAppsScript({ action: "list", table: "Users" });
  if (remote) return remote;
  return getLocalStore().users;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const normalized = email.trim().toLowerCase();
  const remote = await callAppsScript({
    action: "get",
    table: "Users",
    query: { email: normalized },
  });
  if (remote) return remote;

  const user = getLocalStore().users.find(
    (u) => u.email.toLowerCase() === normalized
  );
  return user || null;
}

export async function getUserById(id: string): Promise<User | null> {
  const remote = await callAppsScript({
    action: "get",
    table: "Users",
    id,
  });
  if (remote) return remote;

  const user = getLocalStore().users.find((u) => u.id === id);
  return user || null;
}

export async function createUser(
  data: Omit<User, "id" | "created_at" | "updated_at">
): Promise<User> {
  const now = new Date().toISOString();
  const newUser: User = {
    ...data,
    email: data.email.trim().toLowerCase(),
    id: `usr-${uuidv4().slice(0, 8)}`,
    created_at: now,
    updated_at: now,
  };

  const remote = await callAppsScript({
    action: "create",
    table: "Users",
    data: newUser,
  });
  if (remote) return remote;

  getLocalStore().users.push(newUser);
  return newUser;
}

export async function updateUser(
  id: string,
  updates: Partial<Omit<User, "id" | "created_at">>
): Promise<User> {
  const remote = await callAppsScript({
    action: "update",
    table: "Users",
    id,
    data: updates,
  });
  if (remote) return remote;

  const store = getLocalStore();
  const index = store.users.findIndex((u) => u.id === id);
  if (index === -1) throw new Error("Pengguna tidak ditemukan.");

  store.users[index] = {
    ...store.users[index],
    ...updates,
    updated_at: new Date().toISOString(),
  };
  return store.users[index];
}

export async function deleteUser(id: string): Promise<boolean> {
  const remote = await callAppsScript({
    action: "delete",
    table: "Users",
    id,
  });
  if (remote) return true;

  const store = getLocalStore();
  store.users = store.users.filter((u) => u.id !== id);
  return true;
}

// ================= ROLE OPERATIONS =================
export async function getRoles(): Promise<Role[]> {
  const remote = await callAppsScript({ action: "list", table: "Roles" });
  if (remote) return remote;
  return getLocalStore().roles;
}

export async function createRole(
  data: Omit<Role, "id" | "created_at">
): Promise<Role> {
  const newRole: Role = {
    ...data,
    id: `role-${data.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
    created_at: new Date().toISOString(),
  };

  const remote = await callAppsScript({
    action: "create",
    table: "Roles",
    data: newRole,
  });
  if (remote) return remote;

  getLocalStore().roles.push(newRole);
  return newRole;
}

export async function updateRole(
  id: string,
  updates: Partial<Omit<Role, "id" | "created_at" | "is_system">>
): Promise<Role> {
  const remote = await callAppsScript({
    action: "update",
    table: "Roles",
    id,
    data: updates,
  });
  if (remote) return remote;

  const store = getLocalStore();
  const index = store.roles.findIndex((r) => r.id === id);
  if (index === -1) throw new Error("Role tidak ditemukan.");
  if (store.roles[index].is_system) {
    throw new Error("Role sistem tidak boleh diubah namanya.");
  }

  store.roles[index] = {
    ...store.roles[index],
    ...updates,
  };
  return store.roles[index];
}

export async function deleteRole(id: string): Promise<boolean> {
  const store = getLocalStore();
  const target = store.roles.find((r) => r.id === id);
  if (target?.is_system) {
    throw new Error("Role sistem tidak boleh dihapus.");
  }

  const remote = await callAppsScript({
    action: "delete",
    table: "Roles",
    id,
  });
  if (remote) return true;

  store.roles = store.roles.filter((r) => r.id !== id);
  return true;
}

// ================= NEWS OPERATIONS =================
export async function getNews(publishedOnly = false): Promise<NewsItem[]> {
  const remote = await callAppsScript({ action: "list", table: "News" });
  const allNews: NewsItem[] = remote || getLocalStore().news;

  if (publishedOnly) {
    return allNews.filter((n) => n.status === "published");
  }
  return allNews;
}

export async function getNewsById(id: string): Promise<NewsItem | null> {
  const remote = await callAppsScript({
    action: "get",
    table: "News",
    id,
  });
  if (remote) return remote;

  const item = getLocalStore().news.find((n) => n.id === id);
  return item || null;
}

export async function createNews(
  data: Omit<NewsItem, "id" | "created_at" | "updated_at">
): Promise<NewsItem> {
  const now = new Date().toISOString();
  const newNews: NewsItem = {
    ...data,
    id: `news-${uuidv4().slice(0, 8)}`,
    created_at: now,
    updated_at: now,
  };

  const remote = await callAppsScript({
    action: "create",
    table: "News",
    data: newNews,
  });
  if (remote) return remote;

  getLocalStore().news.unshift(newNews);
  return newNews;
}

export async function updateNews(
  id: string,
  updates: Partial<Omit<NewsItem, "id" | "created_at">>
): Promise<NewsItem> {
  const remote = await callAppsScript({
    action: "update",
    table: "News",
    id,
    data: updates,
  });
  if (remote) return remote;

  const store = getLocalStore();
  const index = store.news.findIndex((n) => n.id === id);
  if (index === -1) throw new Error("Berita tidak ditemukan.");

  store.news[index] = {
    ...store.news[index],
    ...updates,
    updated_at: new Date().toISOString(),
  };
  return store.news[index];
}

export async function deleteNews(id: string): Promise<boolean> {
  const remote = await callAppsScript({
    action: "delete",
    table: "News",
    id,
  });
  if (remote) return true;

  const store = getLocalStore();
  store.news = store.news.filter((n) => n.id !== id);
  return true;
}

// ================= ORDER OPERATIONS (STEP 3) =================
export async function getOrders(userId?: string): Promise<Order[]> {
  const query = userId ? { user_id: userId } : undefined;
  const remote = await callAppsScript({
    action: "list",
    table: "Orders",
    query,
  });

  const allOrders: Order[] = remote || getLocalStore().orders;

  if (userId) {
    return allOrders.filter((o) => o.user_id === userId);
  }
  return allOrders;
}

export async function getOrderById(id: string): Promise<Order | null> {
  const remote = await callAppsScript({
    action: "get",
    table: "Orders",
    id,
  });
  if (remote) return remote;

  const item = getLocalStore().orders.find((o) => o.id === id);
  return item || null;
}

export async function createOrder(
  data: Omit<Order, "id" | "status" | "created_at" | "updated_at">
): Promise<Order> {
  const now = new Date().toISOString();
  // Buat kode tiket unik: misal ORD-20261116-A8F2
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randStr = uuidv4().slice(0, 4).toUpperCase();
  const newOrder: Order = {
    ...data,
    id: `ORD-${dateStr}-${randStr}`,
    status: "menunggu_konfirmasi",
    created_at: now,
    updated_at: now,
  };

  const remote = await callAppsScript({
    action: "create",
    table: "Orders",
    data: newOrder,
  });
  if (remote) return remote;

  getLocalStore().orders.unshift(newOrder);
  return newOrder;
}

export async function updateOrderStatus(
  id: string,
  status: "menunggu_konfirmasi" | "dikonfirmasi" | "dibatalkan",
  notes?: string
): Promise<Order> {
  const updates: any = {
    status,
    updated_at: new Date().toISOString(),
  };
  if (notes !== undefined) {
    updates.notes = notes;
  }

  const remote = await callAppsScript({
    action: "update",
    table: "Orders",
    id,
    data: updates,
  });
  if (remote) return remote;

  const store = getLocalStore();
  const index = store.orders.findIndex((o) => o.id === id);
  if (index === -1) throw new Error("Pesanan tidak ditemukan.");

  store.orders[index] = {
    ...store.orders[index],
    ...updates,
  };
  return store.orders[index];
}


