import React from 'react';
import { cn } from '@/root/business/lib/utils';
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Button } from '@/root/ui/dev/shadcn/ui/button';

interface Props {
    className?: string;
}

export const Employer = ({ className }: Props) => {
    const t = useTranslations();
    return (
        <section className={cn(
            className,
            "w-full h-full flex flex-col gap-3",
            "max-w-full sm:max-w-[400px]" // ✅ Responsiv
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
                    <h4 className="font-semibold">Eshonov Bahodir</h4>
                    <p className="text-maket-gray text-sm">
                        {t('WorksPage.content.employer.period.title')}2024 {t('WorksPage.content.employer.period.subtitle')}
                    </p>
                </div>
            </div>

            <div className="flex justify-center items-center w-full">
                <Button className="bg-white text-[#32ADE6] hover:bg-[#FFFF] hover:text-[#32ADE6] text-sm sm:text-[15px] text-center">
                    Muallifning boshqa e'lonlarini ko'rish
                </Button>
            </div>
        </section> 
    );
};
