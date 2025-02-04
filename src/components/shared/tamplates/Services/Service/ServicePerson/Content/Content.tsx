"use client"
import React, { useState } from 'react';
import { cn } from '@lib/utils';

interface Props {
    className?: string;
}

/**
 * Примерные данные вкладок: заголовок и контент.
 * Вместо текстового контента вы можете подключить свои компоненты,
 * например блок «Уста haqida», «Ish tajribasi», «Izohlar», и т.д.
 */
const TABS = [
    {
        label: 'Ma’lumot',
        content: (
            <div>
                <h2 className="text-xl font-semibold mb-2">Уста haqida</h2>
                <p className="text-sm">
                    Gravida elementum diam fames dignissim sed donec nisi diam. Quisque feugiat ut
                    rutrum fringilla id urna vitae pharetra amet.
                </p>
            </div>
        ),
    },
    {
        label: 'Xizmatlar',
        content: (
            <div>
                <h2 className="text-xl font-semibold mb-2">Xizmatlar</h2>
                <ul className="list-disc list-inside">
                    <li>Santexnik</li>
                    <li>Isitish</li>
                    <li>Gidroizolyatsiya</li>
                </ul>
            </div>
        ),
    },
    {
        label: 'Videolar',
        content: (
            <div>
                <h2 className="text-xl font-semibold mb-2">Videolar</h2>
                <p>Здесь может быть список видео или видео-плеер.</p>
            </div>
        ),
    },
    {
        label: 'Rasmlar',
        content: (
            <div>
                <h2 className="text-xl font-semibold mb-2">Rasmlar</h2>
                <p>Здесь может быть галерея изображений.</p>
            </div>
        ),
    },
    {
        label: 'Izohlar (15)',
        content: (
            <div>
                <h2 className="text-xl font-semibold mb-2">Izohlar</h2>
                <p>Здесь может быть рейтинг, комментарии и т.п.</p>
            </div>
        ),
    },
];

export const Content = ({ className }: Props) => {
    // Храним индекс активной вкладки (по умолчанию 0 – «Ma’lumot»)
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className={cn(className, 'w-full flex flex-col pt-6')}>
            {/* Заголовки вкладок */}
            <nav className="flex gap-6 border-b border-gray-200 mb-4">
                {TABS.map((tab, index) => {
                    const isActive = index === activeTab;
                    return (
                        <button
                            key={tab.label}
                            className={cn(
                                'relative pb-2 text-sm font-medium',
                                'transition-colors duration-300',
                                isActive
                                    ? 'text-black after:content-[""] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-maket-primary'
                                    : 'text-gray-500 hover:text-gray-700'
                            )}
                            onClick={() => setActiveTab(index)}
                        >
                            {tab.label}
                        </button>
                    );
                })}
            </nav>

            {/* Блок плавного переключения контента */}
            <div className="relative min-h-[200px]">
                {TABS.map((tab, index) => (
                    <div
                        key={tab.label}
                        className={cn(
                            'absolute w-full transition-all duration-300',
                            // Если вкладка не активна – скрываем ее через opacity/позиционирование
                            activeTab === index ? 'opacity-100 relative static' : 'opacity-0 pointer-events-none'
                        )}
                    >
                        {tab.content}
                    </div>
                ))}
            </div>
        </div>
    );
};
