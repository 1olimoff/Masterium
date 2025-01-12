'use client'
import React, { useState } from 'react';
import { cn } from '@lib/utils';
import Image from "next/image";
import { useRouter } from '@/i18n/routing';

interface Props {
    className?: string;
    currentLocale: string;
    currentRegion: string;
}

interface LangData {
    title: string;
    img: string;
    alt: string;
}

interface Lang {
    key: string;
    data: LangData;
}

const langs: Lang[] = [
    {
        key: "uz",
        data: {
            title: "O'zbekcha",
            img: '/svg/header/lang-icon-uz.svg',
            alt: "Language Uzbek flag Icon"
        }
    },
    {
        key: "ru",
        data: {
            title: "Русский",
            img: '/svg/header/lang-icon-ru.svg',
            alt: "Language Russian flag Icon"
        }
    },
    {
        key: "en",
        data: {
            title: "English",
            img: '/svg/header/lang-icon-en.svg',
            alt: "Language USA flag Icon"
        }
    },
];

export const LanguageSwitcher = ({ className, currentLocale, currentRegion }: Props) => {
    const router = useRouter();
    const [isAnimating, setIsAnimating] = useState(false);

    const currentLangData =
        langs.find(lang => lang.key === currentLocale) ??
        langs.find(lang => lang.key === 'ru')!;

    const isRu = currentLocale === 'ru';

    const toggleLocale = () => {
        setIsAnimating(true); // Запускаем анимацию
        setTimeout(() => {
            const newLocale = isRu ? 'uz' : 'ru';
            router.push(`/${newLocale}/${currentRegion}`);
            setIsAnimating(false); // Сбрасываем состояние после анимации
        }, 500); // Время должно совпадать с длительностью анимации
    };

    return (
        <button
            className={cn(className)}
            onClick={toggleLocale}
        >
            <div
                className={cn(
                    'flex gap-2 w-[120px] cursor-pointer overflow-hidden justify-end px-2 group',
                    isAnimating && 'slide-out' // Добавляем класс анимации
                )}
            >
                <Image
                    src={currentLangData.data.img}
                    alt={currentLangData.data.alt}
                    width={20}
                    height={20}
                />
                {!isAnimating && ( // Скрываем текст, если анимация запущена
                    <h2 className={"group-hover:underline transition-all duration-600"}>
                        {currentLangData.data.title}
                    </h2>
                )}
            </div>
        </button>
    );
};
