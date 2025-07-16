import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
    try {
        const response = await axios.get(`${process.env.BASE_URL}api/v1/category/`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return NextResponse.json(response.data);
    } catch (error) {
        console.error('Error fetching categories:', error);
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}