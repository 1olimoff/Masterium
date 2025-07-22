"use client";
import React, { useEffect, useState } from 'react';
import { cn } from '@/root/business/lib/utils';
import {
    Carousel,
    type CarouselApi,
    CarouselContent,
    CarouselItem,
} from "@/root/ui/dev/shadcn/ui/carousel";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/root/ui/dev/shadcn/ui/button";
import { Link } from '@/i18n/routing';
import ServerLink from '../../../../elements/Links/ServerLink';

type Item = {
    title: string;
    category: string;
    price: number;
    client: {
        avatar: {
            src: string;
            alt: string;
        };
        name: string;
        type: string;
        online: boolean;
    };
    applicationCount: number;
};

interface Props {
    className?: string;
    data: Item;
}

const images = [
    {
        src: "/img/advertising/gas.png",
        alt: "Gas Repair",
        objectFit: "cover",
    },
    {
        src: "/img/advertising/gas.png",
        alt: "Gas Repair",
        objectFit: "cover",
    },
    {
        src: "/img/advertising/gas.png",
        alt: "Gas Repair",
        objectFit: "cover",
    },
    {
        src: "/img/advertising/gas.png",
        alt: "Gas Repair",
        objectFit: "cover",
    },
    {
        src: "/img/advertising/gas.png",
        alt: "Gas Repair",
        objectFit: "cover",
    },
];

export const OfferCard = ({ className, data }: Props) => {
    const t = useTranslations("");
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (!api) return;

        setCurrent(api.selectedScrollSnap());
        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    return (
        <div className={cn(
            className,
            "w-full max-w-full sm:max-w-[320px] md:max-w-[260px] lg:max-w-[330px] h-full my-2 rounded-xl overflow-hidden bg-white my-custom-shadow"
        )}>
            <Carousel setApi={setApi}>
                <CarouselContent className="relative w-full h-[160px] sm:h-[180px] md:h-[200px]">
                    {images.map((item, i) => (
                        <CarouselItem key={i} className="relative w-full h-full">
                            <Image
                                src={item.src}
                                alt={item.alt}
                                fill
                                objectFit={item.objectFit}
                                priority={i === 0}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <div className="absolute bottom-4 left-0 w-full flex items-center justify-center gap-2 z-10">
                    {images.map((_, idx) => {
                        const isActive = idx === current;
                        return (
                            <div
                                key={idx}
                                onClick={() => api?.scrollTo(idx)}
                                className={cn(
                                    "cursor-pointer h-1 rounded-full transition-all duration-300",
                                    isActive ? "w-4 bg-white" : "w-1 bg-gray-300"
                                )}
                            />
                        );
                    })}
                </div>

                {data.applicationCount > 0 && (
                    <div className="absolute top-[32%] left-[15%] sm:top-[38%] sm:left-[25%] z-10 bg-red-500 text-white text-xs sm:text-sm font-semibold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                        {data.applicationCount} {t("OfferForWorkers.applicationNumb")}
                    </div>
                )}
            </Carousel>

            <div className="p-2 flex flex-col gap-2 sm:gap-3 lg:gap-4">
                <div>
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold">{data.title}</h3>
                    <p className="text-sm sm:text-base text-maket-gray">{data.category}</p>
                </div>

                <span className="text-base sm:text-lg md:text-xl text-maket-secondary font-bold">
                    {data.price} {t('price.sum.title')}
                </span>

                <div className="flex gap-2">
                    <div className="rounded-full max-h-[84px] border-2 border-maket-green">
                        <div className="h-12 w-12 rounded-full relative border-2 border-white overflow-hidden">
                            <Image
                                src="/img/advertising/gas.png"
                                alt="Eshonov Baxodir"
                                fill
                                style={{ objectFit: "cover" }}
                                className="rounded-full"
                            />
                            <div className="absolute bottom-0 right-0 h-5 w-5 border-2 border-white rounded-full bg-maket-green" />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <h4 className="text-md font-semibold">Eshonov Baxodir</h4>
                        <p className="text-maket-gray text-sm">Mijoz</p>
                    </div>
                </div>

                <div className="flex flex-col justify-center gap-2 sm:gap-3">
                    <ServerLink
                    path="#"
                        className="bg-maket-batafsil text-maket-secondary text-sm sm:text-base md:text-lg text-center font-medium py-2 sm:py-4 md:py-3 rounded-xl hover:bg-maket-secondary hover:text-white transition-all duration-200">
                        {t('OfferForWorkers.btn.seeOffer')}
                    </ServerLink>
                </div>
            </div>
        </div>
    );
};
