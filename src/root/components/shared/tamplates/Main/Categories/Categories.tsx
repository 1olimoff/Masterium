import React from 'react';
import {cn} from '@lib/utils';
import {MainCategoryItem} from "@/root/components/shared/elements/categories/MainCategoryItem";

interface Props {
    className?: string;
}

const data = [
    {
        src: "/svg/main/categories/categories-icon.svg",
        title: "Santexniklar"
    },
    {
        src: "/svg/main/categories/categories-icon.svg",
        title: "Kalit ta'mirlash"
    },
    {
        src: "/svg/main/categories/categories-icon.svg",
        title: "G'isht terish"
    },
    {
        src: "/svg/main/categories/categories-icon.svg",
        title: "Payvandchilar"
    },
    {
        src: "/svg/main/categories/categories-icon.svg",
        title: "Malyar shtukatur"
    },
    {
        src: "/svg/main/categories/categories-icon.svg",
        title: "Santexniklar"
    },
    {
        src: "/svg/main/categories/categories-icon.svg",
        title: "Kalit ta'mirlash"
    },
    {
        src: "/svg/main/categories/categories-icon.svg",
        title: "G'isht terish"
    },
    {
        src: "/svg/main/categories/categories-icon.svg",
        title: "Payvandchilar"
    },
    {
        src: "/svg/main/categories/categories-icon.svg",
        title: "Malyar shtukatur"
    },
    {
        src: "/svg/main/categories/categories-icon.svg",
        title: "Santexniklar"
    },
    {
        src: "/svg/main/categories/categories-icon.svg",
        title: "Kalit ta'mirlash"
    },
    {
        src: "/svg/main/categories/categories-icon.svg",
        title: "G'isht terish"
    },
    {
        src: "/svg/main/categories/categories-icon.svg",
        title: "Payvandchilar"
    },
    {
        src: "/svg/main/categories/categories-icon.svg",
        title: "Malyar shtukatur"
    },
]

export const Categories = ({className}: Props) => {
    return (
        <section className={cn(className, "py-4 overflow-x-auto no-scrollbar")}>
            <div className={"flex gap-4 px-2 min-w-max"}>
                {
                    data.map((item, i) => (
                        <MainCategoryItem key={i} iconPath={item.src} title={item.title} />
                    ))
                }
            </div>
        </section>
    );
};
