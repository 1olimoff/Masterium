import React from 'react';
import {cn} from '@/root/business/lib/utils';
import Image from "next/image";
import {useTranslations} from "next-intl";
import {Button} from "@/root/components/ui/button";

type Item = {
    src: string;
    categories: string[];
    client: {
        avatar: {
            src: string;
            alt: string;
        };
        name: string;
        specialistic: string;
        online: boolean;
        rateMiddle: number;
        commentsCount: number;
    };
}

interface Props {
    className?: string;
    data: Item
}

export const ServiceCard = ({className, data}: Props) => {
    const t = useTranslations('')
    return (
        <div className={cn(className, "p-4 rounded-2xl shadow flex flex-col gap-3 bg-white")}>
            <div className={"flex gap-3"}>
                <div className={"h-16 w-16 rounded-full relative"}>
                    <Image src={data.client.avatar.src} alt={data.client.avatar.alt} fill objectFit={"cover"}
                           className={"rounded-full"}/>
                    {
                        data.client.online && (
                            <div
                                className={"absolute bottom-0 right-0 h-3 w-3 border-2 border-white rounded-full bg-maket-green"}>
                            </div>
                        )
                    }
                </div>
                <div className={"flex flex-col justify-between h-full"}>
                    <h4 className={"text-lg font-semibold"}>{data.client.name}</h4>
                    <p className={"text-maket-gray"}>{data.client.specialistic}</p>
                    <div className={"flex gap-1 items-center"}>
                        <div className={"relative h-4 w-4 flex items-center justify-center"}>
                            <Image src={"/svg/main/dailyWorkersCard/star-fill.svg"} alt={"This is star fill for rate"}
                                   fill objectFit={"contain"}/>
                        </div>
                        <p className={"text-maket-primary"}>{data.client.rateMiddle}</p>
                        <p className={"text-sm text-maket-gray"}>({data.client.commentsCount + " " + t("Main.sections.DailyWorkers.Card.comments")})</p>
                    </div>
                </div>
            </div>
            <div className={"flex flex-wrap gap-2"}>
                {data.categories.map((category:string, i:number) => (
                    <p className={"text-maket-gray bg-maket-bg rounded-full px-4 py-1"} key={i}>{category}</p>
                ))}
            </div>
            <Button
                className={"bg-maket-batafsil text-maket-secondary text-xl font-medium py-6 rounded-2xl hover:bg-maket-secondary hover:text-white transition-all duration-200"}>
                {t('Main.sections.OpenWorkCard.more')}
            </Button>
        </div>
    );
};
