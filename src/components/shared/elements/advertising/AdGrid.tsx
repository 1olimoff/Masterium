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
        objectFit: "contain",
    },
    {
        src: "/img/advertising/honadon.png",
        alt: "Gozo",
        objectFit: "contain",
    },
    {
        src: "/img/advertising/dusel.png",
        alt: "Gozo",
        objectFit: "contain",
    },
    {
        src: "/img/advertising/hi-tech.png",
        alt: "Gozo",
        objectFit: "contain",
    },
]

export const AdGrid = ({ className }: Props) => {
    return (
        <div className={cn(className, "grid grid-cols-4 gap-4")}>
            {
                data.map((item, index) => (
                    <div className={"h-[200px] w-full"} key={index}>
                        <Image src={item.src} alt={item.alt} fill objectFit={item.objectFit} />
                    </div>
                ))
            }
        </div>
    );
};
