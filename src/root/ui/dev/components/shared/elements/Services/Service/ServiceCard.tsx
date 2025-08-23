import React from 'react';
import { cn } from '@/root/business/lib/utils';
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/root/ui/dev/shadcn/ui/button";
import ServerLink from '../../Links/ServerLink';



type Item = {
    user_uuid: string;
    profile_photo: string;
    first_name: string;
    last_name: string;
    rating: number;
    comments_count: number;
    name: string;
    category_id: number;
    categories: { id: number; name: string }[];
    tags?: { category_id: number; id: number; name: string }[];
};

interface Props {
    className?: string;
    data: Item;
    href?: string;
    slug: string

}

export const ServiceCard = ({ className, data, slug }: Props) => {
    const t = useTranslations('');

    return (
        <div className={cn(className, "p-4 rounded-2xl shadow flex flex-col gap-3 bg-white relative pb-20")}>
            {/* User Info */}
            <div className={"flex gap-3"}>
                <div className={"h-16 w-16 rounded-full relative overflow-hidden"}>
                    <Image
                        src={`${data.profile_photo}`}
                        alt={data.name}
                        width={64}
                        height={64}
                        className={"rounded-full h-full object-cover"}
                    />
                </div>
                <div className={"flex flex-col justify-between h-full"}>
                    <h4 className={"text-lg font-semibold"}>{data.first_name}</h4>
                    {data.categories.map((category, i) => (
                        <p key={i} className={"text-maket-gray rounded-full"}>{category.name}</p>
                    ))}
                    <div className={"flex gap-1 items-center"}>
                        <div className={"relative h-4 w-4 flex items-center justify-center"}>
                            <Image
                                src={"/svg/main/dailyWorkersCard/star-fill.svg"}
                                alt={"This is star fill for rate"}
                                width={16}
                                height={16}
                                className={"object-contain"}
                            />
                        </div>
                        <p className={"text-maket-primary"}>{data.rating}</p>
                        <p className={"text-sm text-maket-gray"}>({data.comments_count} {t("Main.sections.DailyWorkers.Card.comments")})</p>
                    </div>
                </div>
            </div>

            <div className={"flex flex-wrap gap-2"}>
                {data.categories.map((category, i) => (
                    <p key={i} className={"text-maket-gray bg-maket-bg rounded-full px-4 py-1"}>{category.name}</p>
                ))}
                {data.tags && data.tags.map((tag, i) => (
                    <p key={`tag-${i}`} className={"text-maket-gray bg-maket-bg rounded-full px-4 py-1"}>{tag.name}</p>
                ))}
            </div>

            <div className="absolute bottom-4 left-4 right-4">
                <ServerLink
                    path={`services/${slug}/${data.user_uuid}`}
                    className={"bg-maket-batafsil text-maket-secondary text-center text-xl font-medium py-2 rounded-2xl hover:bg-maket-secondary hover:text-white transition-all duration-200 w-full block"}
                >
                    {t('Main.sections.OpenWorkCard.more')}
                </ServerLink>
            </div>
        </div>
    );
};
