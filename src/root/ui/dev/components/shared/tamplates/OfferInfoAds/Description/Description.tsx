import React from 'react';
import { cn } from '@/root/business/lib/utils';
import { useTranslations } from "next-intl";
import { offerdetails } from '../Gallery/Gallery';

interface Props {
  className?: string;
  response:offerdetails
}

export const Description = ({ className, response }: Props) => {
  const t = useTranslations();

  return (
    <div className={cn(className, "w-full flex flex-col gap-4")}>
      {/* Title */}
      <p className="text-xl font-semibold uppercase">
        {t('WorksPage.content.description.title')}
      </p>

      <div className="flex flex-col gap-3 text-base text-maket-primary leading-relaxed">
        <p>{response.description}</p>
      </div>
    </div>
  );
};
