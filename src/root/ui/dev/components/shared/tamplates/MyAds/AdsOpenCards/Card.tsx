import React from 'react';
import { useTranslations } from "next-intl";
import { Card } from './Cards/Card';



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
        },
        applicationCount: 5
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
        },
        applicationCount: 0
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
        },
        applicationCount: 2
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
        },
        applicationCount: 0
    },
]

export const MyAdsPage = ({ className }: Props) => {
    const t = useTranslations('');

    return (
        <div className="flex flex-col sm:flex-row flex-wrap items-center sm:items-start gap-4 sm:gap-6 px-4">
            {data.map((item, i) => (
                <div className="w-full sm:w-auto flex justify-center" key={i}>
                    <Card data={item} />
                </div>
            ))}
        </div>
    );
};



