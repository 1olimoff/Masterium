import React from 'react';
import {cn} from '@lib/utils';
import Image from "next/image";

interface Props {
    className?: string;
    iconPath: string;
    title: string;
}

export const MainCategoryItem = ({className, iconPath, title}: Props) => {
    return (
        <div className={cn(className, "relative w-[132px] h-[120px] px-2 py-4 flex flex-col gap-6 rounded-xl")}>
            <div className={'w-12 h-12 relative'}>
                <Image src={iconPath} alt={`${title} Icon`} fill objectFit={"contain"}/>
            </div>
            <p>{title}</p>
        </div>
    );
};
