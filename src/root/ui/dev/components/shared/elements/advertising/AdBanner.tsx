import React from 'react';
import { cn } from '@/root/business/lib/utils';
import Image from "next/image";

interface Props {
    className?: string;
}

export const AdBanner = ({ className }: Props) => {
    return (
        <section className={cn(className,"w-full h-[300px] md:flex hidden rounded-3xl relative")}>
            <Image src={"/img/advertising/image.png"} alt={"Advertising Banner"} fill objectFit={"cover"} className={"rounded-3xl w-[100%] my-custom-shadow"} />
        </section>
    );
};
