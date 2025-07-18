"use client"
import React, {useEffect, useState} from 'react';
import {cn} from '@/root/business/lib/utils';
import {
    Carousel,
    type CarouselApi,
    CarouselContent,
    CarouselItem,
} from "@/root/ui/dev/shadcn/ui/carousel";
import Image from "next/image";
import {useTranslations} from "next-intl";

type Item = {
    title: string;
    category: string;
    price: number;
    middleRate: number;
    commentsCount: number;
    client: {
        avatar: {
            src: string;
            alt: string;
        };
        name: string;
        type: string;
        online: boolean;
    };
}

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
]

export const DailyWorkersCard = ({className, data}: Props) => {
    const t = useTranslations();
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
        <div className={cn(className, "w-full max-w-[350px]  rounded-xl overflow-hidden bg-white my-custom-shadow ")}>
            <Carousel
                setApi={setApi}
            >
                <CarouselContent className="relative w-full h-[200px]">
                    {images.map((item, i) => (
                        <CarouselItem
                            key={i}
                            className="relative w-full h-full"
                        >
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

                {/* Точки (dots) */}
                <div
                    className="absolute bottom-4  left-0 w-full flex items-center justify-center gap-2 z-10"
                >
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
            </Carousel>
            <div className={"p-2 flex flex-col gap-3"}>
                <div>
                    <h3 className={"text-xl font-semibold"}>{data.title}</h3>
                    <p className={"text-maket-gray"}>{data.category}</p>
                    <div className={"flex gap-1 items-center"}>
                        <div className={"relative h-4 w-4 flex items-center justify-center"}>
                            <Image src={"/svg/main/dailyWorkersCard/star-fill.svg"} alt={"This is star fill for rate"} fill objectFit={"contain"} />
                        </div>
                        <p className={"text-maket-primary"}>{data.middleRate}</p>
                        <p className={"text-sm text-maket-gray"}>({data.commentsCount + " " + t("Main.sections.DailyWorkers.Card.comments")})</p>
                    </div>
                </div>
                <span
                    className={"text-xl text-maket-secondary font-bold"}>{data.price}{" "}{t('price.sum.title')}</span>
                <div className={"flex gap-2"}>
                    <div className={"h-12 w-12 rounded-full relative"}>
                        <Image src={data.client.avatar.src} alt={data.client.avatar.alt} fill objectFit={"cover"}
                               className={"rounded-full"}/>
                        {
                            data.client.online && (
                                <div
                                    className={"absolute bottom-0 right-0 h-3 w-3 border-2 border-white rounded-full bg-maket-green"}>
                                </div>
                            )
                        }
                    </div>
                    <div className={"flex flex-col justify-between h-full"}>
                        <h4 className={"text-lg bg-red-500 font-semibold"}>{data.client.name}</h4>
                        <p className={"text-maket-gray"}>{data.client.type}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
