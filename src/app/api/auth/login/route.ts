import { NextRequest, NextResponse } from "next/server";
import { loginApi, getAccessToken, getRefreshToken, getAuthType } from "../../services/auth/login.controller";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("🔍 Login request body:", body);

    const res = await loginApi(body);
    console.log("🔄 Login API response:", res);

    if (!res) {
      console.error("❌ Login API returned no response");
      return NextResponse.json(
        {
          success: false,
          error: "no_response",
          message: "Login yoki OTP so'rovi muvaffaqiyatsiz yakunlandi",
        },
        { status: 500 }
      );
    }

    if (!res.success) {
      console.error("❌ Login failed:", res);
      return NextResponse.json(
        {
          success: false,
          error: res.error || "invalid_credentials",
          message: res.message || "Telefon raqami yoki parol noto‘g‘ri",
        },
        { status: 401 }
      );
    }

    const response = NextResponse.json(res);

    if (body.req_type === "otp" && res.access_token) {
      const accessToken = getAccessToken();
      const refreshToken = getRefreshToken();
      const authType = getAuthType();
      console.log("✅ Setting cookies:", { accessToken, refreshToken, authType });

      if (!refreshToken) {
        console.error("❌ No refresh token returned from getRefreshToken");
        return NextResponse.json(
          {
            success: false,
            error: "no_refresh_token",
            message: "Refresh token olinmadi",
          },
          { status: 500 }
        );
      }

      response.cookies.set("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 15, // 15 minutes
        path: "/",
      });
      response.cookies.set("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 15 * 24 * 60 * 60, // 15 days
        path: "/",
      });
      response.cookies.set("authType", authType, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 15 * 24 * 60 * 60, // 15 days
        path: "/",
      });
    }

    return response;
  } catch (error: any) {
    console.error("❌ Login endpoint error:", error.message, error.stack);
    return NextResponse.json(
      {
        success: false,
        error: error.code || "server_error",
        message: error.message || "Kirishda xato yuz berdi",
      },
      { status: error.response?.status || 500 }
    );
  }
}