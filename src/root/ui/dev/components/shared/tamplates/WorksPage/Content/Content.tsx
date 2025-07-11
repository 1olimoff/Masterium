import React from 'react';
import { cn } from '@/root/business/lib/utils';
import { ShortInfo } from "@/root/ui/dev/components/shared/tamplates/WorksPage/Content/ShortInfo/ShortInfo";
import { Employer } from "@/root/ui/dev/components/shared/tamplates/WorksPage/Content/Employer/Employer";
import { Gallery } from "@/root/ui/dev/components/shared/tamplates/WorksPage/Content/Gallery/Gallery";
import { Location } from "@/root/ui/dev/components/shared/tamplates/WorksPage/Content/Location/Location";
import { Description } from "@/root/ui/dev/components/shared/tamplates/WorksPage/Content/Description/Description";

interface Props {
  className?: string;
}

export const Content = ({ className }: Props) => {
  return (
    <main className={cn(className, "px-2 sm:px-2 lg:px-4", "flex flex-col gap-6")}>

      <main className={cn("flex flex-col md:grid md:grid-cols-3 gap-6 mt-4 mb-4", className)}>
        {/* Gallery - asosiy rasm karusel */}
        {/* Gallery - asosiy rasm karusel */}
        <div className="bg-white p-2 rounded-xl shadow w-full md:h-[466px] md:col-span-2">
          <Gallery />
        </div> 


        {/* ShortInfo + Employer */}
        <div className="sm:flex md:flex md:flex-col gap-6 max-w-[660px] w-full">
          <div className="bg-white p-4 rounded-xl shadow w-full max-w-full  sm:max-w-none md:max-w-full">
            <ShortInfo />
          </div>
          <div className="bg-white p-4 rounded-xl hidden sm:h-48 sm:flex shadow w-full max-w-full sm:max-w-none md:max-w-full">
            <Employer />
          </div>
        </div>
        <div className="w-full lg:flex-1 p-4 bg-white rounded-xl shadow col-span-2">
          <Description />
        </div>
        <div>
          <div className="bg-white p-4 flex sm:hidden  mb-4 rounded-xl shadow w-full max-w-full sm:max-w-none md:max-w-full">
            <Employer />
          </div>
          <div className="bg-white p-4 sm:mt-1 rounded-xl shadow w-full md:max-w-[330px] lg:max-w-[490px] md:w-full">
            <Location />
          </div>
        </div>

      </main>




    </main>
  );
};
