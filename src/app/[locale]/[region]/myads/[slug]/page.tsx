
import { FullInfoAds } from '@/root/ui/dev/components/shared/tamplates/FullInfoAds/FullInfoAds'
import React from 'react'

async function AdsPage({params}:any) {
  const slug = await params.slug
    return (
        <div>
             <FullInfoAds slug={slug}/>
        </div>
  )
}

export default AdsPage