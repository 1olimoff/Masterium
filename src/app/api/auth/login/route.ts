import { NextRequest, NextResponse } from "next/server";
import { loginApi, getAccessToken, getRefreshToken, getAuthType } from "../../services/auth/login.controller";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Login request body:", body);

    const res = await loginApi(body);

    if (!res) {
      return NextResponse.json(
        { success: false, error: "no_response", message: "Login yoki OTP so'rovi muvaffaqiyatsiz yakunlandi" },
        { status: 500 }
      );
    }

    if (!res.success) {
      return NextResponse.json(
        { success: false, error: res.error || "invalid_credentials", message: res.message || "Telefon raqami yoki parol noto‘g‘ri" },
        { status: 401 }
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
    console.error("Login error caught in route handler:", error.message);
    return NextResponse.json(
      { success: false, error: error.code || "server_error", message: error.message || "Kirishda xato yuz berdi" },
      { status: error.response?.status || 500 }
    );
  }
}