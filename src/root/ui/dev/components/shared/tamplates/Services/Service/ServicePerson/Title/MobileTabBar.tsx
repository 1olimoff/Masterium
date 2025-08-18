import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react'
import ServerLink from '../../../../../elements/Links/ServerLink';

interface UserData {
    first_name: string;
    last_name: string;
}

interface Props {
    className?: string;
    slug: string
    response: UserData;
}

export const MobileBackTab = ({ slug, response }: Props) => {
    const t = useTranslations("")
    return (
        <ServerLink path={`/services/${slug}`} className="flex items-center w-full bg-maket-primary sticky py-2 top-0 z-50 h-[35px] px-4 sm:hidden">
            <button className='flex items-center'>
                <Image src="/svg/aside/MobileTab.svg" alt="Back" width={24} height={24} />
                <p className='text-white'>{`${response.first_name} ${response.last_name}`}</p>
            </button>
        </ServerLink>
    );
};

