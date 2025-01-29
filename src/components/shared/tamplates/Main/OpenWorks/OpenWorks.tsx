import React from 'react';
import {cn} from '@lib/utils';
import {useTranslations} from "next-intl";
import {MoreButton} from "@/components/shared/elements/Buttons/MoreButton";
import {OpenWorkCard} from "@/components/shared/elements/OpenWorkCard/OpenWorkCard";

interface Props {
    className?: string;
}

const data = [
    {
        title: "Oshxonani  yevro remont qilish kerak",
        category: "Malyar - shtukatur",
        price: 12850000,
        client: {
            avatar: {
                src: "/img/advertising/gas.png",
                alt: "Eshonov Baxodir",
            },
            name: "Eshonov Baxodir",
            type: "Mijoz",
            online: true,
        }
    },
    {
        title: "Oshxonani  yevro remont qilish kerak",
        category: "Malyar - shtukatur",
        price: 12850000,
        client: {
            avatar: {
                src: "/img/advertising/gas.png",
                alt: "Eshonov Baxodir",
            },
            name: "Eshonov Baxodir",
            type: "Mijoz",
            online: false,
        }
    },
    {
        title: "Oshxonani  yevro remont qilish kerak",
        category: "Malyar - shtukatur",
        price: 12850000,
        client: {
            avatar: {
                src: "/img/advertising/gas.png",
                alt: "Eshonov Baxodir",
            },
            name: "Eshonov Baxodir",
            type: "Mijoz",
            online: true,
        }
    },
    {
        title: "Oshxonani  yevro remont qilish kerak",
        category: "Malyar - shtukatur",
        price: 12850000,
        client: {
            avatar: {
                src: "/img/advertising/gas.png",
                alt: "Eshonov Baxodir's Image",
            },
            name: "Eshonov Baxodir",
            type: "Mijoz",
            online: true,
        }
    },
]

export const OpenWorks = ({className}: Props) => {
    const t = useTranslations("Main.sections");
    return (
        <section className={cn(className, "w-full flex flex-col gap-4")}>
            <div className={"w-full flex justify-between gap-2"}>
                <h3 className={"text-3xl font-semibold"}>{t("OpenWorks.title")}</h3>
                <MoreButton title={t("OpenWorks.more")} />
            </div>
            <div className={"w-full grid grid-cols-4 gap-4"}>
                {
                    data.map((item, i) => {
                        return (
                            <OpenWorkCard data={item} key={i} />
                        )
                    })
                }
            </div>
        </section>
    );
};
