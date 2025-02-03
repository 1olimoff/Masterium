import React from 'react';
import {cn} from '@lib/utils';
import Image from "next/image";
import {useTranslations} from "next-intl";

type Item = {
    src: string;
    categories: [string];
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
        <div className={cn(className)}>
            <div className={"p-2 flex flex-col gap-3"}>
                <div className={"flex gap-1 items-center"}>
                    <div className={"relative h-4 w-4 flex items-center justify-center"}>
                        <Image src={"/svg/main/dailyWorkersCard/star-fill.svg"} alt={"This is star fill for rate"}
                               fill objectFit={"contain"}/>
                    </div>
                    <p className={"text-maket-primary"}>{data.client.rateMiddle}</p>
                    <p className={"text-sm text-maket-gray"}>({data.client.commentsCount + " " + t("Main.sections.DailyWorkers.Card.comments")})</p>
                </div>
                <div className={"flex gap-2"}>
                    <div className={"h-12 w-12 rounded-full relative"}>
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
                    </div>
                </div>
            </div>
        </div>
    );
};
