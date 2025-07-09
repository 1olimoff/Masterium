import React from 'react';
import { cn } from '@/root/business/lib/utils';
import { useTranslations } from "next-intl";
import { Button } from '@/root/ui/dev/shadcn/ui/button';
import Image from 'next/image';

interface ClientData {
  infoText: string;
  experienceText?: string;
  categories?: string[];
}

interface Props {
  infoText: string;
  experienceText?: string;
  tags?: string[];
  className?: string;
  infoData?: string
  data: ClientData;
}

export const InfoTab = ({ className, data, infoText, experienceText, tags }: Props) => {
  const t = useTranslations();
  return (
    <div className={cn(className, "w-full h-full flex flex-col gap-8")}>
      {/* Usta haqida */}
      <div className="w-full px-8 py-8 flex flex-col gap-4 rounded-xl bg-white ">
        <h2 className="text-[20px] font-bold text-blue-900">
          {t("Services.Service.ServicePerson.infoTab.infoTitle")}
        </h2>
        <p className="text-[16px] font-medium text-gray-700 whitespace-pre-line">
          {t("Services.Service.ServicePerson.infoData.infoText")}
        </p>
      </div>

      {/* Ish tajribasi */}
      <div className="w-full px-8 py-8 flex flex-col gap-4 rounded-xl bg-white ">
        <h2 className="text-[20px] font-bold text-blue-900">
          {t("Services.Service.ServicePerson.infoTab.infoExperience")}
        </h2>
        <p className="text-[16px] font-medium text-gray-700 whitespace-pre-line">
          {t("Services.Service.ServicePerson.infoData.infoExperience")}
        </p>
      </div>

      <div className="w-full flex flex-wrap gap-3 rounded-xl">
        {data.categories?.map((category, i) => (
          <p
            className="text-sm sm:text-base text-maket-gray bg-white rounded-full px-4 py-2"
            key={i}
          >
            {category}
          </p>
        ))}
      </div>



    </div>



  );
};
