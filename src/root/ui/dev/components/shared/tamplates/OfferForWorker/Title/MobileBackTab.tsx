import { Link } from '@/root/business/locales/i18n/routing';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react'

export const MobileBackTab = () => {
const t = useTranslations("")
  return (
    <Link href={""} className="flex items-center w-full bg-maket-primary sticky py-2 gap-2 top-0 z-50 h-[35px] px-4 sm:hidden">
        <button className='flex items-center'> 
        <Image src="/svg/aside/MobileTab.svg" alt="Back" width={24} height={24} />
        <p className='text-white'>{t("OfferForWorkers.breadcrumb.myoffers")}</p>
        </button>
    </Link>
  );
};

