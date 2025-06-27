import React from 'react';
import { cn } from '@/root/business/lib/utils';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Button } from '@/root/ui/dev/shadcn/ui/button';
import { Link } from '@/i18n/routing';

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
};

interface Props {
  className?: string;
  data: Item;
}

export const ApplicationCard = ({ className, data }: Props) => {
  const t = useTranslations('');

  return (
    <div className={cn(
      className,
      "w-full max-w-sm p-4 rounded-2xl shadow bg-white flex flex-col gap-4"
    )}>
      {/* Avatar & Info */}
      <div className="flex gap-4 items-start">
        <div className="relative h-16 w-16 shrink-0">
          <Image
            src={data.client.avatar.src}
            alt={data.client.avatar.alt}
            fill
            className="rounded-full object-cover"
          />
          {data.client.online && (
            <div className="absolute bottom-0 right-0 h-3 w-3 bg-maket-green border-2 border-white rounded-full" />
          )}
        </div>

        <div className="flex flex-col justify-between flex-1">
          <h4 className="text-lg font-semibold">{data.client.name}</h4>
          <p className="text-sm text-maket-gray">{data.client.specialistic}</p>

          <div className="flex items-center gap-1 mt-1">
            <div className="relative w-4 h-4">
              <Image
                src="/svg/main/dailyWorkersCard/star-fill.svg"
                alt="star"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-maket-primary text-sm">{data.client.rateMiddle}</p>
            <p className="text-sm text-maket-gray">
              ({data.client.commentsCount} {t("Main.sections.DailyWorkers.Card.comments")})
            </p>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {data.categories.map((category, i) => (
          <span
            key={i}
            className="px-3 py-1 text-sm bg-maket-bg text-maket-gray rounded-full"
          >
            {category}
          </span>
        ))}
      </div>

      {/* Button */}
      {/* Shu joyi keyin yoiladi */}
      <Link
      href={""}
        className="w-full py-2 text-lg font-medium px-0 flex justify-center  bg-maket-batafsil text-maket-secondary rounded-2xl hover:bg-maket-secondary hover:text-white transition-all duration-200"
      >
        {t('Main.sections.OpenWorkCard.more')}
      </Link>
    </div>
  );
};
