"use client"
import React from 'react';
import { cn } from '@/root/business/lib/utils';
import { useTranslations } from "next-intl";
import { Button } from "@/root/ui/dev/shadcn/ui/button";
import Image from "next/image";
import { MasterDetail } from '../Content';
import axios from 'axios';
import { toast } from '@/root/business/hooks/use-toast';

interface Props {
    className?: string;
    response: MasterDetail
    offerId: number
}

export const ShortInfo = ({ className, response, offerId }: Props) => {
    const t = useTranslations();

    const handleApply = async () => {
        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}api/v1/masters/${offerId}/apply/`,
                { offer_id: offerId }, 
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                }
            );

            toast({
                title: "✅",
                description: "Muvaffaqiyatli topshirildi",
            });

        } catch (err: any) {
            if (axios.isAxiosError(err)) {
                if (err.response?.status === 403) {
                    toast({
                        title: t("error.title"),
                        description: "Siz master bo‘lishingiz kerak",
                        variant: "destructive",
                    });
                    return;
                }
            }

            toast({
                description: "So'rov yuborish uchun master profil oching.",
                variant: "destructive",
            });
        }
    }

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
            <Button
                onClick={handleApply}
                className="text-maket-gold rounded-xl flex items-center justify-center gap-2 bg-maket-primary hover:bg-sky-800 text-sm sm:text-base py-2"
            >
                <Image
                    src="/svg/worksPage/send.svg"
                    alt="Send Icon"
                    width={20}
                    height={20}
                />
                <span>{t("WorksPage.content.shortInfo.sendOfferButton")}</span>
            </Button>
        </div>
    );
};


