"use client";
import React, { useEffect, useRef } from 'react';
import { cn } from '@/root/business/lib/utils';
import Image from "next/image";

interface Props {
    className?: string;
}

const data = [
    {
        src: "/img/advertising/gozo.png",
        alt: "Gozo",
        objectFit: "cover",
    },
    {
        src: "/img/advertising/honadon.png",
        alt: "Honadon",
        objectFit: "cover",
    },
    {
        src: "/img/advertising/dusel.png",
        alt: "Dusel",
        objectFit: "cover",
    },
    {
        src: "/img/advertising/hi-tech.png",
        alt: "Hi-tech",
        objectFit: "cover",
    },
];

export const AdGrid = ({ className }: Props) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        const interval = setInterval(() => {
            container.scrollLeft += 1;
            // Reset to start if reached the end
            if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
                container.scrollLeft = 0;
            }
        }, 20); // Adjust speed by changing interval

        return () => clearInterval(interval);
    }, []);

    return (
        <section
            ref={scrollRef}
            className={cn(
                className,
                "flex gap-4 w-full max-w-[1500px] overflow-x-auto scrollbar-hide"
            )}
        >
            {
                data.map((item, index) => (
                    <div
                        key={index}
                        className="max-w-[350px] w-full h-[170px] relative rounded-3xl flex-shrink-0"
                    >
                        <Image
                            src={item.src}
                            alt={item.alt}
                            fill
                            objectFit={item.objectFit}
                            quality={100}
                            className="rounded-2xl"
                        />
                    </div>
                ))
            }
        </section>
    );
};
