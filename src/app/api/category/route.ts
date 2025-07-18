import { NextResponse } from 'next/server';
import axios from 'axios';
import { fetchCategoryList } from '@/root/business/api/main/category/fetchCategoryList';

export async function GET() {
    try {
        const response = await fetchCategoryList();
        return NextResponse.json(response.data);
    } catch (error) {
        console.error('Error fetching categories:', error);
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}