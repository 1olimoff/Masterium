"use client"
import React from "react";
import { cn } from "@/root/business/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { InfoTab } from "@/root/ui/dev/components/shared/tamplates/Services/Service/ServicePerson/Content/InfoTab/InfoTab";
import { VideoTab } from "@/root/ui/dev/components/shared/tamplates/Services/Service/ServicePerson/Content/VideoTab/VideoTab";
import { ImageTab } from "@/root/ui/dev/components/shared/tamplates/Services/Service/ServicePerson/Content/ImageTab/ImageTab";
import {
    FeedBackTab
} from "@/root/ui/dev/components/shared/tamplates/Services/Service/ServicePerson/Content/FeedbackTab/FeedBackTab";

interface TabItem {
    key: string;
    label: string;
    infoText?: string;
    content: React.ReactNode;
    IconPic: string
}
const TABS: TabItem[] = [
    {
        key: "malumot",
        label: "Ma'lumot",
        IconPic: "InfoIcon.svg",
        content: (
            <InfoTab
                infoText="Gravida elementum diam fames dignissim sed donec nisi diam. Quisque feugiat ut rutrum fringilla id urna vitae pharetra amet. Lorem ipsum dolor sit amet consectetur. Accumsan phasellus aenean eget velit non interdum erat in semper. Lobortis turpis metus turpis risus congue amet ullamcorper. Vitae diam senectus feugiat amet. Rutrum ac nulla sollicitudin libero pellentesque. Non magna libero consectetur velit. Facilisi et tellus tristique vel ut enim. Vel sapien tristique ultrices ac at quis nulla ultrices. Cursus massa facilisis et pharetra varius nullam. Est id id leo sed vestibulum eros massa. Volutpat dolor tellus a a purus aliquam. Hendrerit justo suspendisse laoreet tincidunt scelerisque."
                data={{
                    infoText: "Gravida elementum diam fames dignissim sed donec nisi diam.",
                    experienceText: "5 yildan ortiq tajriba. Qurilish, elektr tarmoqlari, mebel yig‘ish.",
                    categories: ["24/7", "Shoshilinch qo'ng'iroq", "Santexnik", "Isitish", "Gidroizolyatsiya"]
                }}
            />
        ),
    },
    {
        key: "videolar",
        label: "Videolar",
        content: <VideoTab />,
        IconPic: "videoIcon.svg"
    },
    {
        key: "rasmlar",
        label: "Rasmlar",
        content: <ImageTab />,
        IconPic: "galleryIcon.svg"
    },
    {
        key: "izohlar",
        label: "Izohlar",
        content: <FeedBackTab />,
        IconPic: "feedbackIcon.svg"
    },
];


interface Props {
    className?: string;
}

export const Content = ({ className }: Props) => {
    const [activeTab, setActiveTab] = React.useState<string>("malumot");

    return (
        <div className={cn(className, "w-full flex  flex-col")}>
            {/* Шапка с кнопками табов */}
            <div className="flex gap-6 border-b border-gray-200">
                <div className="flex overflow-x-auto no-scrollbar overflow-y-hidden gap-6 border-b border-gray-200">
                    {TABS.map((tab) => {
                        const isActive = tab.key === activeTab;
                        return (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={cn(
                                    "relative py-2 text-base whitespace-nowrap flex-shrink-0 flex items-center gap-2 transition-colors duration-200",
                                    isActive ? "text-blue-600 font-semibold" : "text-gray-500 hover:text-gray-600"
                                )}
                            >
                                <img src={`/svg/ContentTabsIcon/${tab.IconPic}`} alt={tab.label} className="w-5 h-5" />
                                {tab.label}
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


            </div>

            {/* Контейнер с анимированным контентом */}
            <div className="relative mt-6 ">
                <AnimatePresence mode="wait">
                    {/* Ищем контент для выбранного таба и рендерим его */}
                    {TABS.filter((tab) => tab.key === activeTab).map((tab) => (
                        <motion.div
                            key={tab.key}
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -30 }}
                            transition={{ duration: 0.2 }}
                            className="w-full"
                        >
                            <div>
                                {tab.content}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};
