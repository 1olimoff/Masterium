import React from 'react'
import { Gallery } from './Gallery/Gallery';
import { ShortInfoTab } from './ShortInfo/ShortInfo';
import { Employer } from './Employer/Employer';
import { Description } from './Description/Description';
import { Location } from './Location/Location';
import { cn } from '@/root/business/lib/utils';
import { useTranslations } from 'next-intl';
import { Title } from './Title/Title';
import { MobileBackTab } from './Title/MobileBackTab';

interface Props {
    className?: string;
}

function OfferAds({ className }: Props) {
    const t = useTranslations("")
    return (
        <div className='layout-width sm:px-4'>
            <Title />
            <MobileBackTab />
            <div className='px-2 mt-2'>

                <h1 className='text-2xl hidden sm:flex font-bold'>{t("ChangeData.privacypolicy.breadcrumb.job")}</h1>
                <main className={cn("flex flex-col md:grid md:grid-cols-3 gap-6 mt-4 mb-4", className)}>
                    {/* Gallery - asosiy rasm karusel */}
                    {/* Gallery - asosiy rasm karusel */}
                    <div className="bg-white p-2 rounded-xl shadow w-full md:h-[466px] md:col-span-2">
                        <Gallery />
                    </div>


                    {/* ShortInfo + Employer */}
                    <div className="sm:flex md:flex md:flex-col gap-6 max-w-[660px] w-full">
                        <div className="bg-white p-4 rounded-xl shadow w-full max-w-full  sm:max-w-none md:max-w-full">
                            <ShortInfoTab />
                        </div>
                        <div className="bg-white p-4 rounded-xl hidden sm:h-[180px] sm:flex shadow w-full max-w-full sm:max-w-none md:max-w-full">
                            <Employer />
                        </div>
                    </div>
                    <div className="w-full lg:flex-1 p-4 bg-white rounded-xl shadow col-span-2">
                        <Description />
                    </div>
                    <div>

                        <div className="bg-white p-4 rounded-xl shadow w-full md:max-w-[330px] lg:max-w-[490px] md:w-full">
                            <Location />
                        </div>
                    </div>

                </main>
            </div>
        </div>
    );
}

export default OfferAds