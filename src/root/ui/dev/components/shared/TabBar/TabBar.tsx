'use client'
import React from 'react'
import { TabItem } from './Homepage/TabItem'
import { usePathname } from 'next/navigation'

interface Props {
    token: string | null; // token string yoki null bo‘lishi mumkin
}

export default function TabBar({token}:Props) {
    const pathname = usePathname(); // faqat shu orqali active aniqlanadi

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
            href: '/uz/tashkent/advertise',
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
        <div className="sticky bottom-0 left-0 z-50 w-full bg-white sm:hidden shadow-[0_-4px_12px_-1px_rgba(0,0,0,0.1)]">
            <div className="flex items-center justify-between px-2 py-2 h-[64px]">
                {tabItemArr.map((item) => (
                    <TabItem
                        token={token}
                        key={item.href}
                        href={item.href}
                        icon={item.icon}
                        label={item.label}
                        isActive={pathname === item.href}
                    />
                ))}
            </div>
        </div>
    );
}
