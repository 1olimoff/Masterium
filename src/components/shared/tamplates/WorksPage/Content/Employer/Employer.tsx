import React from 'react';
import {cn} from '@lib/utils';
import {useTranslations} from "next-intl";
import Image from "next/image";
import {MoreButton} from "@/components/shared/elements/Buttons/MoreButton";

interface Props {
    className?: string;
}

export const Employer = ({className}: Props) => {
    const t = useTranslations();
    return (
        <section className={cn(className, "w-full max-w-[400px] h-full flex flex-col gap-3")}>
            <p className="text-xl font-semibold uppercase">
                {t("WorksPage.content.employer.title")}
            </p>
            <div className={"flex gap-2 border-b border-[#CFD9FE] pb-4"}>
                <div className={"h-12 w-12 rounded-full relative"}>
                    <Image src={"/img/advertising/gozo.png"} alt={"Employer Image"} fill objectFit={"cover"}
                           className={"rounded-full"}/>
                    <div
                        className={"absolute bottom-0 right-0 h-3 w-3 border-2 border-white rounded-full bg-maket-green"}>
                    </div>
                </div>
                <div className={"flex flex-col justify-between h-full"}>
                    <h4 className={"text-lg font-semibold"}>Eshonov Bahodir</h4>
                    <p className={"text-maket-gray text-sm"}>{t('WorksPage.content.employer.period.title')}2024 {t('WorksPage.content.employer.period.subtitle')}</p>
                </div>
            </div>
            <div className={"flex justify-center items-center w-full"}>
                <MoreButton title={t('WorksPage.content.employer.other')}/>
            </div>
        </section>
    );
};
