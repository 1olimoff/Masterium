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
        "px-4 sm:px-6 lg:px-8",
        "flex flex-col gap-6"
      )}
    >
      {/* Block 1: Gallery + ShortInfo + Employer */}
      <div className="flex flex-col md:flex-row md:items-start gap-6">
        {/* Gallery */}
        <div className="bg-white p-2 rounded-xl shadow w-full md:w-[60%]">
          <Gallery />
        </div>

        {/* ShortInfo + Employer */}
        <div className="flex flex-col gap-6 max-w-[500px] w-full md:w-[35%]">
          <div className="bg-white p-4 rounded-xl shadow w-full max-w-full sm:max-w-none md:max-w-full">
            <ShortInfo />
          </div>
          <div className="bg-white p-4 rounded-xl shadow w-full max-w-full sm:max-w-none md:max-w-full">
            <Employer />
          </div>
        </div>

      </div>



      {/* Block 2: Description + Location */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="bg-white p-4 rounded-xl shadow w-full md:w-[60%]">
          <Description />
        </div>
        <div className="bg-white p-4 rounded-xl shadow w-full md:w-[40%]">
          <Location />
        </div>
      </div>
    </main>
  );
};
