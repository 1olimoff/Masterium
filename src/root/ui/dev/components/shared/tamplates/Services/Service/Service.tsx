import React from 'react';
import { cn } from '@/root/business/lib/utils';
import { Title } from './Title/Title';
import { List } from "@/root/ui/dev/components/shared/tamplates/Services/Service/List/List";
import { AdGrid } from '../../../elements/advertising/AdGrid';
import { MobileBackTab } from './Title/MobileTabBar';
import axios from 'axios';

interface Props {
    className?: string;
    slug: string;
}

const fetchMasters = async (slug: string) => {
    try {
        const response = await axios.get(`${process.env.BASE_URL}/api/v1/masters/users/by-category/?slug=${slug}&limit=20&offset=0`, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data.results || [];
    } catch (error) {
        console.error('Error fetching masters:', error);
        return [];
    }
};

const AdVisitka = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}api/v1/ads/list/?type=visitka&limit/`, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data.results;
    } catch (error) {
      console.error('Error fetching masters:', error);
    }
  }

export const Service = async ({ className, slug }: Props) => {
    const masters = await fetchMasters(slug); 
    const advisitka = await AdVisitka()

    return (
        <div className={cn(className, "w-full flex flex-col gap-6 sm:pt-6 pb-6")}>
            <MobileBackTab slug={slug}/>
            <div className='px-4'>
                <AdGrid advisitka={advisitka}/>
                <Title slug={slug} />
                <List masters={masters} slug={slug} />
            </div>
        </div>
    );
};