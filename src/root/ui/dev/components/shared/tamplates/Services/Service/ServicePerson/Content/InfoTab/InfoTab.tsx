import React from 'react';
import { cn } from '@/root/business/lib/utils';
import {useTranslations} from "next-intl";

interface Props {
    infoText: string;
    experienceText?: string;
    tags?: string[];
    className?: string;
    infoData?: string
}

export const InfoTab = ({ className, infoText, experienceText, tags }: Props) => {
    const t = useTranslations();
    return (
        <div className={cn(className, "w-full h-full flex flex-col gap-8 pb-8")}>
  {/* Usta haqida */}
  <div className="w-full px-8 py-8 flex flex-col gap-4 rounded-xl bg-white shadow-lg">
    <h2 className="text-[20px] font-bold text-blue-900">
      {t("Services.Service.ServicePerson.infoTab.infoTitle")}
    </h2>
    <p className="text-[16px] font-medium text-gray-700 whitespace-pre-line">
      {t("Services.Service.ServicePerson.infoData.infoText")}
    </p>
  </div>

  {/* Ish tajribasi */}
  <div className="w-full px-8 py-8 flex flex-col gap-4 rounded-xl bg-white shadow-lg">
    <h2 className="text-[20px] font-bold text-blue-900">
      {t("Services.Service.ServicePerson.infoTab.infoExperience")}
    </h2>
    <p className="text-[16px] font-medium text-gray-700 whitespace-pre-line">
      {t("Services.Service.ServicePerson.infoData.infoExperience")}
    </p>
  </div>
</div>

    );
};
