import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const URL_REFRESH = "https://cdn.masterium.uz/api/v1/auth/refresh/";

export async function POST(req: NextRequest) {
  try {
    // 1. Cookiedan refresh tokenni olish
    const refreshToken = req.cookies.get("refreshToken")?.value;
    if (!refreshToken) {
      console.log("❌ Refresh token topilmadi");
      return NextResponse.json(
        { success: false, error: "missing_refresh", message: "Refresh token mavjud emas" },
        { status: 401 }
      );
    }
    console.log("🔍 Refresh token:", refreshToken);

    // 2. Backendga so‘rov yuborish
    const response = await axios.post(URL_REFRESH, { refresh: refreshToken });
    const data = response.data;
    console.log("🔄 Backend javobi:", data);

    // 3. Javobni tekshirish
    if (!data.success || !data.access_token) {
      console.log("❌ Backend xatosi: access_token topilmadi");
      return NextResponse.json(
        { success: false, error: "invalid_refresh", message: "Refresh token yaroqsiz" },
        { status: 401 }
      );
    }

    // 4. Yangi accessTokenni cookiega o‘rnatish
    const nextResponse = NextResponse.json({
      success: true,
      access_token: data.access_token,
    });

    nextResponse.cookies.set("accessToken", data.access_token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 15 * 60, // 15 daqiqa
      path: "/",
    });

    console.log("✅ Yangi access token o‘rnatildi:", data.access_token);
    return nextResponse;
  } catch (error: any) {
    console.error("❌ Xato:", error.message);
    return NextResponse.json(
      { success: false, error: "server_error", message: "Serverda xato yuz berdi" },
      { status: 500 }
    );
  }
}