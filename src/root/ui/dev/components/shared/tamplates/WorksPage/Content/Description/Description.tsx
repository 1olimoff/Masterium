import React from 'react';
import { cn } from '@/root/business/lib/utils';
import { useTranslations } from "next-intl";

interface Props {
    className?: string;
}

export const Description = ({ className }: Props) => {
    const t = useTranslations();

    return (
        <div className={cn(className, "w-full flex flex-col gap-4")}>
            <p className="text-xl font-semibold uppercase">
                {t('WorksPage.content.description.title')}
            </p>

            {/* Tags section */}
            <div className="flex flex-wrap gap-2">
                <span className="py-2 px-4 rounded-full bg-maket-bg text-maket-gray text-sm whitespace-nowrap">
                    Malyar - shtukatur
                </span>
                <span className="py-2 px-4 rounded-full bg-maket-bg text-maket-gray text-sm whitespace-nowrap">
                    Jismoniy shaxs
                </span>
                <span className="py-2 px-4 rounded-full bg-maket-bg text-maket-gray text-sm whitespace-nowrap">
                    Bosqichma-bosqich to'lov
                </span>
            </div>

            {/* Description text */}
            <div className="space-y-4 text-base leading-relaxed text-gray-800">
                <p>Lorem ipsum dolor sit amet consectetur. A fringilla eget quam fermentum mattis quisque nibh vulputate purus. Tempus hac nisl id mauris. Nisi sed sit aliquam ultrices in. Morbi tristique aliquam cursus suspendisse molestie velit egestas lacus pretium. Lectus neque metus tempor at aenean. A ac penatibus vehicula sed massa eu id cras. Fringilla elementum consequat turpis interdum ac sagittis malesuada.

                    .</p>
                <p>Lorem ipsum dolor sit amet consectetur. A fringilla eget quam fermentum mattis quisque nibh vulputate purus...</p>
                <p>Lorem ipsum dolor sit amet consectetur. A fringilla eget quam fermentum mattis quisque nibh vulputate purus. Tempus hac nisl id mauris. Nisi sed sit aliquam ultrices in. Morbi tristique aliquam cursus suspendisse molestie velit egestas lacus pretium. Lectus neque metus tempor at aenean. A ac penatibus vehicula sed massa eu id cras. Fringilla elementum consequat turpis interdum ac sagittis malesuada.

                    .</p>
                <p>Lorem ipsum dolor sit amet consectetur. A fringilla eget quam fermentum mattis quisque nibh vulputate purus. Tempus hac nisl id mauris. Nisi sed sit aliquam ultrices in. Morbi tristique aliquam cursus suspendisse molestie velit egestas lacus pretium. Lectus neque metus tempor at aenean. A ac penatibus vehicula sed massa eu id cras. Fringilla elementum consequat turpis interdum ac sagittis malesuada.

                    .</p>
                <p>Lorem ipsum dolor sit amet consectetur. A fringilla eget quam fermentum mattis quisque nibh vulputate purus. Tempus hac nisl id mauris. Nisi sed sit aliquam ultrices in. Morbi tristique aliquam cursus suspendisse molestie velit egestas lacus pretium. Lectus neque metus tempor at aenean. A ac penatibus vehicula sed massa eu id cras. Fringilla elementum consequat turpis interdum ac sagittis malesuada.

                    .</p>

            </div>
        </div>
    );
};
