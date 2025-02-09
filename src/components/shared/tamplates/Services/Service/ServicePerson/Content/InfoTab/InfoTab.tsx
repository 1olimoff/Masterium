import React from 'react';
import { cn } from '@lib/utils';
import {useTranslations} from "next-intl";

interface Props {
    infoText: string;
    experienceText?: string;
    tags: string[];
    className?: string;
}

export const InfoTab = ({ className }: Props) => {
    const t = useTranslations();
    return (
        <div className={cn(className, "w-full h-full py-8 flex flex-col gap-8")}>
            <div className={"w-full px-8 flex flex-col gap-8 rounded-xl bg-white"}>
                <h2>
                    {t('Services.Service.ServicePerson.infoTab.infoTitle')}
                </h2>
            </div>
        </div>
    );
};
