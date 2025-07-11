// // // // // // // //////src/app/api/auth/registration/route.ts s
import { NextRequest, NextResponse } from "next/server";
import { registrationController } from "../../services/auth/registration.controller";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Req body", body);

    const res = await registrationController.setOtpApi({
      phone_number: body.phone_number,
      password: body.password,
      name: body.name,
    });

    if (!res) {
      return NextResponse.json(
        { error: "OTP so‘rovi muvaffaqiyatsiz yakunlandi or no response from registration" },
        { status: 500 }
      );
    }

    console.log("RESSSSSSS", res);
    return NextResponse.json(res);
  } catch (error: any) {
    console.error("Registration error caught in route handler:", error.message);
    // Return the error message from the thrown error
    return NextResponse.json(
      { error: error.message || "Serverda xato yuz berdi" },
      { status: 422 } // Changed to 422 as it's typically a client-side data issue
    );
  }
}