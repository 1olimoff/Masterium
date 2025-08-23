import React from 'react';
import { fetchDailyWorkers } from '@/root/business/api/main/dailyworkers/fetchDailyWorkers';
import { DailyWorkersClient } from './DailyWorkersClient';

interface Props {
  className?: string;
}

export const DailyWorkers = async ({ className }: Props) => {
  const dailyWorkersRaw = await fetchDailyWorkers();

  const dailyWorkers = dailyWorkersRaw.map((worker: any) => ({
    user_uuid: worker.user_uuid,
    title: `${worker.first_name} ${worker.last_name}`,
    category: worker.categories?.[0]?.name || '',
    categorySlug: worker.categories?.[0]?.slug || '', // ✅ slug qo‘shildi
    price: worker.price,
    middleRate: worker.rating,
    commentsCount: worker.comments_count,
    client: {
      avatar: {
        src: worker.profile_photo, // ✅ endi to‘liq url backenddan keladi
        alt: `${worker.first_name} ${worker.last_name}`,
      },
      name: `${worker.first_name} ${worker.last_name}`,
      type: worker.categories?.[0]?.name || '', // card uchun kerak
      online: false,
    },
  }));

  return (
    <DailyWorkersClient className={className} dailyWorkers={dailyWorkers} />
  );
};
