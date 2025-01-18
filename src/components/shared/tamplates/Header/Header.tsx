import React from 'react';
import {cn} from '@lib/utils';
import Image from "next/image";
import {useTranslations} from "next-intl";
import {LanguageSwitcher} from "@/components/shared/elements/LanguageSwitcher/LanguageSwitcher";

interface Props {
    className?: string;
    params: { locale?: string; region?: string };
}

const Header = ({className, params}: Props) => {
    const t = useTranslations("Header");
    return (
        <header
            className={cn(className, "h-[36px] flex justify-between items-center layout-width px-2")}>
            <div className={'flex gap-2'}>
                <Image src={"/svg/header/location.svg"} alt={"Location Icon"} width={20} height={20}/>
                <h2 className={"font-light"}>{t('Region.title')}: <span
                    className={"underline cursor-pointer hover:no-underline hover:bg-maket-primary rounded hover:text-white p-1 transition-all duration-300"}>{t(`Region.${params?.region}`) || "Неизвестно"}</span>
                </h2>
            </div>
            <div className={'flex gap-4'}>
                <div className={'flex gap-2 call__animation-container'}>
                    <Image
                        className={"call-animate"}
                        src={"/svg/header/call.svg"}
                        alt={"Call Icon"}
                        width={20}
                        height={20}
                    />
                    <a href="tel:+998991234567">+998 99 123 45 67</a>
                </div>
                <LanguageSwitcher currentLocale={params.locale || 'ru'}
                                  currentRegion={params.region || 'tashkent'}/>
            </div>
        </header>
    );
};


export default Header;
