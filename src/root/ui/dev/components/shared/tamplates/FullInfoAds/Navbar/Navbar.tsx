"use client"
import React from "react";
import { cn } from "@/root/business/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Content } from "../Content/InfoTab/InfoTab";
import { ApplicationCard } from "../Content/Applications/Applications";

interface Props {
    className?: string;
    detail: any;
    applications: any;
}

export interface Detail {
    category_name: string;
    client_type: string;
    created_at: string;
    currency: string;
    description: string;
    end_date: string;
    images: string[];
    is_public: boolean;
    location_lat: number;
    location_lng: number;
    payment_method: string;
    price: number;
    start_date: string;
    title: string;
    total_date: string;
    user: { created_at: string; first_name: string; last_name:string; uuid: string };
}

interface TabItem {
    key: string;
    label: string;
    infoText?: string;
    content: React.ReactNode;
    IconPic: string;
}

export const Navbar = ({ className, detail, applications }: Props) => {
    const [activeTab, setActiveTab] = React.useState<string>("malumot");

    const TABS: TabItem[] = [
        {
            key: "malumot",
            label: "Ma'lumot",
            content: <Content detail={detail} />,
            IconPic: "InfoIcon.svg",
        },
        {
            key: "applications",
            IconPic: "AdvertiseProfile.svg",
            label: "E'lon uchun ariza qoldirganlar",
            content: (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
                    {applications.map((item: any, index: number) => (
                        <div key={index} className="flex-grow flex-1 basis-[300px]">
                            <ApplicationCard data={item} />
                        </div>
                    ))}
                </div>
            ),
        },
    ];

    return (
        <div className={cn(className, "w-full mt-2 flex flex-col")}>
            <div className="flex gap-6 border-b border-gray-200">
                {TABS.map((tab) => {
                    const isActive = tab.key === activeTab;
                    return (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={cn(
                                "relative py-2 text-base transition-colors flex gap-3 duration-200",
                                isActive
                                    ? "text-blue-600 font-semibold"
                                    : "text-gray-500 hover:text-gray-600"
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
            <div className="relative mt-6">
                <AnimatePresence mode="wait">
                    {TABS.filter((tab) => tab.key === activeTab).map((tab) => (
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
    );
};