import { NextRequest, NextResponse } from "next/server";
import { getAccessToken,getAuthType,getRefreshToken, setOtpApi } from "../../services/auth/registration.controller";
// import { getAccessToken, getRefreshToken, setOtpApi } from "../../services/auth/registration.controller";


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Registration request body:", body);

    const res = await setOtpApi(body);

    if (!res) {
      return NextResponse.json(
        { success: false, error: "no_response", message: "So'rov muvaffaqiyatsiz yakunlandi" },
        { status: 500 }
      );
    }

    if (!res.success) {
      return NextResponse.json(
        { success: false, error: res.error, message: res.message },
        { status: 400 }
      );
    }

    const response = NextResponse.json(res);

    if (body.req_type === "otp" && res.access_token) {
      response.cookies.set("accessToken", getAccessToken(), {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 15 * 60, // 15 minutes
        path: "/",
      });
      response.cookies.set("refreshToken", getRefreshToken(), {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 15 * 24 * 60 * 60, // 15 days
        path: "/",
      });
      response.cookies.set("authType", getAuthType(), {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 15 * 24 * 60 * 60, // 15 days
        path: "/",
      });
    }

    return response;
  } catch (error: any) {
    console.error("Registration error:", error.message);
    return NextResponse.json(
      {
        success: false,
        error: error.code || "server_error",
        message: error.message || "Ro‘yxatdan o‘tishda xato yuz berdi",
      },
      { status: error.response?.status || 500 }
    );
  }
}