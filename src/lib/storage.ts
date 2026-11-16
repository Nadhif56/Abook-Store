import fs from "fs/promises";
import path from "path";

/**
 * Storage Abstraction Module
 * Default: Local filesystem in public/uploads (development)
 * Readily swappable to Vercel Blob / Cloudinary / GCS in Step 4
 */
export async function saveFile(
  fileBuffer: Buffer,
  originalFilename: string
): Promise<{ path: string; filename: string }> {
  const uploadsDir = path.join(process.cwd(), "public", "uploads");

  try {
    await fs.mkdir(uploadsDir, { recursive: true });
  } catch {
    // Directory already exists or permissions handled
  }

  const ext = path.extname(originalFilename).toLowerCase() || ".jpg";
  const sanitizedName = originalFilename
    .replace(/[^a-zA-Z0-9.-]/g, "-")
    .replace(/\.[^/.]+$/, "");
  const uniqueFilename = `${Date.now()}-${sanitizedName}${ext}`;
  const fullPath = path.join(uploadsDir, uniqueFilename);

  await fs.writeFile(fullPath, fileBuffer);

  return {
    path: `/uploads/${uniqueFilename}`,
    filename: uniqueFilename,
  };
}

export async function deleteFile(filePath: string): Promise<boolean> {
  try {
    if (!filePath.startsWith("/uploads/")) {
      return false;
    }
    const filename = path.basename(filePath);
    const fullPath = path.join(process.cwd(), "public", "uploads", filename);
    await fs.unlink(fullPath);
    return true;
  } catch {
    return false;
  }
}

