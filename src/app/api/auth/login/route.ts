// src/app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { loginApi, getAccessToken, getRefreshToken, getAuthType } from "../../services/auth/login.controller"
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Login request body:", body);

    const res = await loginApi(body);

    if (!res) {
      return NextResponse.json(
        { error: "Login yoki OTP so'rovi muvaffaqiyatsiz yakunlandi" },
        { status: 500 }
      );
    }

    console.log("Login response:", res);
    const response = NextResponse.json(res);

    // Tokenlarni faqat `otp` holatida saqlash
    if (body.req_type === "otp") {

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


      return response;
    }

    console.log("RETURN RESPONSE")

    return response;
  } catch (error: any) {
    console.error("Login error caught in route handler:", error.message);
    return NextResponse.json(
      { error: error.message || "Kirishda xato yuz berdi" },
      { status: error.response?.status || 500 }
    );
  }
}