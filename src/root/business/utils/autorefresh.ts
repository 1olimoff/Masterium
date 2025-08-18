// utils/autoRefresh.ts
export const startAutoRefresh = () => {
    setInterval(async () => {
      try {
        const res = await fetch("/api/auth/refresh", { method: "POST" });
        const data = await res.json();
        if (data.success) {
          console.log("✅ Token yangilandi");
        } else {
          console.warn("⚠️ Token yangilamadi:", data.message);
        }
      } catch (err) {
        console.error("❌ Refresh so'rovida xato:", err);
      }
    }, 1000 * 60 * 14); // 14 daqiqa
  };
  