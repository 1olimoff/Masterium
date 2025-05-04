import React from 'react';
import { cn } from '@/root/business/lib/utils';
import {useTranslations} from "next-intl";

interface Props {
    className?: string;
}

export const Description = ({ className }: Props) => {
    const t  = useTranslations();
    return (
        <div className={cn(className, "w-full h-full flex flex-col gap-3")}>
            <p className={"text-xl font-semibold uppercase"}>{t('WorksPage.content.description.title')}</p>
            <div className={"flex gap-3"}>
                <p className={"py-2 px-4 rounded-full bg-maket-bg text-maket-gray"}>Malyar - shtukatur</p>
                <p className={"py-2 px-4 rounded-full bg-maket-bg text-maket-gray"}>Jismoniy shaxs</p>
                <p className={"py-2 px-4 rounded-full bg-maket-bg text-maket-gray"}>Bosqichma-bosqich to'lov</p>
            </div>
            <p className={"text-lg"}>
                Lorem ipsum dolor sit amet consectetur. A fringilla eget quam fermentum mattis quisque nibh vulputate purus. Tempus hac nisl id mauris. Nisi sed sit aliquam ultrices in. Morbi tristique aliquam cursus suspendisse molestie velit egestas lacus pretium. Lectus neque metus tempor at aenean. A ac penatibus vehicula sed massa eu id cras. Fringilla elementum consequat turpis interdum ac sagittis malesuada.
            </p><p className={"text-lg"}>
                Lorem ipsum dolor sit amet consectetur. A fringilla eget quam fermentum mattis quisque nibh vulputate purus. Tempus hac nisl id mauris. Nisi sed sit aliquam ultrices in. Morbi tristique aliquam cursus suspendisse molestie velit egestas lacus pretium. Lectus neque metus tempor at aenean. A ac penatibus vehicula sed massa eu id cras. Fringilla elementum consequat turpis interdum ac sagittis malesuada.
            </p><p className={"text-lg"}>
                Lorem ipsum dolor sit amet consectetur. A fringilla eget quam fermentum mattis quisque nibh vulputate purus. Tempus hac nisl id mauris. Nisi sed sit aliquam ultrices in. Morbi tristique aliquam cursus suspendisse molestie velit egestas lacus pretium. Lectus neque metus tempor at aenean. A ac penatibus vehicula sed massa eu id cras. Fringilla elementum consequat turpis interdum ac sagittis malesuada.
            </p><p className={"text-lg"}>
                Lorem ipsum dolor sit amet consectetur. A fringilla eget quam fermentum mattis quisque nibh vulputate purus. Tempus hac nisl id mauris. Nisi sed sit aliquam ultrices in. Morbi tristique aliquam cursus suspendisse molestie velit egestas lacus pretium. Lectus neque metus tempor at aenean. A ac penatibus vehicula sed massa eu id cras. Fringilla elementum consequat turpis interdum ac sagittis malesuada.
            </p><p className={"text-lg"}>
                Lorem ipsum dolor sit amet consectetur. A fringilla eget quam fermentum mattis quisque nibh vulputate purus. Tempus hac nisl id mauris. Nisi sed sit aliquam ultrices in. Morbi tristique aliquam cursus suspendisse molestie velit egestas lacus pretium. Lectus neque metus tempor at aenean. A ac penatibus vehicula sed massa eu id cras. Fringilla elementum consequat turpis interdum ac sagittis malesuada.
            </p>
        </div>
    );
};
