"use client"
import React from 'react';
import { cn } from '@lib/utils';
import Image from "next/image";

interface Props {
    className?: string;
}

export const LanguageSwitcher = ({ className }: Props) => {
    return (
        <div className={cn(className)}>
            <div className={'flex gap-2 w-[120px] border cursor-pointer overflow-hidden justify-end px-2 group'}>
                <Image src={"/svg/header/lang-icon-uz.svg"} alt={"Language UZ Icon"} width={20} height={20}/>
                <h2 className={"group-hover:underline transition-all duration-600"}>O'zbekcha</h2>
            </div>
        </div>
    );
};
