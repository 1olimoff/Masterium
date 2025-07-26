import React from 'react';
import { cn } from '@/root/business/lib/utils';
import Image from "next/image";

interface Props {
    className?: string;
    iconPath: string;
    title: string;
    alt: string;
}

export const MainCategoryItem = ({ className, iconPath, title, alt }: Props) => {
    return (
        <div
            className={cn(
                className,
                "flex flex-col items-center justify-center",
                "w-[152px] h-[90px]",
                "rounded-xl bg-white my-custom-shadow px-4 py-3"
            )}
        >
            <div className="w-8 h-8 relative mb-2">
                <Image
                    src={iconPath}
                    alt={alt}
                    width={32}
                    height={32}
                    style={{ objectFit: "contain" }}
                    className="mx-auto"
                />
            </div>
            <p className="text-sm font-medium text-center text-gray-800">
                {title}
            </p>
        </div>
    );
};