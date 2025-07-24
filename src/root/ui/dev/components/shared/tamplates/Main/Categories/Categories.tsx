import { cn } from '@/root/business/lib/utils';
import { MainCategoryItem } from "@/root/ui/dev/components/shared/elements/categories/MainCategoryItem";
import axios from 'axios';
import ServerLink from '../../../elements/Links/ServerLink';
import { CategoriesClient } from './CategoriesClient';
import { fetchCategoryList } from '@/root/business/api/main/category/fetchCategoryList';

interface Props {
    className?: string;
    alt: string
}

interface Category {
    id: number;
    name: string;
    icon: string;
    alt: string
}



export const Categories = async ({ className }: Props) => {
    const categories = await fetchCategoryList();
    console.log(categories);
    

    return (
        <section className={cn(className, "py-4 overflow-x-auto no-scrollbar md:py-6")}>
            <CategoriesClient categories={categories} />
        </section>

    );
};