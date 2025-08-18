"use client";

import { useEffect } from "react";

export default function ClientWrapper() {
  useEffect(() => {
    console.log("✅ ClientWrapper ishladi (token auto-refresh boshlangan)");

    const refresh = async () => {
      try {
        const res = await fetch("/api/auth/refresh", {
          method: "POST",
          credentials: "include", // cookie yuborilishi uchun
        });

        const data = await res.json();
        if (!res.ok) {
          console.error("❌ Refresh error:", data);
        } else {
          console.log("🔄 Token yangilandi:", data);
        }
      } catch (err) {
        console.error("❌ Refresh fetch error:", err);
      }
    };

    // ⚡ darrov refresh qilib olamiz (agar eski access token muddati tugagan bo‘lsa)
    refresh();

    // 🔄 keyin har 14 daqiqa interval qo‘yiladi
    const interval = setInterval(refresh, 1000 * 60 * 14);

    return () => clearInterval(interval);
  }, []);

  return null;
}
