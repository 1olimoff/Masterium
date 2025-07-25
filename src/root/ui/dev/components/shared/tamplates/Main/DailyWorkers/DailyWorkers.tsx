import React from 'react';
import { fetchDailyWorkers } from '@/root/business/api/main/dailyworkers/fetchDailyWorkers';
import { DailyWorkersClient } from './DailyWorkersClient';

interface Props {
  className?: string;
}

const CDN_URL = "https://cdn.masterium.uz";

export const DailyWorkers = async ({ className }: Props) => {
  const dailyWorkersRaw = await fetchDailyWorkers();

  const dailyWorkers = dailyWorkersRaw.map((worker: any) => ({
    title: `${worker.first_name} ${worker.last_name}`,
    category: worker.categories?.[0]?.name || '',
    price: worker.price,
    middleRate: worker.rating,
    commentsCount: worker.comments_count,
    client: {
      avatar: {
        src: `${process.env.BASE_URL}${worker.profile_photo}`,
        alt: `${worker.first_name} ${worker.last_name}`,
      },
      name: `${worker.first_name} ${worker.last_name}`,

    },
  }));

  return (
    <DailyWorkersClient className={className} dailyWorkers={dailyWorkers} />
  );
};
