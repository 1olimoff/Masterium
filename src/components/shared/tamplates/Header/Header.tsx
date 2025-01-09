import React from 'react';
import {cn} from '@lib/utils';
import Image from "next/image";
import {useTranslations} from "next-intl";

interface Props {
    className?: string;
    params: { locale?: string; region?: string };
}

const Header = ({className, params}: Props) => {
    const t = useTranslations("Header");
    return (
        <header className={cn(className, "h-[36px] border-2 border-blue-400 flex justify-between items-center layout-width")}>
            <div className={'flex gap-2'}>
                <Image src={"/svg/header/location.svg"} alt={"Location Icon"} width={20} height={20} />
                <h2>{t('Region.title')}: <span>{t(`Region.${params?.region}`) || "Неизвестно"}</span></h2>
            </div>
        </header>
    );
};


export default Header;
