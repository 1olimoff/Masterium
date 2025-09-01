import { Link } from '@/root/business/locales/i18n/routing';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react'
import ServerLink from '../../../elements/Links/ServerLink';
import { offerdetails } from '../Gallery/Gallery';

interface Props {
  response: offerdetails
}

export const MobileBackTab = ({ response }: Props) => {
  const t = useTranslations("")
  return (
    <ServerLink path={""} className="flex items-center w-full bg-maket-primary sticky py-2 gap-2 top-0 z-50 h-[35px] px-3 sm:hidden">
      <button className='flex items-center'>
        <Image src="/svg/aside/MobileTab.svg" alt="Back" width={24} height={24} />
        <p className='text-white'>{response.title}</p>
      </button>
    </ServerLink>
  );
};

