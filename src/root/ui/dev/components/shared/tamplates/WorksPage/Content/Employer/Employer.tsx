import React from 'react';
import { cn } from '@/root/business/lib/utils';
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Button } from '@/root/ui/dev/shadcn/ui/button';
import { MasterDetail } from '../Content';

interface Props {
    className?: string;
  response:MasterDetail

}

export const Employer = ({ className, response }: Props) => {
    const t = useTranslations();
    return (
        <section className={cn(
            className,
            "w-full h-full flex flex-col gap-3",
            "max-w-full sm:max-w-[560px]" // ✅ Responsiv
        )}>
            <p className="text-base sm:text-xl font-semibold uppercase">
                {t("WorksPage.content.employer.title")}
            </p>

            <div className="flex gap-2 border-b border-[#CFD9FE] pb-4">
                <div className="h-12 w-12 rounded-full relative shrink-0">
                    <Image
                        src={"/img/advertising/gozo.png"}
                        alt={"Employer Image"}
                        fill
                        className="rounded-full object-cover"
                    />
                    <div className="absolute bottom-0 right-0 h-3 w-3 border-2 border-white rounded-full bg-maket-green" />
                </div>
                <div className="flex flex-col justify-between h-full text-sm sm:text-base">
                    <h4 className="font-semibold">{response.user.first_name} {response.user.last_name}</h4>
                    <p className="text-maket-gray text-sm">
                        {t('WorksPage.content.employer.period.title')}{new Date(response.user.created_at).getFullYear()}  {""} {t('WorksPage.content.employer.period.subtitle')}
                    </p>
                </div>
            </div>

            <div className="flex justify-center items-center w-full">
                <Button className="bg-white w-20 text-[#32ADE6  hover:bg-[#FFFF] hover:text-[#32ADE6] sm:text-[13px] text-center">
                   {t("MyAds.FullInfoAds.btn")}
                </Button>
            </div>
        </section> 
    );
};
