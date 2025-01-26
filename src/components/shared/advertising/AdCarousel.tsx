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
} from "@/components/ui/carousel";
import Image from "next/image";

interface Props {
    className?: string;
}

const data = [
    {
        src: "/img/advertising/plumbing.png",
        alt: "Plumbing Repair & Maintanence",
        objectFit: "cover",
    },
    {
        src: "/img/advertising/gas.png",
        alt: "Plumbing Repair & Maintanence",
        objectFit: "contain",
    },
    {
        src: "/img/advertising/plumbing.png",
        alt: "Plumbing Repair & Maintanence",
        objectFit: "contain",
    },
    {
        src: "/img/advertising/plumbing.png",
        alt: "Plumbing Repair & Maintanence",
        objectFit: "contain",
    },
    {
        src: "/img/advertising/gas.png",
        alt: "Plumbing Repair & Maintanence",
        objectFit: "contain",
    },
];

export const AdCarousel = ({ className }: Props) => {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (!api) return;

        // При инициализации сразу запоминаем текущий слайд
        setCurrent(api.selectedScrollSnap());

        // Подписываемся на событие "select"
        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    return (
        <div className={cn("relative w-full", className)}>
            <Carousel setApi={setApi}>
                {/* Внутри CarouselContent делаем позицию relative,
            чтобы стрелки и точки располагались поверх */}
                <CarouselContent className="relative w-full h-[300px] overflow-hidden">
                    {data.map((item, i) => (
                        <CarouselItem
                            className="relative w-full h-full shrink-0"
                            key={i}
                        >
                            <Image
                                src={item.src}
                                alt={item.alt}
                                fill
                                // В Next 13: вместо objectFit можно использовать style={{ objectFit: 'cover' }}
                                objectFit={item.objectFit}
                                className="rounded"
                                priority={i === 0} // первый слайд грузим приоритетно
                            />
                        </CarouselItem>
                    ))}

                    {/* Кнопка "Назад" */}
                    <CarouselPrevious
                        className={cn(
                            // Располагаем слева, по вертикали центрируем
                            "absolute left-4 top-1/2 -translate-y-1/2 z-10",
                            // Пример оформления (фон, закругления)
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

                    {/* Блок для «точек» (Dots) */}
                    <div
                        className={cn(
                            // Располагаем снизу посередине
                            "absolute bottom-4 left-0 w-full flex items-center justify-center gap-2 z-10"
                        )}
                    >
                        {data.map((_, idx) => {
                            const isActive = idx === current;
                            return (
                                <div
                                    key={idx}
                                    onClick={() => api?.scrollTo(idx)}
                                    className={cn(
                                        "cursor-pointer h-2 rounded-full transition-all duration-300",
                                        // Если активная – растянута и белая, иначе – круглая и серая
                                        isActive ? "w-6 bg-white" : "w-2 bg-gray-300"
                                    )}
                                />
                            );
                        })}
                    </div>
                </CarouselContent>
            </Carousel>
        </div>
    );
};
