// src/app/api/v1/write_review/review/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Received feedback data:", body);    

    const response = await axios.post(`${process.env.BASE_URL}api/v1/write_review/review/`, body, {
      headers: { "Content-Type": "application/json" },
    });


    return NextResponse.json(
      { success: true, data: response.data, message: "Feedback muvaffaqiyatli yuborildi" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error processing feedback:", error.message);
    if (error.response) {
      return NextResponse.json(
        { success: false, error: error.response.data.message || "Server xatosi" },
        { status: error.response.status }
      );
    }
    return NextResponse.json(
      { success: false, error: "Feedback yuborishda xatolik yuz berdi" },
      { status: 500 }
    );
  }
}