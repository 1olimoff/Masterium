 // src/app/api/auth/registration/route.ts
import { getAccessToken, getAuthType, getRefreshToken, setOtpApi } from "@/app/api/services/auth/registration.controller";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        console.log("Req body", body);

        const res = await setOtpApi(body);

        if (!res) {
            return NextResponse.json(
                { error: "OTP so'rovi muvaffaqiyatsiz yakunlandi yoki ro'yxatdan o'tish javobi yo'q" },
                { status: 500 }
            );
        }

        console.log("RESSSSSSS", res);
        const response = NextResponse.json(res);

        if (body.req_type === "otp") {
            response.cookies.set('accessToken', getAccessToken(), {
                httpOnly: true,
                sameSite: 'lax',
                maxAge: 60 * 15, // 15 daqiqa
                path: '/',
            });

            response.cookies.set('refreshToken', getRefreshToken(), {
                httpOnly: true,
                sameSite: 'lax',
                maxAge: 15 * 24 * 60 * 60, // 15 kun
                path: '/',
            });

            response.cookies.set("authType", getAuthType(), {
                httpOnly: true,
                sameSite: 'lax',
                maxAge: 15 * 24 * 60 * 60, // 15 kun
                path: '/',
            });

            return response;
        }

        return response;
    } catch (error: any) {
        console.error("Registration error caught in route handler:", error.message);
        return NextResponse.json(
            { error: error.message || "Ro‘yxatdan o‘tishda xato yuz berdi" },
            { status: error.response?.status || 500 }
        );
    }
}