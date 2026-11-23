"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EbooksRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/#katalog");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-paper-canvas text-espresso-deep">
      <div className="text-center p-6">
        <p className="text-base font-serif font-bold text-espresso-deep mb-1">
          Katalog Buku Abook Store
        </p>
        <p className="text-xs text-secondary">
          Mengalihkan ke katalog buku toko fisik & online...
        </p>
      </div>
    </div>
  );
}
