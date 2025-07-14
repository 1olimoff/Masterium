import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { phone_number, req_type } = body;

    if (req_type !== "resend_otp" || !phone_number) {
      return NextResponse.json(
        { error: "Invalid request: phone_number and req_type required" },
        { status: 400 }
      );
    }

    // Bu yerda OTP qayta jo‘natish logikasini qo‘shing
    // Masalan, SMS xizmatiga so‘rov yuborish yoki ma‘lumotlar bazasida yangi OTP generatsiya qilish
    console.log(`Resending OTP to ${phone_number}`);

    // Muvaffaqiyatli javob
    return NextResponse.json({ success: true, message: "OTP resent successfully" });
  } catch (error: any) {
    console.error("Resend OTP error:", error.message);
    return NextResponse.json(
      { error: error.message || "Failed to resend OTP" },
      { status: 500 }
    );
  }
}