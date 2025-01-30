import React from 'react';
import {cn} from '@lib/utils';
import Image from "next/image";
import {FooterProvider} from './FooterProvider';
import {useTranslations} from "next-intl";
import Link from "next/link";

interface Props {
    className?: string;
}
f
export const Footer = ({className}: Props) => {
    const t = useTranslations("Footer");
    return (
        <FooterProvider>
            <div className={cn(className, "grid grid-cols-4 gap-8")}>
                <div className={"flex flex-col gap-6"}>
                    <Link href="/">
                        <Image src={"/svg/footer/logo.svg"} alt={"Footer logo of Masterium"} width={500}
                               height={100} className={"w-full max-w-[350px] h-auto"} quality={100}/>
                    </Link>
                    <h3 className={"text-maket-gold"}>{t("logo.title")}</h3>
                </div>
                <div className={"flex justify-center"}>
                    <div className={"flex flex-col gap-4"}>
                        <h4 className={"text-maket-gold text-xl font-semibold"}>
                            {t('info.title')}
                        </h4>
                        <ul className={"flex flex-col gap-2"}>
                            {
                                t.raw("info.list").map((item: string, i: number) => (
                                    <li className={"text-maket-gold"} key={i}>
                                        {item}
                                    </li>
                                ))
                            }
                        </ul>

                    </div>
                </div>
                <div className={"flex justify-center"}>
                    <div className={"flex flex-col gap-4 items-start"}>
                        <h4 className={"text-maket-gold text-xl font-semibold"}>
                            {t('download.title')}
                        </h4>
                        <div className={"flex flex-col gap-4"}>
                            <Image src={"/svg/footer/Apple.svg"} alt={"Download from Apple Store Icon"} width={200}
                                   height={100} quality={100} className={"h-10 w-auto"}/>
                            <Image src={"/svg/footer/GooglePlay.svg"} alt={"Download from Apple Store Icon"} width={200}
                                   height={100} quality={100} className={"h-10 w-auto"}/>
                        </div>
                    </div>
                </div>
            </div>
            <div>

            </div>
        </FooterProvider>
    );
};
