'use client'
import React, { useState } from 'react'
import { TabItem } from './Homepage/TabItem'
import { usePathname } from 'next/navigation'

export default function TabBar() {
    const pathname = usePathname();
    const [activeItem, setActiveItem] = useState(pathname); // boshlang‘ich active

    const tabItemArr = [
        {
            href: '/uz/tashkent',
            label: 'Asosiy',
            icon: 'home',
        },
        {
            href: '/uz/tashkent/services',
            label: 'Katalog',
            icon: 'catalog',
        },
        {
            href: '/uz/tashkent/services/service',
            label: "Qo'shish",
            icon: 'add',
        },
        {
            href: '/uz/tashkent/myads',
            label: "E'lonlar",
            icon: 'ads',
        },
        {
            href: '/uz/tashkent/offer-works',
            label: 'Profil',
            icon: 'profile',
        },
    ];

    return (
        <div className='fixed bottom-0 left-0 z-50 w-full bg-white sm:hidden shadow-[0_-4px_12px_-1px_rgba(0,0,0,0.1)]'>
            <div className='flex items-center justify-between px-2 py-2'>
                {tabItemArr.map((item) => (
                    <TabItem
                        key={item.href}
                        href={item.href}
                        icon={item.icon}
                        label={item.label}
                        isActive={activeItem === item.href}
                        onClick={() => setActiveItem(item.href)}
                    />
                ))}
            </div>
        </div>
    );
}
