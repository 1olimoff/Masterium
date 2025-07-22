import { Link } from '@/root/business/locales/i18n/routing';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react'
import ServerLink from '../../../elements/Links/ServerLink';

export const MobileBackTab = () => {
const t = useTranslations("OfferWork.Offers.breadcrumb")
  return (
    <ServerLink path={""} className="flex items-center w-full bg-maket-primary sticky py-2 top-0 z-50 h-[35px] px-2 sm:hidden">
        <button className='flex items-center gap-2'> 
        <Image src="/svg/aside/MobileTab.svg" alt="Back" width={24} height={24} />
        <p className='text-white'>{t("offers")}</p>
        </button>
    </ServerLink>
  );
};

