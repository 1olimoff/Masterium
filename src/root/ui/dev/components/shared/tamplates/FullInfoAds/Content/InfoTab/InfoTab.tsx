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
        <main className={cn("flex flex-col md:grid md:grid-cols-3 gap-4 mb-4", className)}>
        <div className="bg-white p-2 rounded-xl shadow w-full md:h-[466px] md:col-span-2">
            <Gallery />
        </div>


        {/* ShortInfo + Employer */}
        <div className="sm:flex md:flex md:flex-col gap-6 max-w-[660px] w-full">
            <div className="bg-white p-4 rounded-xl shadow w-full max-w-full  sm:max-w-none md:max-w-full">
                <ShortInfoTab />
            </div>
            <div className="bg-white p-4 rounded-xl hidden sm:h-48 sm:flex shadow w-full max-w-full sm:max-w-none md:max-w-full">
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
    );
};
