import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug'); // Slug ni so'rovdan olish

    if (!slug) {
        return NextResponse.json({ success: false, error: 'Slug is required' }, { status: 400 });
    }

    try {
        const response = await axios.get(`https://cdn.masterium.uz/api/v1/masters/users/by-category/?slug=${slug}&limit=20&offset=0`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return NextResponse.json(response.data);
    } catch (error) {
        console.error('Error fetching masters:', error);
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}