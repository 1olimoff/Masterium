import { OfferPolicyServer } from '@/root/ui/dev/components/shared/tamplates/OfferPolicy/PolicyServer'
import React from 'react'

async function OfferPrivacyPage({ params }: any) {
  const offerid = await params.slug

  return (
    <div>
      <OfferPolicyServer offerId={offerid}/>
    </div>
  )
}

export default OfferPrivacyPage