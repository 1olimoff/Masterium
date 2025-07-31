import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userUuid, slug, workTitle, category, definition, priceFrom, paymentType } = body;

    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}api/v1/offer-work`, {
      user_uuid: userUuid,
      slug: slug,
      work_title: workTitle,
      category: category,
      definition: definition,
      price_from: priceFrom,
      payment_type: paymentType,
    }, {
      headers: { 'Content-Type': 'application/json' },
    });

    return NextResponse.json({ success: true, data: response.data });
  } catch (error) {
    console.error('Error submitting offer:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}