import React from 'react';
import {cn} from '@lib/utils';
import Image from "next/image";

interface Props {
    className?: string;
    title: string;
    link?: string;
}

export const MoreButton = ({className, title, link = "/"}: Props) => {
    console.log(link);
    return (
        <button className={cn(className, "flex gap-4 hover:gap-6 transition-all duration-200 items-center")}>
            <p className={"text-lg text-maket-secondary"}>
                {title}
            </p>
            <div className={"w-4 h-4 relative"}>
                <Image src={"/svg/main/moreButton/right-arrow-sky.svg"} alt={"Right Arrow Sky"} fill
                       objectFit={"contain"}/>
            </div>
        </button>
    );
};
