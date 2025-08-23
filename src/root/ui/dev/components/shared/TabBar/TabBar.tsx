'use client'
import React from 'react'
import { TabItem } from './Homepage/TabItem'
import { usePathname } from 'next/navigation'
import Cookies from 'js-cookie'

interface Props {
    token: string | null;
}

export default function TabBar({token}: Props) {
    const pathname = usePathname();
    const region = Cookies.get("region") || "tashkent";
    const locale = Cookies.get("locale") || "uz";

    // pathname'dan locale va region'ni olib tashlash
    const getBasePath = (path: string) => {
        const basePath = path.replace(`/${locale}/${region}`, '');
        return basePath === '' ? '/' : basePath;
    };

    const tabItemArr = [
        {
            href: '/',
            label: 'Asosiy',
            icon: 'home',
        },
        {
            href: '/services',
            label: 'Katalog',
            icon: 'catalog',
        },
        {
            href: '/advertise',
            label: "Qo'shish",
            icon: 'add',
        },
        {
            href: '/myads',
            label: "E'lonlar",
            icon: 'ads',
        },
        {
            href: '/myprofile',
            label: 'Profil',
            icon: 'profile',
        },
    ];

    return (
        <div className="sticky bottom-0 left-0 z-50 w-full bg-white sm:hidden shadow-[0_-4px_12px_-1px_rgba(0,0,0,0.1)]">
            <div className="flex items-center justify-between px-2 py-2 h-[64px]">
                {tabItemArr.map((item) => (
                    <TabItem
                        token={token}
                        key={item.href}
                        href={item.href}
                        icon={item.icon}
                        label={item.label}
                        isActive={getBasePath(pathname) === item.href}
                    />
                ))}
            </div>
        </div>
    );
}