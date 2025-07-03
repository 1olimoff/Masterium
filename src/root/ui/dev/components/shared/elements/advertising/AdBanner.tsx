import React from 'react';
import { cn } from '@/root/business/lib/utils';
import Image from "next/image";

interface Props {
    className?: string;
}

export const AdBanner = ({ className }: Props) => {
    return (
        <section className={cn(className,"w-full sm:h-[210px] h-[150px] md:h-[300px] flex rounded-3xl relative")}>
            <Image src={"/img/advertising/image.png"} alt={"Advertising Banner"} fill objectFit={"contain"} className={"rounded-2xl w-[100%] h-full my-custom-shadow"} />
        </section>
    );
};
