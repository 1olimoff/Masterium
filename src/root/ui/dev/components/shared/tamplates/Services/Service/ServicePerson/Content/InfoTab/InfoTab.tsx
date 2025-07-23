import React from 'react';
import { cn } from '@/root/business/lib/utils';
import { useTranslations } from "next-intl";
import { Button } from '@/root/ui/dev/shadcn/ui/button';
import Image from 'next/image';

interface ClientData {
  user_uuid: string;
  profile_photo: string;
  first_name: string;
  last_name: string;
  about: string;
  avg_rating: number;
  comments_count: number;
  categories: {id: number, name: string }[]
  tags: {id: number, name: string, category_id: number }[]
  experience_levels: {experience_level: string, category_name: string }[]
}

interface Props {
  className?: string;
  data: ClientData;
}

export const InfoTab = ({ className, data }: Props) => {
  const t = useTranslations();
  return (
    <div className={cn(className, "w-full h-full flex flex-col gap-8")}>
      {/* Usta haqida */}
      <div className="w-full px-8 py-8 flex flex-col gap-4 rounded-xl bg-white ">
        <h2 className="text-[20px] font-bold text-blue-900">
          {t("Services.Service.ServicePerson.infoTab.infoTitle")}
        </h2>
        <p className="text-[16px] font-medium text-gray-700 whitespace-pre-line">
          {data.about}
        </p>
      </div>

      {/* Ish tajribasi */}
      <div className="w-full px-8 py-8 flex flex-col gap-4 rounded-xl bg-white ">
        <h2 className="text-[20px] font-bold text-blue-900">
          {t("Services.Service.ServicePerson.infoTab.infoExperience")}
        </h2>
        <p className="text-[16px] font-medium text-gray-700 whitespace-pre-line">
          {data.experience_levels.map(exp => `${exp.experience_level} (${exp.category_name})`).join(", ")}
        </p>
      </div>

      <div className="w-full flex flex-wrap gap-3 rounded-xl">
        {data.categories?.map((category, i) => (
          <p
            className="text-sm sm:text-base text-maket-gray bg-white rounded-full px-4 py-2"
            key={`category-${i}`}
          >
            {category.name}
          </p>
        ))}
        {data.tags?.map((tag, i) => (
          <p
            className="text-sm sm:text-base text-maket-gray bg-white rounded-full px-4 py-2"
            key={`tag-${i}`}
          >
            {tag.name}
          </p>
        ))}
      </div>

      <Button className="flex sm:hidden text-maket-gold p-6 text-xl mb-2 rounded-xl gap-2 bg-maket-primary hover:bg-sky-800">
        <Image src={"/svg/worksPage/send.svg"} alt={"Send this work Icon"} width={25} height={25} />
        <p>{t('Services.Service.ServicePerson.sendOffer')}</p>
      </Button>
    </div>
  );
}