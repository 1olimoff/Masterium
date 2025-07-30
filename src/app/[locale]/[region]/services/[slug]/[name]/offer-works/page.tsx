import OfferWork from '@/root/ui/dev/components/shared/tamplates/OfferWork/OfferWork';
import React from 'react';

async function WorkOffers({ params }: { params: { slug: string; name: string } }) {
  const slug = params.slug;
  const user_uuid = params.name;

  return (
    <div>
      <OfferWork slug={slug} userUuid={user_uuid} />
    </div>
  );
}

export default WorkOffers;
