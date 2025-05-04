import React from 'react';
import {cn} from '@/root/business/lib/utils';
import {OpenWorkCard} from "@/root/components/shared/elements/OpenWorkCard/OpenWorkCard";
import {useTranslations} from "next-intl";
import {MoreButton} from "@/root/components/shared/elements/Buttons/MoreButton";

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
    }
]

export const Similar = ({className}: Props) => {
    const t = useTranslations('')
    return (
        <section className={cn(className, "flex flex-col gap-6")}>
            <div className={"w-full flex justify-between"}>
                <h3 className={"text-3xl font-semibold"}>
                    {t('WorksPage.similar.title')}
                </h3>
                <MoreButton title={t('WorksPage.similar.more')} link={"open-works"} />
            </div>
            <div className="w-full grid grid-cols-4 gap-x-4 gap-y-10">
                {data.map((item, i) => (
                    <OpenWorkCard data={item} key={i}/>
                ))}
            </div>
        </section>
    );
};
