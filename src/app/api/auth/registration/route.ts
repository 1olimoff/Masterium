// // // // // // // //////src/app/api/auth/registration/route.ts s
import { NextRequest, NextResponse } from "next/server";
import { registrationController } from "../../services/auth/registration.controller";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Req body", body);

    const res = await registrationController.setOtpApi(body);

    if (!res) {
      return NextResponse.json(
        { error: "OTP so‘rovi muvaffaqiyatsiz yakunlandi or no response from registration" },
        { status: 500 }
      );
    }

    console.log("RESSSSSSS", res);
    const response = NextResponse.json(res);

    if (body.req_type == "otp") {
      response.cookies.set('accessToken', registrationController.accessToken, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production', // HTTPS busa qushsa boladi
        sameSite: 'lax', // CSRF
        maxAge: 60 * 15, // 15 минут
        path: '/', // Бутун доменга доступ
      });

      response.cookies.set('refreshToken', registrationController.refreshToken, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production', //  HTTPS busa qushsa boladi
        sameSite: 'lax',
        maxAge: 15 * 24 * 60 * 60, // 15 дней
        path: '/',
      });

      response.cookies.set("authType", registrationController.authType, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production', //  HTTPS busa qushsa boladi
        sameSite: 'lax',
        maxAge: 15 * 24 * 60 * 60, // 15 дней
        path: '/',
      })

      return response;
    }

    return response;


  } catch (error: any) {
    console.error("Registration error caught in route handler:", error.message);
    // Return the error message from the thrown error
    return NextResponse.json(
      error
    );
  }
}