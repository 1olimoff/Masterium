import React from 'react';
import { cn } from '@lib/utils';
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
        alt: "Gozo",
        objectFit: "cover",
    },
    {
        src: "/img/advertising/dusel.png",
        alt: "Gozo",
        objectFit: "cover",
    },
    {
        src: "/img/advertising/hi-tech.png",
        alt: "Gozo",
        objectFit: "cover",
    },
]

export const AdGrid = ({ className }: Props) => {
    return (
        <section className={cn(className, "grid grid-cols-4 gap-4")}>
            {
                data.map((item, index) => (
                    <div className={"h-[170px] w-full relative rounded-3xl"} key={index}>
                        <Image src={item.src} alt={item.alt} fill objectFit={item.objectFit} quality={100} className={"rounded-2xl"} />
                    </div>
                ))
            }
        </section>
    );
};
