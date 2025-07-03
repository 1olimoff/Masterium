import React from 'react';
import { cn } from '@/root/business/lib/utils';
import { useTranslations } from 'next-intl';
import { MoreButton } from '@/root/ui/dev/components/shared/elements/Buttons/MoreButton';
import { OpenWorkCard } from '@/root/ui/dev/components/shared/elements/OpenWorkCard/OpenWorkCard';

interface Props {
  className?: string;
}

const data = [
  {
    title: 'Oshxonani yevro remont qilish kerak',
    category: 'Malyar - shtukatur',
    price: 12850000,
    client: {
      avatar: {
        src: '/img/advertising/gas.png',
        alt: 'Eshonov Baxodir',
      },
      name: 'Eshonov Baxodir',
      type: 'Mijoz',
      online: true,
    },
    applicationCount: 5,
  },
  {
    title: "Oshxonani  yevro remont qilish kerak",
    category: "Malyar - shtukatur",
    price: 12850000,
    client: {
      avatar: {
        src: "/img/advertising/gas.png",
        alt: "Eshonov Baxodir",
      },
      name: "Eshonov Baxodir",
      type: "Mijoz",
      online: true,
    },
    applicationCount: 7,
  },
  {
    title: "Oshxonani  yevro remont qilish kerak",
    category: "Malyar - shtukatur",
    price: 12850000,
    client: {
      avatar: {
        src: "/img/advertising/gas.png",
        alt: "Eshonov Baxodir",
      },
      name: "Eshonov Baxodir",
      type: "Mijoz",
      online: true,
    },
    applicationCount: 7,
  },
  {
    title: "Oshxonani  yevro remont qilish kerak",
    category: "Malyar - shtukatur",
    price: 12850000,
    client: {
      avatar: {
        src: "/img/advertising/gas.png",
        alt: "Eshonov Baxodir",
      },
      name: "Eshonov Baxodir",
      type: "Mijoz",
      online: true,
    },
    applicationCount: 7,
  }
  // ... other data items
];

export const OpenWorks = ({ className }: Props) => {
  const t = useTranslations('Main.sections');
  return (
    <section className={cn(className, 'w-full flex flex-col gap-4 md:gap-6')}>
      <div className="w-full flex justify-between items-center gap-2 md:gap-4">
        <h3 className="text-2xl font-semibold md:text-4xl">{t('OpenWorks.title')}</h3>
        <MoreButton className='text-[15px]' title={t('OpenWorks.more')} link="open-works" />
      </div>
      <div className="w-full overflow-x-auto scrollbar-hide md:overflow-x-auto md:scrollbar-hide lg:overflow-x-visible">
        <div
          className={cn(
            'flex flex-row gap-4 pb-4', // ✅ Mobile: horizontal scroll
            'md:gap-2 md:flex md:flex-row',     // ✅ Tablet: spacing + flex row
            'lg:grid lg:grid-cols-4 lg:gap-2' // ✅ Laptop: 4 column grid
          )}
        >
          {data.map((item, i) => (
            <div
              className={cn(
                'flex-shrink-0 w-[270px]',
                'md:flex-shrink-0 md:w-[300px]',
                'lg:w-auto'                // ✅ Laptop: avtomatik
              )}
              key={i}
            >
              <OpenWorkCard data={item} />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};