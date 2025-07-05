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
    <main
      className={cn(
        className,
        "px-2 sm:px-2 lg:px-4",
        "flex flex-col gap-6"
      )}
    >
      {/* Block 1: Gallery + ShortInfo + Employer */}
      <div className="flex flex-col pt-2  md:flex-row md:items-start gap-6">
        {/* Gallery */}
        <div className="bg-white p-2 rounded-xl shadow w-full md:w-[60%]">
          <Gallery />
        </div>

        {/* ShortInfo + Employer */}
        <div className="flex flex-col gap-6 max-w-[560px] w-full md:w-[35%]">
          <div className="bg-white p-4 rounded-xl shadow w-full max-w-full  sm:max-w-none md:max-w-full">
            <ShortInfo />
          </div>
          <div className="bg-white p-4 rounded-xl hidden sm:flex shadow w-full max-w-full sm:max-w-none md:max-w-full">
            <Employer />
          </div>
        </div>

      </div>




      <div className="flex flex-col md:flex-row lg:pr-8 md:pr-4 md:items-start gap-6 w-full">
        {/* Description */}
        <div className="bg-white p-4 rounded-xl shadow w-full md:flex-1">
          <Description />
        </div>

        {/* Location */}

        <div className="bg-white p-4 flex sm:hidden rounded-xl shadow w-full max-w-full sm:max-w-none md:max-w-full">
            <Employer />
          </div>
        <div className="bg-white p-4 rounded-xl shadow w-full md:max-w-[300px] lg:max-w-[480px] md:w-full">
          <Location />
        </div>
      </div>



    </main>
  );
};
