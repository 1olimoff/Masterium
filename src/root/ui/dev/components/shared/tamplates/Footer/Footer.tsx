import React from 'react';
import {cn} from '@/root/business/lib/utils';
import Image from "next/image";
import {FooterProvider} from './FooterProvider';
import {useTranslations} from "next-intl";
import Link from "next/link";

interface Props {
    className?: string;
}

export const Footer = ({className}: Props) => {
    const t = useTranslations("Footer");
    return (
        <FooterProvider>
            <div className={cn(className, "grid grid-cols-4 gap-8")}>
                <div className={"flex flex-col gap-6"}>
                    <Link href="/public">
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
                <div className={"flex justify-center"}>
                    <div className={"flex flex-col gap-4 items-start"}>
                        <h4 className={"text-maket-gold text-xl font-semibold"}>
                            {t('contact.title')}
                        </h4>
                        <div className={"flex flex-col gap-2"}>
                            <a href="tel:+998991234578" className={"text-maket-gold text-lg"}>+998 99 123 45 78</a>
                            <a href="tel:+998991234578" className={"text-maket-gold text-lg"}>+998 99 123 45 78</a>
                            <a href="mailto:info@mastershub.uz" className={"text-maket-gold text-lg"}>info@mastershub.uz</a>
                            <div className={"flex gap-4"}>
                                <a href={"/"} className={"h-10 w-10 rounded-full relative"}>
                                    <Image src={'/svg/footer/social/Telegram_white.svg'} alt={"Masterium's Telegramm Link Icon"} fill objectFit={"contain"} />
                                </a>
                                <a href={"/"} className={"h-10 w-10 rounded-full relative"}>
                                    <Image src={'/svg/footer/social/Instagram.svg'} alt={"Masterium's Instagrams Link Icon"} fill objectFit={"contain"} />
                                </a>
                                <a href={"/"} className={"h-10 w-10 rounded-full relative"}>
                                    <Image src={'/svg/footer/social/Facebook.svg'} alt={"Masterium's Facebook Link Icon"} fill objectFit={"contain"} />
                                </a>
                                <a href={"/"} className={"h-10 w-10 rounded-full relative"}>
                                    <Image src={'/svg/footer/social/Youtube.svg'} alt={"Masterium's You Tube Link Icon"} fill objectFit={"contain"} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"text-maket-primary bg-white"}>
                <hr />
                <div className={"flex w-full justify-center items-center pt-4 text-lg"}>
                    <p>
                        {t('security')}
                    </p>
                </div>
            </div>
        </FooterProvider>
    );
};
