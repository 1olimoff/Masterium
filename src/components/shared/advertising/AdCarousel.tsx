"use client"

import React, {useState, useEffect} from 'react';
import { cn } from '@lib/utils';
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi} from "@/components/ui/carousel";
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
]

export const AdCarousel = ({ className }: Props) => {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (!api) {
            return
        }

        setCurrent(api.selectedScrollSnap() + 1)


        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])
    return (
        <div className={cn(className, "px-12 border border-black")}>
            <Carousel setApi={setApi}>
                <CarouselContent className={"w-full"}>
                    {
                        data.map((item, i) => (
                            <CarouselItem className={"h-[300px] w-full"} key={i}>
                                <div className="relative w-full h-full">
                                    <Image
                                        src={item.src}
                                        alt={item.alt}
                                        fill
                                        objectFit={item.objectFit}
                                        className={`rounded`}
                                        priority={i === 0}
                                        // При необходимости: priority={i === 0} // подгружать первый слайд приоритетно
                                    />
                                </div>
                            </CarouselItem>
                        ))
                    }
                <CarouselPrevious/>
                <CarouselNext/>
                </CarouselContent>
            </Carousel>
        </div>
    );
};
