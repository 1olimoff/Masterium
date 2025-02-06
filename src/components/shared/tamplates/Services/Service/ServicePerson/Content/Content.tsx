"use client"
import React from "react";
import { cn } from "@lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface TabItem {
    key: string;
    label: string;
    content: React.ReactNode;
}

const TABS: TabItem[] = [
    {
        key: "malumot",
        label: "Ma'lumot",
        content: <div>Сюда добавите «Уста haqida» и прочие блоки</div>,
    },
    {
        key: "xizmatlar",
        label: "Xizmatlar",
        content: <div>Раздел со списком услуг</div>,
    },
    {
        key: "videolar",
        label: "Videolar",
        content: <div>Здесь будут видео</div>,
    },
    {
        key: "rasmlar",
        label: "Rasmlar",
        content: <div>Галерея фотографий</div>,
    },
    {
        key: "izohlar",
        label: "Izohlar",
        content: <div>Блок отзывов (рейтинг + список)</div>,
    },
];

interface Props {
    className?: string;
}

export const Content = ({ className }: Props) => {
    const [activeTab, setActiveTab] = React.useState<string>("malumot");

    return (
        <div className={cn(className, "w-full flex flex-col")}>
            {/* Шапка с кнопками табов */}
            <div className="flex gap-6 border-b border-gray-200">
                {TABS.map((tab) => {
                    const isActive = tab.key === activeTab;
                    return (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={cn(
                                "relative py-2 text-base transition-colors duration-200",
                                isActive
                                    ? "text-blue-600 font-semibold"
                                    : "text-gray-500 hover:text-gray-600"
                            )}
                        >
                            {tab.label}
                            {/* Подчёркивание активного таба */}
                            {isActive && (
                                <motion.span
                                    className="absolute left-0 -bottom-px h-[2px] w-full bg-blue-600"
                                    layoutId="underline"
                                />
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Контейнер с анимированным контентом */}
            <div className="relative mt-6">
                <AnimatePresence mode="wait">
                    {/* Ищем контент для выбранного таба и рендерим его */}
                    {TABS.filter((tab) => tab.key === activeTab).map((tab) => (
                        <motion.div
                            key={tab.key}
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -30 }}
                            transition={{ duration: 0.2 }}
                            className="absolute w-full"
                        >
                            {tab.content}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};
