"use client"
import React from "react";
import { cn } from "@/root/business/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { InfoTab } from "./InfoTab/InfoTab";
import { VideoTab } from "./VideoTab/VideoTab";
import { ImageTab } from "./ImageTab/ImageTab";
import { FeedBackTab } from "./FeedbackTab/FeedbackTab";
import { Profile } from "../ForWorkers";
import { Header } from "../Header/Header";
// import Header from "../../Header";

interface TabItem {
    key: string;
    label: string;
    content: React.ReactNode;
    IconPic: string;
}

interface imgResponse {
    id: number;
    file_url: string;
    user_id: string;
    created_at: string;
}

interface VideoFetch {
    id: number;
    file_url: string;
    user_id: string;
    created_at: string;
}

interface Props {
    className?: string;
    response: Profile;
    images: imgResponse[];
    videos: VideoFetch[];
    reviews: FeedBackReview[]
}

 interface FeedBackReview{
    comment: string;
    created_at: string
    full_name:string;
    id:number;
    image_url:string;
    rating:number;
    user_id:string
}

const TABS = (
    response: Profile,
    images: imgResponse[],
    videos: VideoFetch[],
    reviews: FeedBackReview[]

): TabItem[] => [
        {
            key: "malumot",
            label: "Ma'lumot",
            IconPic: "InfoIcon.svg",
            content: <InfoTab data={response} />,
        },
        {
            key: "videolar",
            label: "Videolar",
            content: <VideoTab videos={videos} />,
            IconPic: "videoIcon.svg",
        },
        {
            key: "rasmlar",
            label: "Rasmlar",
            content: <ImageTab images={images} />,
            IconPic: "galleryIcon.svg",
        },
        {
            key: "izohlar",
            label: "Izohlar",
            content: <FeedBackTab response={reviews}/>,
            IconPic: "feedbackIcon.svg",
        },
    ];

export const Content = ({ className, response, images, videos, reviews }: Props) => {
    const [activeTab, setActiveTab] = React.useState<string>("malumot");

    return (
        <div>
            <Header activeTab={activeTab} response={response}/>
            <div className={cn(className, "w-full flex flex-col")}>
                <div className="flex gap-6 border-b border-gray-200">
                    <div className="flex overflow-x-auto no-scrollbar overflow-y-hidden gap-6 border-b border-gray-200">
                        {TABS(response, images, videos, reviews).map((tab) => {
                            const isActive = tab.key === activeTab;
                            return (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key)}
                                    className={cn(
                                        "relative py-2 text-base whitespace-nowrap flex-shrink-0 flex items-center gap-2 transition-colors duration-200",
                                        isActive
                                            ? "text-blue-600 font-semibold"
                                            : "text-gray-500 hover:text-gray-600"
                                    )}
                                >
                                    <img
                                        src={`/svg/ContentTabsIcon/${tab.IconPic}`}
                                        alt={tab.label}
                                        className="w-5 h-5"
                                    />
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

                <div className="relative mt-6">
                    <AnimatePresence mode="wait">
                        {TABS(response, images, videos, reviews)
                            .filter((tab) => tab.key === activeTab)
                            .map((tab) => (
                                <motion.div
                                    key={tab.key}
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -30 }}
                                    transition={{ duration: 0.2 }}
                                    className="w-full"
                                >
                                    <div>{tab.content}</div>
                                </motion.div>
                            ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};
