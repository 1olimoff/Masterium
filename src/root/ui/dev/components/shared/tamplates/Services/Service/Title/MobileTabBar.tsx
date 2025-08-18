import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react'
import ServerLink from '../../../../elements/Links/ServerLink';


interface Props {
  className?: string;
  slug: string
}

export const MobileBackTab = ({slug }: Props) => {
const t = useTranslations("")
  return (
    <ServerLink path={"/services"} className="flex items-center w-full bg-maket-primary sticky py-2 top-0 z-50 h-[35px] px-4 sm:hidden">
        <button className='flex items-center'> 
        <Image src="/svg/aside/MobileTab.svg" alt="Back" width={24} height={24} />
        <p className='text-white'>{t(`Services.Service.breadcrumb.${slug}`)}</p>
        </button>
    </ServerLink>
  );
};

