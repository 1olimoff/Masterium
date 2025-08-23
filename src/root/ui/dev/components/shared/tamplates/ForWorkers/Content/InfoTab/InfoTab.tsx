import React from 'react';
import { cn } from '@/root/business/lib/utils';
import { useTranslations } from "next-intl";
import { Profile } from '../../ForWorkers';

interface Props {
  className?: string;
  data: Profile;
}

export const InfoTab = ({ className, data }: Props) => {
  const t = useTranslations("Services.Service.ServicePerson");

  return (
    <div className={cn(className, "w-full h-full flex flex-col gap-8")}>

      {/* Umumiy ma'lumot */}
      <div className="w-full px-8 py-8 flex flex-col gap-4 rounded-xl bg-white">
        <h2 className="text-[20px] font-bold text-blue-900">
          {t("infoTab.infoTitle")}
        </h2>
        <p className="text-[16px] font-medium text-gray-700 whitespace-pre-line break-words w-full max-w-[100vw]">
          {data.about || t("infoData.noInfo")}
        </p>

      </div>

      {/* Tajriba */}
      <div className="w-full px-8 py-8 flex flex-col gap-4 rounded-xl bg-white">
        <h2 className="text-[20px] font-bold text-blue-900">
          {t("infoTab.infoExperience")}
        </h2>
        <p className="text-[16px] font-medium text-gray-700 whitespace-pre-line ">
          {data.activity?.experience?.name}


        </p>
      </div>

      {/* Yo‘nalish va narx */}
      <div className="w-full px-8 py-8 flex flex-col gap-4 rounded-xl bg-white">
        <h2 className="text-[20px] font-bold text-blue-900">
          {t("infoTab.infoCategory")}
        </h2>
        <p className="text-[16px] font-medium text-gray-700 whitespace-pre-line">
          {data.activity?.price} {t("infoData.fromto")}
        </p>
      </div>

      <div className="w-full px-8 py-8 flex flex-col gap-4 rounded-xl bg-white">
        <h2 className="text-[20px] font-bold text-blue-900">
          {t("infoTab.personalInfo")}
        </h2>
        <ul className="text-[16px] font-medium text-gray-700 whitespace-pre-line flex flex-col gap-2">
          <li>{t("infoData.phoneNumber")} +{data.phone_number}</li>
          <li>{t("infoData.birthDate")} {data.birth_date}</li>
          <li>{t("infoData.passportNumber")} {data.passport_number}</li>
        </ul>
      </div>
    </div>
  );
};
