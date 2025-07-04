import React from 'react';
import { cn } from '@/root/business/lib/utils';

import { Employer } from './Employer/Employer';
import { Gallery } from './Gallery/Gallery';
import { Location } from './Location/Location';

import { ShortInfoTab } from './ShortInfo/ShortInfo';
import { Description } from './Description/Description';

interface Props {
    className?: string;
}

export const Content = ({ className }: Props) => {
    return (
        <main className={cn("flex flex-col gap-6 mb-4", className)}>
            {/* Gallery + Info */}
            <div className="flex flex-col md:flex-row gap-6 w-full">
                {/* Gallery - asosiy rasm karusel */}
                <div className="bg-white p-2 rounded-xl shadow w-full md:w-[60%]">
                    <Gallery />
                </div>

                {/* ShortInfo + Employer */}
                <div className="flex flex-col gap-6 max-w-[560px] w-full md:w-[35%]">
                    <div className="bg-white p-4 rounded-xl shadow w-full max-w-full  sm:max-w-none md:max-w-full">
                        <ShortInfoTab />
                    </div>
                    <div className="bg-white p-4 rounded-xl hidden sm:flex shadow w-full max-w-full sm:max-w-none md:max-w-full">
                        <Employer />
                    </div>
                </div>
            </div>


            {/* Description + Location */}
            <div className="flex flex-col md:flex-row lg:pr-8 md:pr-4 md:items-start gap-6 w-full">
                {/* Description - keng qism */}
                <div className="w-full lg:flex-1 p-4 bg-white rounded-xl shadow">
                    <Description />
                </div>

                {/* Location - o'ngdagi kichik blok */}
                <div className="bg-white p-4 rounded-xl shadow w-full md:max-w-[330px] lg:max-w-[490px] md:w-full">
                    <Location />
                </div>
            </div>

        </main>
    );
};
