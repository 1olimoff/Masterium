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
      {/* Title */}
      <p className="text-xl font-semibold uppercase">
        {t('WorksPage.content.description.title')}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {[
          "Malyar - shtukatur",
          "Jismoniy shaxs",
          "Bosqichma-bosqich to'lov"
        ].map((tag, index) => (
          <span
            key={index}
            className="py-1 px-3 text-sm rounded-full bg-maket-bg text-maket-gray"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Text content */}
      <div className="flex flex-col gap-3 text-base text-maket-primary leading-relaxed">
        {Array(5).fill(null).map((_, i) => (
          <p key={i}>
            Lorem ipsum dolor sit amet consectetur. A fringilla eget quam
            fermentum mattis quisque nibh vulputate purus. Tempus hac nisl id
            mauris. Nisi sed sit aliquam ultrices in. Morbi tristique aliquam
            cursus suspendisse molestie velit egestas lacus pretium. Lectus
            neque metus tempor at aenean. A ac penatibus vehicula sed massa eu
            id cras. Fringilla elementum consequat turpis interdum ac sagittis
            malesuada.
          </p>
        ))}
      </div>
    </div>
  );
};
