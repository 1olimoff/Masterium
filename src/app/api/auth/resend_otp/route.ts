import { NextRequest, NextResponse } from "next/server";
import { resendOtpApi } from "../../services/auth/resend_otp.controller";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { phone_number, req_type } = body;

    if (req_type !== "resend_otp" || !phone_number) {
      return NextResponse.json(
        { error: "Telefon nomeri majburiy!" },
        { status: 400 }
      );
    }

    const res = await resendOtpApi({ phone_number, req_type });

    if (!res) {
      return NextResponse.json(
        { error: "Uzur, server bilan bir nima bo'ldi. Qayta takrorlang" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: "Yangi kod jo‘natildi, iltimos, telefoningizni tekshiring!" });
  } catch (error: any) {
    console.error("Resend OTP error:", error.message);
    return NextResponse.json(
      { error: "Uzur, server bilan bir nima bo'ldi. Qayta takrorlang" },
      { status: 500 }
    );
  }
}