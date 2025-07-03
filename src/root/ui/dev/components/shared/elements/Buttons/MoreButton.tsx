import React from 'react';
import {cn} from '@/root/business/lib/utils';
import Image from "next/image";
import ServerLink from "@/root/ui/dev/components/shared/elements/Links/ServerLink";

interface Props {
    className?: string;
    title: string;
    link?: string;
}

export const MoreButton = ({className, title, link = "/"}: Props) => {
    console.log(link);
    return (
        <ServerLink path={link}>
            <button className={cn(className, "flex gap-4 hover:gap-6 transition-all duration-200 items-center")}>
                <p className={"sm:text-lg text-[16px] text-maket-secondary"}>
                    {title}
                </p>
                <div className={"w-4 h-4 relative"}>
                    <Image src={"/svg/main/moreButton/right-arrow-sky.svg"} alt={"Right Arrow Sky"} fill
                           objectFit={"contain"}/>
                </div>
            </button>
        </ServerLink>
    );
};
