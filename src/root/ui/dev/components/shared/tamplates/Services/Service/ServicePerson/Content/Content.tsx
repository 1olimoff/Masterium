"use client"
import React from "react";
import { cn } from "@/root/business/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { InfoTab } from "@/root/ui/dev/components/shared/tamplates/Services/Service/ServicePerson/Content/InfoTab/InfoTab";
import { VideoTab } from "@/root/ui/dev/components/shared/tamplates/Services/Service/ServicePerson/Content/VideoTab/VideoTab";
import { ImageTab } from "@/root/ui/dev/components/shared/tamplates/Services/Service/ServicePerson/Content/ImageTab/ImageTab";
import { FeedBackTab } from "./FeedbackTab/FeedBackTab";

interface TabItem {
    key: string;
    label: string;
    content: React.ReactNode;
    IconPic: string;
}

interface UserData {
    user_uuid: string;
    profile_photo: string;
    first_name: string;
    last_name: string;
    userUuid: string;
    about: string;
    avg_rating: number;
    comments_count: number;
    categories: { id: number; name: string }[];
    tags: { id: number; name: string; category_id: number }[];
    experience_levels: { experience_level: string; category_name: string }[];
}

interface Feedback {
    average_rating: number;
    total_reviews: number;
    rating_distribution: { 1: number; 2: number; 3: number; 4: number; 5: number };
    slug: string;
}

interface VideoFetch {
    id: number;
    file_url: string;
    user_id: string;
    created_at: string;
}

interface imgResponse {
    id: number;
    file_url: string;
    user_id: string;
    created_at: string;
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

interface Props {
    className?: string;
    response: UserData;
    feedbackSummary: Feedback;
    slug: string;
    userUuid: string;
    fetchpics: imgResponse[];
    VideoData: VideoFetch[]
    feedBackReview:FeedBackReview[]
}

const TABS = (response: UserData, feedbackSummary: Feedback, slug: string, userUuid: string, fetchpics: imgResponse[], VideoData:VideoFetch[], feedBackReview:FeedBackReview[]): TabItem[] => [
    {
        key: "malumot",
        label: "Ma'lumot",
        IconPic: "InfoIcon.svg",
        content: <InfoTab data={response} />,
    },
    {
        key: "videolar",
        label: "Videolar",
        content: <VideoTab VideoData={VideoData}/>,
        IconPic: "videoIcon.svg",
    },
    {
        key: "rasmlar",
        label: "Rasmlar",
        content: <ImageTab imgResponse={fetchpics} />,
        IconPic: "galleryIcon.svg",
    },
    {
        key: "izohlar",
        label: "Izohlar",
        content: <FeedBackTab data={feedbackSummary} profile={response} slug={slug} feedBackReview={feedBackReview}/>,
        IconPic: "feedbackIcon.svg",
    },
];

export const Content = ({ className, response, feedbackSummary, slug, userUuid, fetchpics, VideoData, feedBackReview }: Props) => {
    const [activeTab, setActiveTab] = React.useState<string>("malumot");


    return (
        <div className={cn(className, "w-full flex flex-col")}>
            <div className="flex gap-6 border-b border-gray-200">
                <div className="flex overflow-x-auto no-scrollbar overflow-y-hidden gap-6 border-b border-gray-200">
                    {TABS(response, feedbackSummary, slug, userUuid, fetchpics, VideoData, feedBackReview ).map((tab) => {
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

            <div className="relative mt-6">
                <AnimatePresence mode="wait">
                    {TABS(response, feedbackSummary, slug, userUuid, fetchpics, VideoData, feedBackReview).filter((tab) => tab.key === activeTab).map((tab) => (
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