import React from 'react';
import {cn} from '@lib/utils';
import Image from "next/image";

interface Props {
    className?: string;
    iconPath: string;
    title: string;
}


export const MainCategoryItem = ({ className, iconPath, title }: Props) => {
    return (
        <div
            className={cn(
                className,
                "relative flex flex-col",
                "w-[132px] h-[120px]",
                "rounded-xl my-custom-shadow px-3 py-4"
            )}
        >
            <div className="w-8 h-8 relative mb-2">
                <Image src={iconPath} alt={`${title} Icon`} fill style={{ objectFit: "contain" }} />
            </div>
            {/* Текст в одну строку, с обрезкой, чтобы не ломать высоту */}
            <p className=" w-full">
                {title}
            </p>
        </div>
    )
}

