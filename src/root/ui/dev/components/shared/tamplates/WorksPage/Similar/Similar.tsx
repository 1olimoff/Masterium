import React from 'react';
import {cn} from '@/root/business/lib/utils';
import {OpenWorkCard} from "@/root/ui/dev/components/shared/elements/OpenWorkCard/OpenWorkCard";
import {useTranslations} from "next-intl";
import {MoreButton} from "@/root/ui/dev/components/shared/elements/Buttons/MoreButton";

interface Props {
    className?: string;
}

const data = [
    {
        title: "Oshxonani  yevro remont qilish kerak",
        category: "Malyar - shtukatur",
        applicationCount: 5,
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
        applicationCount: 5,
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
        applicationCount: 5,
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
        applicationCount: 5,
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
export const Similar = ({ className }: Props) => {
    const t = useTranslations('');

    return (
        <section className={cn(
            className,
            "hidden sm:flex flex-col gap-6" // 👈 faqat sm+ ekranlarda ko‘rinadi
        )}>
            <div className="w-full flex justify-between items-center">
                <h3 className="text-3xl font-semibold">
                    {t('WorksPage.similar.title')}
                </h3>
                <MoreButton title={t('WorksPage.similar.more')} link="open-works" />
            </div>

            {/* Grid view, scroll emas — sm+ ekranlar uchun */}
            <div className="grid gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {data.map((item, i) => (
                    <OpenWorkCard data={item} key={i} />
                ))}
            </div>
        </section>
    );
};
