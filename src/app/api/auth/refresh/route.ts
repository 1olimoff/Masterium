import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // 1. Cookie’dan refresh token olish
    const refreshToken = req.cookies.get("refreshToken")?.value;
    if (!refreshToken) {
      return NextResponse.json(
        { success: false, error: "missing_refresh", message: "Refresh token mavjud emas" },
        { status: 401 }
      );
    }

    const res = await fetch("https://cdn.masterium.uz/api/v1/auth/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh_token: refreshToken, // faqat refresh yuboramiz
      }),
    });

    const data = await res.json();

    // 3. Agar backend xato qaytarsa
    if (!res.ok || !data.access || !data.refresh) {
      return NextResponse.json(
        { success: false, error: "invalid_refresh", message: "Refresh token yaroqsiz yoki eskirgan", detail: data },
        { status: 401 }
      );
    }

    // 4. Yangi cookie yozib yuborish
    const response = NextResponse.json({
      success: true,
      access_token: data.access,
      refresh_token: data.refresh,
    });

    response.cookies.set("accessToken", data.access, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 15, // 15 daqiqa
      path: "/",
    });

    response.cookies.set("refreshToken", data.refresh, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 15 * 24 * 60 * 60, // 15 kun
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Refresh error:", error.message);
    return NextResponse.json(
      { success: false, error: "server_error", message: error.message || "Serverda xatolik" },
      { status: 500 }
    );
  }
}
