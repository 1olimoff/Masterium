// Gallery.tsx
"use client"

import React, { useState, useEffect } from "react"
import { cn } from "@lib/utils"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel"
import Image from "next/image"

interface Props {
    className?: string
}

const data = [
    {
        src: "/img/advertising/plumbing.png",
        alt: "Plumbing Repair & Maintenance",
    },
    {
        src: "/img/advertising/gas.png",
        alt: "Gas Repair",
    },
    {
        src: "/img/advertising/plumbing.png",
        alt: "Plumbing Repair & Maintenance",
    },
]

export const Gallery = ({ className }: Props) => {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        if (!api) return
        setCurrent(api.selectedScrollSnap())
        api.on("select", () => setCurrent(api.selectedScrollSnap()))
    }, [api])

    return (
        <section className={cn("relative w-full h-full flex-grow", className)}>
            <Carousel setApi={setApi} className="w-full h-full border-2 border-black flex-grow">
                <CarouselContent className="relative w-full h-full border-4 border-red-500 flex-grow">
                    {data.map((item, i) => (
                        <CarouselItem key={i} className="relative w-full h-full border-2 border-green-400 flex-grow">
                            <Image
                                src={item.src}
                                alt={item.alt}
                                fill
                                objectFit={"cover"}
                                className={"flex-grow"}
                                priority={i === 0}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Кнопка «Назад» */}
                <CarouselPrevious
                    className={cn(
                        "absolute left-4 top-1/2 -translate-y-1/2 z-10",
                        "bg-white text-black p-2 rounded-full shadow-md hover:bg-gray-100"
                    )}
                />

                {/* Кнопка «Вперёд» */}
                <CarouselNext
                    className={cn(
                        "absolute right-4 top-1/2 -translate-y-1/2 z-10",
                        "bg-white text-black p-2 rounded-full shadow-md hover:bg-gray-100"
                    )}
                />

                {/* Точки (dots) */}
                <div className="absolute bottom-4 left-0 w-full flex items-center justify-center gap-2 z-10">
                    {data.map((_, idx) => (
                        <div
                            key={idx}
                            onClick={() => api?.scrollTo(idx)}
                            className={cn(
                                "cursor-pointer h-2 rounded-full transition-all duration-300",
                                idx === current ? "w-8 bg-white" : "w-2 bg-gray-300"
                            )}
                        />
                    ))}
                </div>
            </Carousel>
        </section>
    )
}
