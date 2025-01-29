import React from 'react';
import {cn} from '@lib/utils';
import Image from "next/image";
import {FooterProvider} from './FooterProvider';
import {useTranslations} from "next-intl";

interface Props {
    className?: string;
}

export const Footer = ({className}: Props) => {
    const t = useTranslations("Footer");
    return (
        <FooterProvider>
            <div className={cn(className, "grid grid-cols-4")}>
                <div className={"flex flex-col gap-6"}>
                    <Image src={"/svg/footer/logo.svg"} alt={"Footer logo of Masterium"} width={500}
                           height={100} className={"w-full max-w-[350px] h-auto"} quality={100}/>
                    <h3 className={"text-maket-gold"}>{t("logo.title")}</h3>
                </div>
                <div className={"flex flex-col gap-6"}>
                    <h4>
                        {t('info.title')}
                    </h4>
                    <ul>
                        {
                            t.raw("info.list").map((item: string, i: number) => (
                                <li key={i}>
                                    {item}
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
            <div>

            </div>
        </FooterProvider>
    );
};g
