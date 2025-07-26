// components/shared/elements/categories/Categories.tsx faylida

import Head from 'next/head'; // Head ni import qilish
import { cn } from '@/root/business/lib/utils';
import { CategoriesClient } from './CategoriesClient';
import { fetchCategoryList } from '@/root/business/api/main/category/fetchCategoryList';

interface Props {
    className?: string;
}

interface Category {
    id: number;
    name: string;
    icon: string;
    slug: string;
}

export const Categories = async ({ className }: Props) => {
    const categories: Category[] = await fetchCategoryList();

    
    return (
        <section className={cn(className, "py-4 overflow-x-auto no-scrollbar md:py-6")}>
            <Head>
                {categories.map((category) => (
                    <link
                        key={`preload-${category.id}`}
                        rel="preload"
                        href={`${process.env.NEXT_PUBLIC_BASE_URL}${category.icon}`}
                        as="image"
                        type="image/svg" 
                        crossOrigin="anonymous" 
                    />
                ))}
            </Head>
            <CategoriesClient categories={categories} />
        </section>
    );
};