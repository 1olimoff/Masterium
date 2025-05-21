import React from 'react';
import {cn} from '@/root/business/lib/utils';
import Image from "next/image";
import {useTranslations} from "next-intl";
import {LanguageSwitcher} from "@/root/ui/dev/components/shared/elements/LanguageSwitcher/LanguageSwitcher";
import {DialogTrigger, Dialog, DialogContent, DialogHeader, DialogTitle} from "@/root/ui/dev/shadcn/ui/dialog";
import {ChooseRegion} from "@/root/ui/dev/components/shared/elements/ChooseRegion/ChooseRegion";

interface Props {
    className?: string;
    params: { locale?: string; region?: string };
}

const regions = [
    "tashkent", "tashkent-region", "fergana", "andijan", "namangan", "sirdarya", "jizzax", "samarqand", "qashqadarya", "surxandarya", "buxara", "navai", "xarezm", "qaraqalpak"
]

const Header = ({className, params}: Props) => {
    const t = useTranslations("Header");
    return (
        <header
            className={cn(className, "h-[36px] flex justify-between items-center layout-width px-2")}>
            <div className={'flex gap-2'}>
                <Dialog>
                    <Image src={"/svg/header/location.svg"} alt={"Location Icon"} width={20} height={20}/>
                    <h2 className={"font-light"}>{t('Region.title')}: <DialogTrigger
                        className={"underline cursor-pointer hover:no-underline hover:bg-maket-primary rounded hover:text-white p-1 transition-all duration-300"}>{t(`Region.${params?.region}`) || "Неизвестно"}</DialogTrigger>
                    </h2>
                    <DialogContent className={"max-h-[90%] overflow-y-auto custom-scrollbar"}>
                        <DialogHeader>
                            <DialogTitle>
                                Shaharni tanlang
                            </DialogTitle>
                            <hr/>
                            {
                                regions.map((region: string, index: number) => (
                                    <ChooseRegion region={region} key={index} currentLocale={params.locale || 'ru'}
                                    />
                                ))
                            }
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
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
    )
};


export default Header;
