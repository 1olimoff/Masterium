import React from 'react';
import { cn } from '@lib/utils';
import {MoreButton} from "@/root/components/shared/elements/Buttons/MoreButton";
import {useTranslations} from "next-intl";
import {DailyWorkersCard} from "@/root/components/shared/elements/DailyWorkersCard/DailyWorkersCard";

interface Props {
    className?: string;
}

const data = [
    {
        title: "Mehmonxona tozalash",
        category: "Uylarni tozalash",
        middleRate: 4.5,
        commentsCount: 30,
        price: 12850000,
        client: {
            avatar: {
                src: "/img/advertising/gas.png",
                alt: "Eshonov Baxodir",
            },
            name: "Eshonov Baxodir",
            type: "Xizmat ko'rsatuvchi",
            online: false,
        }
    },
    {
        title: "Mehmonxona tozalash",
        category: "Uylarni tozalash",
        middleRate: 4.5,
        commentsCount: 30,
        price: 12850000,
        client: {
            avatar: {
                src: "/img/advertising/gas.png",
                alt: "Eshonov Baxodir",
            },
            name: "Eshonov Baxodir",
            type: "Xizmat ko'rsatuvchi",
            online: false,
        }
    },
    {
        title: "Mehmonxona tozalash",
        category: "Uylarni tozalash",
        middleRate: 4.5,
        commentsCount: 30,
        price: 12850000,
        client: {
            avatar: {
                src: "/img/advertising/gas.png",
                alt: "Eshonov Baxodir",
            },
            name: "Eshonov Baxodir",
            type: "Xizmat ko'rsatuvchi",
            online: true,
        }
    },
    {
        title: "Mehmonxona tozalash",
        category: "Uylarni tozalash",
        middleRate: 4.5,
        commentsCount: 30,
        price: 12850000,
        client: {
            avatar: {
                src: "/img/advertising/gas.png",
                alt: "Eshonov Baxodir",
            },
            name: "Eshonov Baxodir",
            type: "Xizmat ko'rsatuvchi",
            online: false,
        }
    },
    {
        title: "Mehmonxona tozalash",
        category: "Uylarni tozalash",
        middleRate: 4.5,
        commentsCount: 30,
        price: 12850000,
        client: {
            avatar: {
                src: "/img/advertising/gas.png",
                alt: "Eshonov Baxodir",
            },
            name: "Eshonov Baxodir",
            type: "Xizmat ko'rsatuvchi",
            online: true,
        }
    },
    {
        title: "Mehmonxona tozalash",
        category: "Uylarni tozalash",
        middleRate: 4.5,
        commentsCount: 30,
        price: 12850000,
        client: {
            avatar: {
                src: "/img/advertising/gas.png",
                alt: "Eshonov Baxodir",
            },
            name: "Eshonov Baxodir",
            type: "Xizmat ko'rsatuvchi",
            online: false,
        }
    },
    {
        title: "Mehmonxona tozalash",
        category: "Uylarni tozalash",
        middleRate: 4.5,
        commentsCount: 30,
        price: 12850000,
        client: {
            avatar: {
                src: "/img/advertising/gas.png",
                alt: "Eshonov Baxodir",
            },
            name: "Eshonov Baxodir",
            type: "Xizmat ko'rsatuvchi",
            online: false,
        }
    },
    {
        title: "Mehmonxona tozalash",
        category: "Uylarni tozalash",
        middleRate: 4.5,
        commentsCount: 30,
        price: 12850000,
        client: {
            avatar: {
                src: "/img/advertising/gas.png",
                alt: "Eshonov Baxodir",
            },
            name: "Eshonov Baxodir",
            type: "Xizmat ko'rsatuvchi",
            online: false,
        }
    },
]

export const DailyWorkers = ({ className }: Props) => {
    const t = useTranslations("")
    return (
        <section className={cn(className, "w-full flex flex-col gap-4")}>
            <div className={"w-full flex justify-between gap-2"}>
                <h3 className={"text-3xl font-semibold"}>{t("Main.sections.DailyWorkers.title")}</h3>
                <MoreButton title={t("Main.sections.OpenWorks.more")}/>
            </div>
            <div className={"w-full grid grid-cols-4 gap-4"}>
                {
                    data.map((item, index) => (
                        <DailyWorkersCard data={item} key={index} />
                    ))
                }
            </div>
        </section>
    );
};
