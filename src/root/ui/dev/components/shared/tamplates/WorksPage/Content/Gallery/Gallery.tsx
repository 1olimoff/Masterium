"use client"

import React, { useState, useEffect } from "react"
import { cn } from "@/root/business/lib/utils"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/root/ui/dev/shadcn/ui/carousel"
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
        <section className={cn("relative w-full flex-grow", className)}>
            <Carousel setApi={setApi} className="w-full h-full flex-grow">
                <CarouselContent className="relative w-full h-full flex-grow">
                    {data.map((item, i) => (
                        <CarouselItem
                            key={i}
                            className={cn(
                                "relative w-full",
                                "h-[220px] sm:h-[280px] md:h-[360px] lg:h-[500px] xl:h-[560px]"
                            )}
                        >
                            <Image
                                src={item.src}
                                alt={item.alt}
                                fill
                                className="object-cover rounded-xl transition-all duration-300 ease-in-out"
                            />

                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Previous */}
                <CarouselPrevious
                    className={cn(
                        "absolute left-4 top-1/2 -translate-y-1/2 z-10",
                        "bg-white text-black p-2 rounded-full shadow-md hover:bg-gray-100"
                    )}
                />

                {/* Next */}
                <CarouselNext
                    className={cn(
                        "absolute right-4 top-1/2 -translate-y-1/2 z-10",
                        "bg-white text-black p-2 rounded-full shadow-md hover:bg-gray-100"
                    )}
                />

                {/* Dots */}
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
