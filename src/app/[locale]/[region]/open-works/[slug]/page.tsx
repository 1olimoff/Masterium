import React from 'react';
import {WorksPage} from "@/root/ui/dev/components/shared/tamplates/WorksPage/WorksPage";

export default async function WorksHomePage ({params}:any) {
    const offerId = await params.slug
    
    return (
        <div className={'layout-width'}>
            <WorksPage offerId={offerId}/>
        </div>
    );
};
