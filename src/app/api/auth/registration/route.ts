import { NextRequest, NextResponse } from "next/server";
import { setOtpApi, getAccessToken, getRefreshToken, getAuthType } from "@/app/api/services/auth/registration.controller";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Registration request body:", body);

    const res = await setOtpApi(body);

    if (!res) {
      return NextResponse.json(
        { success: false, error: "no_response", message: "OTP so'rovi muvaffaqiyatsiz yakunlandi" },
        { status: 500 }
      );
    }

    if (!res.success) {
      return NextResponse.json(
        { success: false, error: res.error || "user_exists", message: res.message || "Bu telefon raqami allaqachon ro‘yxatdan o‘tgan" },
        { status: 400 }
      );
    }

    const response = NextResponse.json(res);

    if (body.req_type === "otp" && res.access_token) {
      response.cookies.set("accessToken", getAccessToken(), {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 15, // 15 daqiqa
        path: "/",
      });
      response.cookies.set("refreshToken", getRefreshToken(), {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 15 * 24 * 60 * 60, // 15 kun
        path: "/",
      });
      response.cookies.set("authType", getAuthType(), {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 15 * 24 * 60 * 60, // 15 kun
        path: "/",
      });
    }

    return response;
  } catch (error: any) {
    console.error("Registration error caught in route handler:", error.message);
    return NextResponse.json(
      { success: false, error: error.code || "server_error", message: error.message || "Ro‘yxatdan o‘tishda xato yuz berdi" },
      { status: error.response?.status || 500 }
    );
  }
}