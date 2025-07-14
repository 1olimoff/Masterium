import React from 'react';
import { cn } from '@/root/business/lib/utils';
import Image from "next/image";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/root/ui/dev/components/shared/elements/LanguageSwitcher/LanguageSwitcher";
import {
    DialogTrigger,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/root/ui/dev/shadcn/ui/dialog";
import { ChooseRegion } from "@/root/ui/dev/components/shared/elements/ChooseRegion/ChooseRegion";
import { Button } from '@/root/ui/dev/shadcn/ui/button';

interface Props {
    className?: string;
    params: { locale?: string; region?: string };
}

const regions = [
    "tashkent", "tashkent-region", "fergana", "andijan", "namangan", "sirdarya",
    "jizzax", "samarqand", "qashqadarya", "surxandarya", "buxara", "navai", "xarezm", "qaraqalpak"
]

const Header = ({ className, params }: Props) => {
    const t = useTranslations("Header");

    return (
        <header className={cn(className, "flex justify-between items-center bg-maket-primary text-white sm:text-black layout-width p-2 md:px-4 md:py-2 sm:bg-[#F8F9FA]")}>
            <div className="flex items-center gap-3 md:gap-4">
                <Dialog>
                    <div className="flex items-center gap-1">
                        <Image
                            src="/svg/header/location-mobile.svg"
                            alt="Location Icon"
                            width={24}
                            height={24}
                            className="w-5 h-5 sm:hidden"
                        />

                        {/* Katta ekranlar uchun (md: va undan katta) */}
                        <Image
                            src="/svg/header/location.svg"
                            alt="Location Icon"
                            width={24}
                            height={24}
                            className="w-5 h-5 hidden sm:inline-block"
                        />
                        <h2 className="font-medium text-xs md:text-sm lg:text-base">
                            {t('Region.title')}:
                            <DialogTrigger className="underline cursor-pointer ml-1 hover:no-underline hover:bg-maket-primary rounded hover:text-white px-1 py-0.5 md:px-2 md:py-1 text-xs md:text-sm lg:text-base transition-all duration-300">
                                {t(`Region.${params?.region}`) || "Неизвестно"}
                            </DialogTrigger>
                        </h2>
                    </div>

                    <DialogContent className="max-h-[90%] overflow-y-auto custom-scrollbar">
                        <DialogHeader>
                            <DialogTitle className="text-base md:text-lg">Shaharni tanlang</DialogTitle>
                            <hr className="my-2" />
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {regions.map((region, index) => (
                                    <ChooseRegion
                                        region={region}
                                        key={index}
                                        currentLocale={params.locale || 'ru'}
                                    />
                                ))}
                            </div>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="flex items-center gap-3  md:gap-5">
                <a href="tel:+998991234567" className="sm:flex hidden items-center gap-2 call__animation-container text-xs md:text-sm lg:text-base">
                    <Image
                        className="call-animate w-5 h-5 md:w-6 md:h-6"
                        src="/svg/header/call.svg"
                        alt="Call Icon"
                        width={20}
                        height={20}
                    />
                    <span className="hidden md:inline-block font-medium">+998 99 123 45 67</span>
                </a>
                <div className="text-xs md:text-sm lg:text-base">
                    <LanguageSwitcher
                        currentLocale={params.locale || 'ru'}
                        currentRegion={params.region || 'tashkent'}
                    />
                </div>

                <div className='bg-maket-primary flex sm:hidden'>
                    <Button className='bg-maket-primary hover:bg-maket-primary/80 transition duration-300 ease-in-out rounded-full p-2'>
                        <Image
                            src="/svg/header/notification.svg"
                            width={25}
                            height={25}
                            alt="notification btn"
                        />
                    </Button>
                </div>

            </div>
        </header>
    );
};

export default Header;
