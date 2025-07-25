"use client"
import React from "react";
import { cn } from "@/root/business/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { InfoTab } from "@/root/ui/dev/components/shared/tamplates/Services/Service/ServicePerson/Content/InfoTab/InfoTab";
import { VideoTab } from "@/root/ui/dev/components/shared/tamplates/Services/Service/ServicePerson/Content/VideoTab/VideoTab";
import { ImageTab } from "@/root/ui/dev/components/shared/tamplates/Services/Service/ServicePerson/Content/ImageTab/ImageTab";
import FeedBackServer from "./FeedbackTab/FeedBackTab.server";


interface TabItem {
    key: string;
    label: string;
    content: React.ReactNode;
    IconPic: string
}

interface UserData {
    user_uuid: string;
    profile_photo: string;
    first_name: string;
    last_name: string;
    userUuid:string
    about: string;
    avg_rating: number;
    comments_count: number;
    categories: {id: number, name: string }[]
    tags: {id: number, name: string, category_id: number }[]
    experience_levels: {experience_level: string, category_name: string }[]
}

interface Props {
    className?: string;
    response: UserData;
}

const TABS = (response: UserData): TabItem[] => [
    {
        key: "malumot",
        label: "Ma'lumot",
        IconPic: "InfoIcon.svg",
        content: (
            <InfoTab
                data={response}
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
        content: <FeedBackServer userUuid={response.user_uuid}/>,
        IconPic: "feedbackIcon.svg"
    },
];

export const Content = ({ className, response }: Props) => {
    const [activeTab, setActiveTab] = React.useState<string>("malumot");
    

    return (
        <div className={cn(className, "w-full flex flex-col")}>
            <div className="flex gap-6 border-b border-gray-200">
                <div className="flex overflow-x-auto no-scrollbar overflow-y-hidden gap-6 border-b border-gray-200">
                    {TABS(response).map((tab) => {
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
            <div className="relative mt-6">
                <AnimatePresence mode="wait">
                    {TABS(response).filter((tab) => tab.key === activeTab).map((tab) => (
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