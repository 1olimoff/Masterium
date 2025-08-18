import OfferWork from '@/root/ui/dev/components/shared/tamplates/OfferWork/OfferWork';
import React from 'react';
import { NextPage } from 'next';

interface PageProps {
  params: Promise<{
    locale: string;
    region: string;
    slug: string;
    name: string;
  }>;
}

const WorkOffers: NextPage<PageProps> = async ({ params }) => {
  const { slug, name: user_uuid } = await params;

  console.log("OFFERWOKR PARAMS", await params);
  
  return (
    <div>
      <OfferWork slug={slug} userUuid={user_uuid} />
    </div>
  );
};

export default WorkOffers;