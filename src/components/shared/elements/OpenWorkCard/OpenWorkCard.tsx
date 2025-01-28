"use client"
import React, {useEffect, useState} from 'react';
import {cn} from '@lib/utils';
import {
    Carousel,
    type CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "@/components/ui/carousel";
import Image from "next/image";

type Item = {
    title: string;
    category: string;
    price: number;
    client: {
        avatar: {
            src: string;
            alt: string;
        };
        type: string;
        status: string;
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

export const OpenWorkCard = ({className, data}: Props) => {
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
        <div className={cn(className, "w-full max-w-[350px] rounded-3xl overflow-hidden")}>
            <Carousel
                setApi={setApi}
            >
                <CarouselContent className="relative w-full h-[300px]">
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
                    className="absolute bottom-4 left-0 w-full flex items-center justify-center gap-2 z-10"
                >
                    {images.map((_, idx) => {
                        const isActive = idx === current;
                        return (
                            <div
                                key={idx}
                                onClick={() => api?.scrollTo(idx)}
                                className={cn(
                                    "cursor-pointer h-2 rounded-full transition-all duration-300",
                                    isActive ? "w-8 bg-white" : "w-2 bg-gray-300"
                                )}
                            />
                        );
                    })}
                </div>
            </Carousel>
        </div>
    );
};
