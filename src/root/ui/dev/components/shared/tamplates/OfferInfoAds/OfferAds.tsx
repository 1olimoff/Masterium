import React from 'react';
import { Gallery } from './Gallery/Gallery';
import { ShortInfoTab } from './ShortInfo/ShortInfo';
import { Employer } from './Employer/Employer';
import { Description } from './Description/Description';
import { Location } from './Location/Location';
import { cn } from '@/root/business/lib/utils';
import { useTranslations } from 'next-intl';
import { Title } from './Title/Title';
import { MobileBackTab } from './Title/MobileBackTab';
import axios from 'axios';
import { cookies } from 'next/headers';

interface Props {
    className?: string;
    offerid: number;
}

const fetchOfferDetail = async (offerid: number) => {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;
    try {
        const response = await axios.get(
            `${process.env.BASE_URL}api/v1/masters/${offerid}/private-detail/`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token ? `Bearer ${token}` : undefined,
                },
            }
        );
        return response.data.result; 
    } catch (error) {
        console.error('Error fetching offer details:', error);
        return null;
    }
};

async function OfferAds({ className, offerid }: Props) { 
    const offerData = await fetchOfferDetail(offerid);
    
    return (
        <div className="layout-width sm:px-4">
            <Title response={offerData}/>
            <MobileBackTab response={offerData}/>
            <div className="px-2 mt-2">
                <main className={cn('flex flex-col md:grid md:grid-cols-3 gap-6 mt-4 mb-4', className)}>
                    <div className="bg-white p-2 rounded-xl shadow w-full md:h-[466px] md:col-span-2">
                        <Gallery response={offerData}/>
                    </div>
                    <div className="sm:flex md:flex md:flex-col gap-6 max-w-[660px] w-full">
                        <div className="bg-white p-4 rounded-xl shadow w-full max-w-full sm:max-w-none md:max-w-full">
                            <ShortInfoTab response={offerData}/>
                        </div>
                        <div className="bg-white p-4 rounded-xl hidden sm:h-[180px] sm:flex shadow w-full max-w-full sm:max-w-none md:max-w-full">
                            <Employer response={offerData}/>
                        </div>
                    </div>
                    <div className="w-full lg:flex-1 p-4 bg-white rounded-xl shadow col-span-2">
                        <Description response={offerData}/>
                    </div>
                    <div>
                        <div className="bg-white p-4 rounded-xl shadow w-full md:max-w-[330px] lg:max-w-[490px] md:w-full">
                            <Location response={offerData}/>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default OfferAds;