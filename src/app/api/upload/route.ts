import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { saveFile } from "@/lib/storage";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE_BYTES = 4 * 1024 * 1024; // 4MB

export async function POST(request: Request) {
  try {
    const session = await getCurrentUser();
    if (!session) {
      return NextResponse.json(
        { error: "Sesi login diperlukan untuk mengunggah media." },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "Tidak ada file yang diunggah." },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Format file tidak didukung. Harap unggah file JPG, PNG, atau WebP." },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json(
        { error: "Ukuran file terlalu besar. Maksimal ukuran adalah 4MB." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const saved = await saveFile(buffer, file.name);

    return NextResponse.json({
      success: true,
      path: saved.path,
      filename: saved.filename,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Gagal mengunggah file media." },
      { status: 500 }
    );
  }
}

