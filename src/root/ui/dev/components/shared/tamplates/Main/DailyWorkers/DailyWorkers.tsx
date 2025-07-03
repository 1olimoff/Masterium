import React from 'react';
import { cn } from '@/root/business/lib/utils';
import { MoreButton } from "@/root/ui/dev/components/shared/elements/Buttons/MoreButton";
import { useTranslations } from "next-intl";
import { DailyWorkersCard } from "@/root/ui/dev/components/shared/elements/DailyWorkersCard/DailyWorkersCard";
import { Link } from '@/i18n/routing';

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
    const t = useTranslations('Main.sections');
    return (
        <section className={cn(className, 'w-full flex flex-col gap-4 md:gap-6')}>
            <div className="w-full flex justify-between items-center gap-2 md:gap-4">
                <h3 className="text-2xl font-semibold md:text-4xl">{t('DailyWorkers.title')}</h3>
                <MoreButton title={t('OpenWorks.more')} link="services/slug" />
            </div>
            <div className="w-full overflow-x-auto scrollbar-hide md:overflow-x-auto md:scrollbar-hide lg:overflow-x-visible">
                <div
                    className={cn(
                        'flex flex-row gap-4 pb-4',           
                        'md:flex md:gap-6 md:pb-4',           
                        'lg:grid lg:grid-cols-4 lg:gap-6'  
                    )}
                >
                    {data.map((item, index) => (
                        <div
                            className={cn(
                                'flex-shrink-0 w-[270px]',         
                                'md:flex-shrink-0 md:w-[300px]',   
                                'lg:w-auto'                      
                            )}
                            key={index}
                        ><Link  href="tashkent/services/wswws">
                            <DailyWorkersCard data={item} />
                        </Link>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
};
