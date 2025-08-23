import React from 'react';
import { cn } from '@/root/business/lib/utils';
import { AdGrid } from "@/root/ui/dev/components/shared/elements/advertising/AdGrid";
import { Title } from "@/root/ui/dev/components/shared/tamplates/WorksPage/Title/Title";
import { Content, MasterDetail } from "@/root/ui/dev/components/shared/tamplates/WorksPage/Content/Content";
import { MobileBackTab } from './Title/MobileBackTab';
import axios from 'axios';

interface Props {
  className?: string;
  offerId: string;
}

const fetchMasterdetail = async (offerId: any) => {
  try {
    const response = await axios.get(`${process.env.BASE_URL}/api/v1/offers/${offerId}/detail/`, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data.result || [];
  } catch (error) {
    console.error('Error fetching masters:', error);
    return [];
  }
}

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


export const WorksPage = async ({ className, offerId }: Props) => {
  const response = await fetchMasterdetail(offerId)
  const advisitka = await AdVisitka()


  return (
    <div className={cn(className, "w-full flex flex-col gap-6 sm:pt-6")}>
      <MobileBackTab response={response} />
      <div className="px-2">
        <AdGrid advisitka={advisitka} />
        <Title response={response} />
        <Content response={response} offerId={offerId} />
      </div>
    </div>
  );
};
