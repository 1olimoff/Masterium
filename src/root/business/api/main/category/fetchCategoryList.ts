import axios from 'axios';
import { cache } from 'react';

interface Category {
  id: number;
  name: string;
  icon: string;
  slug: string;
}

interface FetchOptions {
  next?: {
    revalidate?: number;
  };
}

export const fetchCategoryList = cache(async (options: FetchOptions = {}): Promise<Category[]> => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/category/search/`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response?.data?.results || [];
  } catch (error) {
    console.error('Fetch categories failed:', error);
    return [];
  }
});