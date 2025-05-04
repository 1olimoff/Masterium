"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@lib/utils";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/root/components/ui/carousel";
import Image from "next/image";

interface Props {
    className?: string;
}

const data = [
    {
        src: "/img/advertising/plumbing.png",
        alt: "Plumbing Repair & Maintenance",
        objectFit: "cover",
    },
    {
        src: "/img/advertising/gas.png",
        alt: "Gas Repair",
        objectFit: "cover",
    },
    {
        src: "/img/advertising/plumbing.png",
        alt: "Plumbing Repair & Maintenance",
        objectFit: "cover",
    },
    {
        src: "/img/advertising/plumbing.png",
        alt: "Plumbing Repair & Maintenance",
        objectFit: "cover",
    },
    {
        src: "/img/advertising/gas.png",
        alt: "Gas Repair",
        objectFit: "cover",
    },
];

export const AdCarousel = ({ className }: Props) => {
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
        <section className={cn("relative w-full overflow-hidden", className)}>
            <Carousel
                setApi={setApi}
            >
                <CarouselContent className="relative w-full h-[300px]">
                    {data.map((item, i) => (
                        <CarouselItem
                            key={i}
                            className="relative w-full h-full"
                        >
                            <Image
                                src={item.src}
                                alt={item.alt}
                                fill
                                objectFit={item.objectFit}
                                className="rounded-3xl"
                                priority={i === 0}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Кнопка "Назад" */}
                <CarouselPrevious
                    className={cn(
                        "absolute left-4 top-1/2 -translate-y-1/2 z-10",
                        "bg-white text-black p-2 rounded-full shadow-md hover:bg-gray-100"
                    )}
                />

                {/* Кнопка "Вперёд" */}
                <CarouselNext
                    className={cn(
                        "absolute right-4 top-1/2 -translate-y-1/2 z-10",
                        "bg-white text-black p-2 rounded-full shadow-md hover:bg-gray-100"
                    )}
                />

                {/* Точки (dots) */}
                <div
                    className="absolute bottom-4 left-0 w-full flex items-center justify-center gap-2 z-10"
                >
                    {data.map((_, idx) => {
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
        </section>
    );
};
