import OfferAds from '@/root/ui/dev/components/shared/tamplates/OfferInfoAds/OfferAds'
import React from 'react'

async function OfferPrivacy({params}:any) {
  const offerid = await params.slug
  return (
    <div className=''>
      <OfferAds offerid={offerid}/>
    </div>
  )
}

export default OfferPrivacy