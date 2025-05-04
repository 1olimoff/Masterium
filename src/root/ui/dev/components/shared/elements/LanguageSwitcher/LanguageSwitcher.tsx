'use client'
import React, {useState} from 'react';
import {cn} from '@/root/business/lib/utils';
import Image from "next/image";
import Cookies from "js-cookie";

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

export const LanguageSwitcher = ({className, currentLocale, currentRegion}: Props) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [displayText, setDisplayText] = useState(
        langs.find(lang => lang.key === currentLocale)?.data.title ?? ''
    );

    const [otherLangIcons, setOtherLangIcons] = useState<Lang[]>([]);


    const otherlangs = langs.filter(lang => lang.key !== currentLocale);

    const currentLangData =
        langs.find(lang => lang.key === currentLocale) ??
        langs.find(lang => lang.key === 'ru')!;

    const removeSymbol = (text: string) => {
        let index = text.length

        const showOtherLangIcon = (index: number) => {
            if (index < otherlangs.length) {
                setOtherLangIcons(prev => [otherlangs[index], ...prev]);
                setTimeout(() => showOtherLangIcon(index + 1), 200); // Появление следующей иконки
            } else {
                setIsAnimating(false);
            }
        };

        const remove = () => {
            if (index > 0) {
                index -= 1;
                setDisplayText(text.slice(0, index));
                setTimeout(remove, 50)
            } else {
                setTimeout(() => showOtherLangIcon(0), 200);
            }
        }

        remove();
    }

    const selectLang = async () => {
        if (!isAnimating && otherLangIcons.length === 0) {
            setIsAnimating(true);
            removeSymbol(currentLangData.data.title)
        }
    }

    const handleFlagClick = (langKey: string) => {
        Cookies.set("locale", langKey); // Сохраняем локаль в куки
        Cookies.set("region", currentRegion); // Сохраняем текущий регион в куки
        setIsAnimating(false);
    };

    return (
        <div
            className={cn(className, "w-[120px] flex gap-2 justify-end px-2")}
            onClick={selectLang}
        >
            {otherLangIcons.map((data, index) => (
                <a
                    key={index}
                    href={`/${data.key}/${currentRegion}`}
                    onClick={() => handleFlagClick(data.key)}>
                    <Image
                        src={data.data.img}
                        alt={`Other language icon ${index}`}
                        width={20}
                        height={20}
                        className={'animate-fade-in opacity-0 cursor-pointer'}
                    />
                </a>
            ))}
            <button
                className={cn(
                    'flex gap-2 cursor-pointer justify-end group',
                    isAnimating && 'slide-out'
                )}
            >
                <Image
                    src={currentLangData.data.img}
                    alt={currentLangData.data.alt}
                    width={20}
                    height={20}
                />
                <h2 className={"group-hover:underline transition-all duration-600"}>
                    {displayText}
                </h2>

            </button>
        </div>
    );
};
