import React from 'react';
import { cn } from '@/root/business/lib/utils';
import { useTranslations } from "next-intl";
import { Button } from "@/root/ui/dev/shadcn/ui/button";
import Image from "next/image";
import { Link } from '@/i18n/routing';
import ServerLink from '../../../../elements/Links/ServerLink';
import { MasterDetail } from '../Content';

interface Props {
    className?: string;
    response: MasterDetail
}

export const ShortInfo = ({ className, response }: Props) => {
    const t = useTranslations();


    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        }).split("/").join(".")
    }

    return (
        <div
            className={cn(
                className,
                "w-full h-full flex flex-col gap-3",
                "max-w-full sm:max-w-[560px]"
            )}
        >
            {/* Created Date */}
            <p className="text-[11px] sm:text-xs md:text-sm text-maket-gray">
                {t('WorksPage.content.shortInfo.createdDateTitle')} {formatDate(response.created_at)}
            </p>

            {/* Title */}
            <h1 className="text-sm sm:text-base md:text-lg font-semibold leading-snug">
            {response.title}
            </h1>

            {/* Price */}
            <h2 className="text-xl sm:text-2xl font-bold text-maket-black">
            {response.price.toLocaleString()} {t('price.sum.title')}
            </h2>

            {/* Period Info Box */}
            <div className="p-3 sm:p-4 flex flex-col gap-1.5 rounded-xl bg-maket-batafsil text-sm sm:text-base">
                <p className="text-maket-secondary font-semibold uppercase">
                    {t('WorksPage.content.shortInfo.period.title')} {response.total_date} {t('WorksPage.content.shortInfo.period.days')}
                </p>
                <p className="text-maket-secondary">
                {formatDate(response.start_date)} {t('WorksPage.content.shortInfo.period.from')} – {formatDate(response.end_date)}{" "} {t('WorksPage.content.shortInfo.period.to')}
                </p>
            </div>

            {/* Button */}
            <ServerLink
                path="offer-works"
                className="text-maket-gold rounded-xl flex items-center justify-center gap-2 bg-maket-primary hover:bg-sky-800 text-sm sm:text-base py-2"
            >
                <Image
                    src="/svg/worksPage/send.svg"
                    alt="Send Icon"
                    width={20} 
                    height={20}
                />
                <span>{t("WorksPage.content.shortInfo.sendOfferButton")}</span>
            </ServerLink>
        </div>
    );
};


