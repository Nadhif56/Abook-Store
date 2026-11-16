"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import {
  Users,
  Shield,
  FileText,
  Plus,
  Trash2,
  Edit2,
  Search,
  CheckCircle2,
  AlertTriangle,
  Lock,
  LogOut,
  ExternalLink,
  Eye,
  Upload,
  Loader2,
  RefreshCw,
  X,
  ShoppingBag,
  MessageCircle,
  Clock,
  XCircle,
  Receipt,
  Phone,
} from "lucide-react";

interface UserItem {
  id: string;
  name: string;
  email: string;
  role_id: string;
  status: "active" | "inactive";
  created_at: string;
}

interface OrderItem {
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
}

interface RoleItem {
  id: string;
  name: string;
  description: string;
  permissions: string[] | string;
  is_system: boolean;
  created_at: string;
}

interface NewsItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnail_path: string;
  status: "draft" | "published";
  created_at: string;
}

export default function DashboardPage() {
  const router = useRouter();

  // Active Tab: 'orders' | 'users' | 'roles' | 'news'
  const [activeTab, setActiveTab] = useState<"orders" | "users" | "roles" | "news">("orders");

  // Current session user
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Data states
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [users, setUsers] = useState<UserItem[]>([]);
  const [roles, setRoles] = useState<RoleItem[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // Search & Filters
  const [orderSearch, setOrderSearch] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState("all");
  const [userSearch, setUserSearch] = useState("");
  const [newsSearch, setNewsSearch] = useState("");

  // Alerts
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Modals
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [previewNews, setPreviewNews] = useState<NewsItem | null>(null);

  // Form States for Password Change
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Form States for News
  const [editingNewsId, setEditingNewsId] = useState<string | null>(null);
  const [newsTitle, setNewsTitle] = useState("");
  const [newsSlug, setNewsSlug] = useState("");
  const [newsExcerpt, setNewsExcerpt] = useState("");
  const [newsContent, setNewsContent] = useState("");
  const [newsThumbnail, setNewsThumbnail] = useState("");
  const [newsStatus, setNewsStatus] = useState<"draft" | "published">("published");
  const [uploadingImage, setUploadingImage] = useState(false);

  // Form States for Role
  const [roleName, setRoleName] = useState("");
  const [roleDesc, setRoleDesc] = useState("");

  // Load Session and Initial Data
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const meRes = await fetch("/api/auth/me");
      if (!meRes.ok) {
        router.push("/login?redirect=/dashboard");
        return;
      }
      const meData = await meRes.json();
      setCurrentUser(meData.user);

      // Fetch users, roles, news, orders
      const [uRes, rRes, nRes, oRes] = await Promise.all([
        fetch("/api/admin/users"),
        fetch("/api/admin/roles"),
        fetch("/api/admin/news"),
        fetch("/api/admin/orders"),
      ]);

      if (uRes.ok) {
        const u = await uRes.json();
        setUsers(u.users || []);
      }
      if (rRes.ok) {
        const r = await rRes.json();
        setRoles(r.roles || []);
      }
      if (nRes.ok) {
        const n = await nRes.json();
        setNews(n.news || []);
      }
      if (oRes.ok) {
        const o = await oRes.json();
        setOrders(o.orders || []);
      }
    } catch (err: any) {
      setAlert({ type: "error", message: err.message || "Gagal memuat data dashboard." });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  // ================= ORDER HANDLERS (STEP 3) =================
  const handleUpdateOrderStatus = async (
    orderId: string,
    status: "dikonfirmasi" | "dibatalkan"
  ) => {
    const actionText = status === "dikonfirmasi" ? "konfirmasi pembayaran" : "batalkan";
    if (!confirm(`Apakah Anda yakin ingin ${actionText} untuk pesanan #${orderId}?`)) {
      return;
    }

    setActionLoading(true);
    setAlert(null);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status } : o))
      );
      setAlert({
        type: "success",
        message: `Status pesanan #${orderId} berhasil diubah menjadi: ${
          status === "dikonfirmasi" ? "Dikonfirmasi" : "Dibatalkan"
        }.`,
      });
    } catch (err: any) {
      setAlert({ type: "error", message: err.message });
    } finally {
      setActionLoading(false);
    }
  };

  // ================= USER HANDLERS =================
  const handleToggleUserStatus = async (user: UserItem) => {
    const nextStatus = user.status === "active" ? "inactive" : "active";
    setActionLoading(true);
    setAlert(null);
    try {
      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, status: nextStatus } : u))
      );
      setAlert({
        type: "success",
        message: `Status pengguna ${user.name} berhasil diubah menjadi ${nextStatus}.`,
      });
    } catch (err: any) {
      setAlert({ type: "error", message: err.message });
    } finally {
      setActionLoading(false);
    }
  };

  const handleChangeUserRole = async (user: UserItem, newRole: string) => {
    setActionLoading(true);
    setAlert(null);
    try {
      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role_id: newRole }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, role_id: newRole } : u))
      );
      setAlert({
        type: "success",
        message: `Role pengguna ${user.name} berhasil diubah menjadi ${newRole}.`,
      });
    } catch (err: any) {
      setAlert({ type: "error", message: err.message });
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteUser = async (user: UserItem) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus pengguna "${user.name}"?`)) return;
    setActionLoading(true);
    setAlert(null);
    try {
      const res = await fetch(`/api/admin/users/${user.id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setUsers((prev) => prev.filter((u) => u.id !== user.id));
      setAlert({ type: "success", message: `Pengguna ${user.name} berhasil dihapus.` });
    } catch (err: any) {
      setAlert({ type: "error", message: err.message });
    } finally {
      setActionLoading(false);
    }
  };

  // ================= ROLE HANDLERS =================
  const handleCreateRole = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roleName) return;
    setActionLoading(true);
    setAlert(null);
    try {
      const res = await fetch("/api/admin/roles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: roleName,
          description: roleDesc,
          permissions: ["read", "custom"],
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setRoles((prev) => [...prev, data.role]);
      setShowRoleModal(false);
      setRoleName("");
      setRoleDesc("");
      setAlert({ type: "success", message: `Role "${roleName}" berhasil ditambahkan.` });
    } catch (err: any) {
      setAlert({ type: "error", message: err.message });
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteRole = async (role: RoleItem) => {
    if (!confirm(`Hapus role "${role.name}"?`)) return;
    setActionLoading(true);
    setAlert(null);
    try {
      const res = await fetch(`/api/admin/roles/${role.id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setRoles((prev) => prev.filter((r) => r.id !== role.id));
      setAlert({ type: "success", message: `Role ${role.name} berhasil dihapus.` });
    } catch (err: any) {
      setAlert({ type: "error", message: err.message });
    } finally {
      setActionLoading(false);
    }
  };

  // ================= NEWS HANDLERS =================
  const handleOpenAddNews = () => {
    setEditingNewsId(null);
    setNewsTitle("");
    setNewsSlug("");
    setNewsExcerpt("");
    setNewsContent("");
    setNewsThumbnail("");
    setNewsStatus("published");
    setShowNewsModal(true);
  };

  const handleOpenEditNews = (item: NewsItem) => {
    setEditingNewsId(item.id);
    setNewsTitle(item.title);
    setNewsSlug(item.slug);
    setNewsExcerpt(item.excerpt);
    setNewsContent(item.content);
    setNewsThumbnail(item.thumbnail_path);
    setNewsStatus(item.status);
    setShowNewsModal(true);
  };

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setAlert(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setNewsThumbnail(data.path);
      setAlert({
        type: "success",
        message: `Media lokal berhasil diunggah ke ${data.path}`,
      });
    } catch (err: any) {
      setAlert({ type: "error", message: err.message || "Gagal mengunggah foto." });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSaveNews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsTitle || !newsContent) {
      setAlert({ type: "error", message: "Judul dan konten artikel wajib diisi." });
      return;
    }

    setActionLoading(true);
    setAlert(null);

    try {
      const payload = {
        title: newsTitle,
        slug: newsSlug,
        excerpt: newsExcerpt,
        content: newsContent,
        thumbnail_path: newsThumbnail,
        status: newsStatus,
      };

      if (editingNewsId) {
        const res = await fetch(`/api/admin/news/${editingNewsId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);

        setNews((prev) =>
          prev.map((n) => (n.id === editingNewsId ? { ...n, ...data.news } : n))
        );
        setAlert({ type: "success", message: "Artikel berita berhasil diperbarui." });
      } else {
        const res = await fetch("/api/admin/news", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);

        setNews((prev) => [data.news, ...prev]);
        setAlert({ type: "success", message: "Artikel berita baru berhasil diterbitkan." });
      }

      setShowNewsModal(false);
    } catch (err: any) {
      setAlert({ type: "error", message: err.message });
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteNews = async (item: NewsItem) => {
    if (!confirm(`Hapus artikel "${item.title}"?`)) return;
    setActionLoading(true);
    setAlert(null);
    try {
      const res = await fetch(`/api/admin/news/${item.id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setNews((prev) => prev.filter((n) => n.id !== item.id));
      setAlert({ type: "success", message: "Artikel berhasil dihapus." });
    } catch (err: any) {
      setAlert({ type: "error", message: err.message });
    } finally {
      setActionLoading(false);
    }
  };

  // ================= CHANGE PASSWORD HANDLER =================
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    setAlert(null);

    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oldPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setShowPasswordModal(false);
      setOldPassword("");
      setNewPassword("");
      setAlert({
        type: "success",
        message: "Kata sandi admin berhasil diubah dengan aman!",
      });
    } catch (err: any) {
      setAlert({ type: "error", message: err.message });
    } finally {
      setActionLoading(false);
    }
  };

  // Filtered lists
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  const filteredNews = news.filter((n) =>
    n.title.toLowerCase().includes(newsSearch.toLowerCase())
  );

  const filteredOrders = orders.filter((o) => {
    const query = orderSearch.toLowerCase();
    const matchesSearch =
      o.id.toLowerCase().includes(query) ||
      o.recipient_name.toLowerCase().includes(query) ||
      o.book_title.toLowerCase().includes(query) ||
      o.phone.includes(query);
    const matchesStatus =
      orderStatusFilter === "all" || o.status === orderStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="min-h-screen bg-paper-canvas text-on-surface">
      {/* Top Navbar Header */}
      <header className="sticky top-0 z-40 bg-paper-canvas border-b border-paper-border px-4 sm:px-6 lg:px-8 py-3.5 shadow-subtle flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Logo size="sm" />
          </Link>
          <span className="hidden sm:inline-block px-2.5 py-1 rounded-md bg-espresso-deep text-ivory-bright text-xs font-semibold">
            Admin Panel
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/"
            target="_blank"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-paper-border bg-surface-container text-xs font-semibold text-espresso-deep hover:bg-surface-container-high transition-colors"
          >
            <span>Lihat Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            type="button"
            onClick={() => setShowPasswordModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-paper-border text-xs font-semibold text-espresso-deep hover:bg-surface-container transition-colors"
          >
            <Lock className="w-3.5 h-3.5 text-terracotta" />
            <span className="hidden sm:inline">Ganti Sandi</span>
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold border border-rose-200 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Security Alert Banner for Weak Admin Password */}
        <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs sm:text-sm font-bold">
                Pemberitahuan Keamanan Kredensial Bawaan
              </p>
              <p className="text-xs text-amber-800 mt-0.5">
                Akun administrator menggunakan kata sandi awal (<code>123456</code>). Sangat disarankan mengganti kata sandi sebelum proyek dipublikasikan ke production.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowPasswordModal(true)}
            className="shrink-0 px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors shadow-sm self-start sm:self-center"
          >
            Ubah Sandi Sekarang
          </button>
        </div>

        {/* Global Alert Notification */}
        {alert && (
          <div
            className={`mb-6 p-4 rounded-2xl text-xs sm:text-sm flex items-center justify-between shadow-subtle ${
              alert.type === "success"
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                : "bg-rose-50 text-rose-800 border border-rose-200"
            }`}
          >
            <div className="flex items-center gap-2">
              {alert.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              )}
              <span>{alert.message}</span>
            </div>
            <button
              onClick={() => setAlert(null)}
              className="text-secondary hover:text-espresso-deep"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Tabs Bar */}
        <div className="flex items-center justify-between border-b border-paper-border mb-8 overflow-x-auto">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              type="button"
              onClick={() => setActiveTab("orders")}
              className={`flex items-center gap-2 py-3 px-3 sm:px-4 border-b-2 text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === "orders"
                  ? "border-terracotta text-espresso-deep"
                  : "border-transparent text-secondary hover:text-espresso-deep"
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Pesanan Masuk</span>
              <span className="ml-1 px-1.5 py-0.5 rounded-full bg-surface-container text-[11px]">
                {orders.length}
              </span>
              {orders.filter((o) => o.status === "menunggu_konfirmasi").length > 0 && (
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("users")}
              className={`flex items-center gap-2 py-3 px-3 sm:px-4 border-b-2 text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === "users"
                  ? "border-terracotta text-espresso-deep"
                  : "border-transparent text-secondary hover:text-espresso-deep"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Manajemen Pengguna</span>
              <span className="ml-1 px-1.5 py-0.5 rounded-full bg-surface-container text-[11px]">
                {users.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("roles")}
              className={`flex items-center gap-2 py-3 px-3 sm:px-4 border-b-2 text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === "roles"
                  ? "border-terracotta text-espresso-deep"
                  : "border-transparent text-secondary hover:text-espresso-deep"
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>Manajemen Role</span>
              <span className="ml-1 px-1.5 py-0.5 rounded-full bg-surface-container text-[11px]">
                {roles.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("news")}
              className={`flex items-center gap-2 py-3 px-3 sm:px-4 border-b-2 text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === "news"
                  ? "border-terracotta text-espresso-deep"
                  : "border-transparent text-secondary hover:text-espresso-deep"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>CRUD Berita & Artikel</span>
              <span className="ml-1 px-1.5 py-0.5 rounded-full bg-surface-container text-[11px]">
                {news.length}
              </span>
            </button>
          </div>

          <button
            type="button"
            onClick={fetchData}
            title="Muat Ulang Data"
            className="p-2 rounded-lg text-secondary hover:text-espresso-deep hover:bg-surface-container transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          </button>
        </div>

        {/* TAB 0: ORDERS MANAGEMENT (STEP 3) */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative w-full sm:w-72">
                  <input
                    type="text"
                    placeholder="Cari tiket, pembeli, buku..."
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-paper-subtle/50 border border-paper-border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-terracotta"
                  />
                  <Search className="w-4 h-4 text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
                  {["all", "menunggu_konfirmasi", "dikonfirmasi", "dibatalkan"].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setOrderStatusFilter(st)}
                      className={`px-3 py-2 rounded-xl font-semibold capitalize whitespace-nowrap transition-all ${
                        orderStatusFilter === st
                          ? "bg-espresso-deep text-ivory-bright shadow-subtle"
                          : "bg-paper-canvas hover:bg-surface-container border border-paper-border text-secondary"
                      }`}
                    >
                      {st === "all" ? "Semua Status" : st.replace("_", " ")}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-xs text-secondary">
                Total: <strong>{filteredOrders.length}</strong> pesanan
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-paper-subtle/40 rounded-2xl border border-paper-border overflow-hidden shadow-subtle">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-surface-container text-espresso-deep font-serif font-bold border-b border-paper-border">
                    <tr>
                      <th className="px-5 py-3.5">Kode Tiket & Tanggal</th>
                      <th className="px-5 py-3.5">Pembeli & Pengiriman</th>
                      <th className="px-5 py-3.5">Buku & Total Tagihan</th>
                      <th className="px-5 py-3.5">Status Pembayaran</th>
                      <th className="px-5 py-3.5 text-right">Aksi Verifikasi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-paper-border/60">
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-5 py-12 text-center text-secondary">
                          <ShoppingBag className="w-8 h-8 text-secondary/40 mx-auto mb-2" />
                          <span>Belum ada tiket pesanan yang cocok dengan kriteria.</span>
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((ord) => {
                        const isPending = ord.status === "menunggu_konfirmasi";
                        const isConfirmed = ord.status === "dikonfirmasi";
                        const isCancelled = ord.status === "dibatalkan";

                        const cleanedPhone = ord.phone.replace(/[^0-9]/g, "");
                        const waLink = `https://wa.me/${cleanedPhone.startsWith("0") ? "62" + cleanedPhone.slice(1) : cleanedPhone}?text=${encodeURIComponent(
                          `Halo Kak ${ord.recipient_name}, kami dari Admin Abook Store Bogor Timur mengonfirmasi pesanan #${ord.id} (${ord.book_title}).`
                        )}`;

                        return (
                          <tr key={ord.id} className="hover:bg-surface-container-low transition-colors">
                            <td className="px-5 py-4 align-top">
                              <span className="font-mono font-bold text-espresso-deep block">
                                #{ord.id}
                              </span>
                              <span className="text-[11px] text-secondary">
                                {new Date(ord.created_at).toLocaleDateString("id-ID", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </td>

                            <td className="px-5 py-4 align-top max-w-xs">
                              <div className="font-bold text-espresso-deep">
                                {ord.recipient_name}
                              </div>
                              <div className="text-secondary text-xs flex items-center gap-1 mt-0.5">
                                <Phone className="w-3 h-3 text-terracotta" />
                                <span>{ord.phone}</span>
                              </div>
                              <div className="text-[11px] text-secondary mt-1 line-clamp-2" title={ord.address}>
                                {ord.address}
                              </div>
                              {ord.notes && (
                                <div className="text-[10px] text-terracotta italic mt-1">
                                  Catatan: &ldquo;{ord.notes}&rdquo;
                                </div>
                              )}
                            </td>

                            <td className="px-5 py-4 align-top">
                              <div className="font-serif font-bold text-espresso-deep">
                                {ord.book_title}
                              </div>
                              <div className="text-secondary text-xs">
                                {ord.quantity} pcs × {formatRupiah(ord.price_per_unit)}
                              </div>
                              <div className="font-bold text-terracotta text-sm mt-1">
                                {formatRupiah(ord.total_amount)}
                              </div>
                            </td>

                            <td className="px-5 py-4 align-top">
                              {isPending && (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                                  <Clock className="w-3 h-3" />
                                  <span>Menunggu Konfirmasi</span>
                                </span>
                              )}
                              {isConfirmed && (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                                  <CheckCircle2 className="w-3 h-3" />
                                  <span>Dikonfirmasi</span>
                                </span>
                              )}
                              {isCancelled && (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800">
                                  <XCircle className="w-3 h-3" />
                                  <span>Dibatalkan</span>
                                </span>
                              )}
                            </td>

                            <td className="px-5 py-4 align-top text-right">
                              <div className="flex flex-col items-end gap-1.5">
                                {isPending && (
                                  <div className="flex items-center gap-1">
                                    <button
                                      type="button"
                                      disabled={actionLoading}
                                      onClick={() => handleUpdateOrderStatus(ord.id, "dikonfirmasi")}
                                      className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-sm disabled:opacity-50"
                                      title="Konfirmasi Pembayaran QRIS"
                                    >
                                      Konfirmasi
                                    </button>
                                    <button
                                      type="button"
                                      disabled={actionLoading}
                                      onClick={() => handleUpdateOrderStatus(ord.id, "dibatalkan")}
                                      className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold transition-colors disabled:opacity-50"
                                      title="Batalkan / Tolak Pesanan"
                                    >
                                      Batalkan
                                    </button>
                                  </div>
                                )}

                                <a
                                  href={waLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 hover:underline mt-1"
                                >
                                  <MessageCircle className="w-3 h-3" />
                                  <span>Hubungi via WA</span>
                                </a>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 1: USERS MANAGEMENT */}
        {activeTab === "users" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <input
                  type="text"
                  placeholder="Cari nama atau email..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-paper-subtle/50 border border-paper-border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-terracotta"
                />
                <Search className="w-4 h-4 text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
              <div className="text-xs text-secondary">
                Menampilkan <strong>{filteredUsers.length}</strong> pengguna
              </div>
            </div>

            {/* Users Table */}
            <div className="bg-paper-subtle/40 rounded-2xl border border-paper-border overflow-hidden shadow-subtle">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-surface-container text-espresso-deep font-serif font-bold border-b border-paper-border">
                    <tr>
                      <th className="px-5 py-3.5">Nama & Email</th>
                      <th className="px-5 py-3.5">Peran (Role)</th>
                      <th className="px-5 py-3.5">Status</th>
                      <th className="px-5 py-3.5">Tanggal Daftar</th>
                      <th className="px-5 py-3.5 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-paper-border/60">
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-5 py-12 text-center text-secondary">
                          Tidak ada data pengguna yang cocok.
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((u) => {
                        const isSelf = currentUser?.id === u.id;
                        return (
                          <tr key={u.id} className="hover:bg-surface-container-low transition-colors">
                            <td className="px-5 py-4">
                              <div className="font-bold text-espresso-deep flex items-center gap-2">
                                <span>{u.name}</span>
                                {isSelf && (
                                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                                    Anda
                                  </span>
                                )}
                              </div>
                              <div className="text-secondary text-xs">{u.email}</div>
                            </td>
                            <td className="px-5 py-4">
                              <select
                                value={u.role_id}
                                disabled={isSelf || actionLoading}
                                onChange={(e) => handleChangeUserRole(u, e.target.value)}
                                className="px-2.5 py-1 rounded-lg border border-paper-border bg-paper-canvas text-xs font-semibold text-espresso-deep disabled:opacity-60 focus:outline-none focus:ring-1 focus:ring-terracotta"
                              >
                                {roles.map((r) => (
                                  <option key={r.id} value={r.name}>
                                    {r.name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td className="px-5 py-4">
                              <span
                                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                                  u.status === "active"
                                    ? "bg-emerald-100 text-emerald-800"
                                    : "bg-rose-100 text-rose-800"
                                }`}
                              >
                                {u.status === "active" ? "Aktif" : "Nonaktif"}
                              </span>
                            </td>
                            <td className="px-5 py-4 text-secondary text-xs">
                              {new Date(u.created_at).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </td>
                            <td className="px-5 py-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleToggleUserStatus(u)}
                                  disabled={isSelf || actionLoading}
                                  title={u.status === "active" ? "Nonaktifkan Akun" : "Aktifkan Akun"}
                                  className="px-2.5 py-1 rounded-lg border border-paper-border text-xs font-semibold hover:bg-surface-container disabled:opacity-40 transition-colors"
                                >
                                  {u.status === "active" ? "Nonaktifkan" : "Aktifkan"}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteUser(u)}
                                  disabled={isSelf || actionLoading}
                                  title="Hapus Akun Pengguna"
                                  className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 disabled:opacity-40 transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ROLES MANAGEMENT */}
        {activeTab === "roles" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-lg text-espresso-deep">
                  Daftar Hak Akses (Role)
                </h3>
                <p className="text-xs text-secondary">
                  Role bawaan bertanda sistem tidak dapat dihapus untuk keamanan aplikasi.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowRoleModal(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-espresso-deep hover:bg-olive-umber text-ivory-bright text-xs font-bold transition-all shadow-subtle"
              >
                <Plus className="w-4 h-4 text-terracotta" />
                <span>Tambah Role</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {roles.map((r) => (
                <div
                  key={r.id}
                  className="p-6 rounded-2xl bg-paper-subtle/50 border border-paper-border flex flex-col justify-between shadow-subtle"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-serif font-bold text-base text-espresso-deep uppercase tracking-wider">
                        {r.name}
                      </span>
                      {r.is_system ? (
                        <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-espresso-deep text-[10px] font-bold border border-paper-border">
                          System
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">
                          Custom
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-secondary leading-relaxed mb-4">
                      {r.description || "Tidak ada deskripsi tambahan."}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-paper-border/60 flex items-center justify-between">
                    <span className="text-[11px] text-secondary">
                      ID: <code>{r.id}</code>
                    </span>
                    {!r.is_system && (
                      <button
                        type="button"
                        onClick={() => handleDeleteRole(r)}
                        className="text-xs text-rose-600 hover:text-rose-800 font-bold"
                      >
                        Hapus
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: NEWS & ARTICLES CRUD */}
        {activeTab === "news" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <input
                  type="text"
                  placeholder="Cari artikel..."
                  value={newsSearch}
                  onChange={(e) => setNewsSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-paper-subtle/50 border border-paper-border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-terracotta"
                />
                <Search className="w-4 h-4 text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
              </div>

              <button
                type="button"
                onClick={handleOpenAddNews}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-espresso-deep hover:bg-olive-umber text-ivory-bright text-xs font-bold transition-all shadow-card"
              >
                <Plus className="w-4 h-4 text-terracotta" />
                <span>Tulis Berita Baru</span>
              </button>
            </div>

            {/* News List Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNews.length === 0 ? (
                <div className="col-span-full py-16 text-center bg-paper-subtle/30 rounded-2xl border border-paper-border text-secondary text-sm">
                  Belum ada artikel berita. Klik tombol <strong>Tulis Berita Baru</strong> di atas untuk membuat artikel.
                </div>
              ) : (
                filteredNews.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col bg-paper-subtle/50 border border-paper-border rounded-2xl overflow-hidden shadow-subtle hover:shadow-card transition-all"
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-[16/9] bg-surface-container overflow-hidden">
                      <img
                        src={item.thumbnail_path || "/images/news-festival.svg"}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/images/news-festival.svg";
                        }}
                      />
                      <span
                        className={`absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          item.status === "published"
                            ? "bg-emerald-600 text-white"
                            : "bg-neutral-600 text-white"
                        }`}
                      >
                        {item.status === "published" ? "Published" : "Draft"}
                      </span>
                    </div>

                    {/* Content Body */}
                    <div className="p-5 flex flex-col flex-1 justify-between">
                      <div>
                        <h4 className="font-serif font-bold text-sm sm:text-base text-espresso-deep mb-2 line-clamp-2">
                          {item.title}
                        </h4>
                        <p className="text-xs text-secondary line-clamp-2 leading-relaxed mb-4">
                          {item.excerpt || item.content}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-paper-border/60 flex items-center justify-between">
                        <span className="text-[11px] text-secondary">
                          {new Date(item.created_at).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => setPreviewNews(item)}
                            title="Pratinjau Artikel"
                            className="p-1.5 rounded-lg text-secondary hover:text-espresso-deep hover:bg-surface-container"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenEditNews(item)}
                            title="Edit Artikel"
                            className="p-1.5 rounded-lg text-secondary hover:text-terracotta hover:bg-surface-container"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteNews(item)}
                            title="Hapus Artikel"
                            className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </main>

      {/* MODAL 1: GANTI PASSWORD ADMIN */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso-deep/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-paper-canvas w-full max-w-md rounded-2xl border border-paper-border shadow-2xl p-6">
            <div className="flex items-center justify-between pb-4 border-b border-paper-border mb-4">
              <h3 className="font-serif font-bold text-lg text-espresso-deep flex items-center gap-2">
                <Lock className="w-5 h-5 text-terracotta" />
                <span>Ganti Kata Sandi Admin</span>
              </h3>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="text-secondary hover:text-espresso-deep"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-espresso-deep mb-1">
                  Kata Sandi Lama (Saat Ini)
                </label>
                <input
                  type="password"
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Masukkan kata sandi saat ini"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-paper-border text-sm focus:outline-none focus:ring-2 focus:ring-terracotta"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-espresso-deep mb-1">
                  Kata Sandi Baru
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimal 6 karakter yang kuat"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-paper-border text-sm focus:outline-none focus:ring-2 focus:ring-terracotta"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-4 py-2 rounded-xl border border-paper-border text-xs font-semibold hover:bg-surface-container"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-5 py-2 rounded-xl bg-espresso-deep hover:bg-olive-umber text-ivory-bright text-xs font-bold shadow-subtle disabled:opacity-60"
                >
                  {actionLoading ? "Menyimpan..." : "Simpan Kata Sandi"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: FORM CREATE / EDIT NEWS */}
      {showNewsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso-deep/60 backdrop-blur-sm overflow-y-auto animate-in fade-in">
          <div className="bg-paper-canvas w-full max-w-2xl rounded-2xl border border-paper-border shadow-2xl p-6 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-paper-border mb-4">
              <h3 className="font-serif font-bold text-lg text-espresso-deep">
                {editingNewsId ? "Edit Artikel Berita" : "Tulis Artikel Berita Baru"}
              </h3>
              <button
                onClick={() => setShowNewsModal(false)}
                className="text-secondary hover:text-espresso-deep"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNews} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-espresso-deep mb-1">
                  Judul Artikel *
                </label>
                <input
                  type="text"
                  required
                  value={newsTitle}
                  onChange={(e) => setNewsTitle(e.target.value)}
                  placeholder="Contoh: Abook Store Menambah 500 Judul Baru"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-paper-border text-sm focus:outline-none focus:ring-2 focus:ring-terracotta"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-espresso-deep mb-1">
                  Ringkasan Singkat (Excerpt)
                </label>
                <textarea
                  rows={2}
                  value={newsExcerpt}
                  onChange={(e) => setNewsExcerpt(e.target.value)}
                  placeholder="Ringkasan 1-2 kalimat untuk kartu depan"
                  className="w-full px-3.5 py-2 rounded-xl border border-paper-border text-sm focus:outline-none focus:ring-2 focus:ring-terracotta"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-espresso-deep mb-1">
                  Konten Lengkap Artikel *
                </label>
                <textarea
                  rows={6}
                  required
                  value={newsContent}
                  onChange={(e) => setNewsContent(e.target.value)}
                  placeholder="Tuliskan isi berita atau resensi secara detail..."
                  className="w-full px-3.5 py-2 rounded-xl border border-paper-border text-sm focus:outline-none focus:ring-2 focus:ring-terracotta"
                />
              </div>

              {/* Upload Media Lokal */}
              <div>
                <label className="block text-xs font-semibold text-espresso-deep mb-1">
                  Gambar Sampul (Thumbnail)
                </label>
                <div className="flex items-center gap-4">
                  <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-dashed border-terracotta bg-surface-container hover:bg-surface-container-high text-xs font-bold text-espresso-deep transition-colors">
                    <Upload className="w-4 h-4 text-terracotta" />
                    <span>
                      {uploadingImage ? "Mengunggah..." : "Unggah Gambar Lokal"}
                    </span>
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      className="hidden"
                      onChange={handleUploadImage}
                      disabled={uploadingImage}
                    />
                  </label>
                  <span className="text-xs text-secondary">atau gunakan URL gambar:</span>
                </div>
                <input
                  type="text"
                  value={newsThumbnail}
                  onChange={(e) => setNewsThumbnail(e.target.value)}
                  placeholder="https://... atau /uploads/..."
                  className="w-full mt-2 px-3.5 py-2 rounded-xl border border-paper-border text-xs focus:outline-none focus:ring-2 focus:ring-terracotta"
                />
                {newsThumbnail && (
                  <div className="mt-2 w-32 aspect-[16/9] rounded-lg overflow-hidden border border-paper-border bg-surface-container">
                    <img
                      src={newsThumbnail}
                      alt="Pratinjau thumbnail"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/images/news-festival.svg";
                      }}
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-espresso-deep mb-1">
                  Status Publikasi
                </label>
                <select
                  value={newsStatus}
                  onChange={(e: any) => setNewsStatus(e.target.value)}
                  className="px-3.5 py-2 rounded-xl border border-paper-border text-xs font-semibold text-espresso-deep bg-paper-canvas focus:outline-none focus:ring-2 focus:ring-terracotta"
                >
                  <option value="published">Terbitkan Langsung (Published)</option>
                  <option value="draft">Simpan Sebagai Draf (Draft)</option>
                </select>
              </div>

              <div className="pt-4 flex justify-end gap-2 border-t border-paper-border">
                <button
                  type="button"
                  onClick={() => setShowNewsModal(false)}
                  className="px-4 py-2 rounded-xl border border-paper-border text-xs font-semibold hover:bg-surface-container"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-5 py-2 rounded-xl bg-espresso-deep hover:bg-olive-umber text-ivory-bright text-xs font-bold shadow-subtle disabled:opacity-60"
                >
                  {actionLoading ? "Menyimpan..." : "Simpan Artikel"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: TAMBAH ROLE */}
      {showRoleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso-deep/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-paper-canvas w-full max-w-md rounded-2xl border border-paper-border shadow-2xl p-6">
            <div className="flex items-center justify-between pb-4 border-b border-paper-border mb-4">
              <h3 className="font-serif font-bold text-lg text-espresso-deep">
                Tambah Role Baru
              </h3>
              <button
                onClick={() => setShowRoleModal(false)}
                className="text-secondary hover:text-espresso-deep"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateRole} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-espresso-deep mb-1">
                  Nama Role *
                </label>
                <input
                  type="text"
                  required
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                  placeholder="Contoh: editor / kurator"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-paper-border text-sm focus:outline-none focus:ring-2 focus:ring-terracotta"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-espresso-deep mb-1">
                  Deskripsi Singkat
                </label>
                <textarea
                  rows={3}
                  value={roleDesc}
                  onChange={(e) => setRoleDesc(e.target.value)}
                  placeholder="Jelaskan wewenang role ini..."
                  className="w-full px-3.5 py-2 rounded-xl border border-paper-border text-sm focus:outline-none focus:ring-2 focus:ring-terracotta"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowRoleModal(false)}
                  className="px-4 py-2 rounded-xl border border-paper-border text-xs font-semibold hover:bg-surface-container"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-5 py-2 rounded-xl bg-espresso-deep hover:bg-olive-umber text-ivory-bright text-xs font-bold shadow-subtle disabled:opacity-60"
                >
                  {actionLoading ? "Menyimpan..." : "Buat Role"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: PRATINJAU BERITA */}
      {previewNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso-deep/60 backdrop-blur-sm overflow-y-auto animate-in fade-in">
          <div className="bg-paper-canvas w-full max-w-2xl rounded-2xl border border-paper-border shadow-2xl p-6 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-paper-border mb-4">
              <span className="text-xs uppercase tracking-wider font-bold text-secondary">
                Pratinjau Artikel
              </span>
              <button
                onClick={() => setPreviewNews(null)}
                className="text-secondary hover:text-espresso-deep"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {previewNews.thumbnail_path && (
                <div className="aspect-[16/9] rounded-xl overflow-hidden bg-surface-container">
                  <img
                    src={previewNews.thumbnail_path}
                    alt={previewNews.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/images/news-festival.svg";
                    }}
                  />
                </div>
              )}
              <h2 className="font-serif font-bold text-xl sm:text-2xl text-espresso-deep leading-tight">
                {previewNews.title}
              </h2>
              <div className="text-xs text-secondary">
                Status: <strong>{previewNews.status}</strong> | Dibuat:{" "}
                {new Date(previewNews.created_at).toLocaleDateString("id-ID")}
              </div>
              <p className="text-sm font-semibold text-secondary leading-relaxed bg-surface-container p-3.5 rounded-xl border border-paper-border">
                {previewNews.excerpt}
              </p>
              <div className="text-sm text-espresso-deep leading-relaxed whitespace-pre-line pt-2">
                {previewNews.content}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-paper-border flex justify-end">
              <button
                type="button"
                onClick={() => setPreviewNews(null)}
                className="px-5 py-2 rounded-xl bg-espresso-deep text-ivory-bright text-xs font-bold"
              >
                Tutup Pratinjau
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

