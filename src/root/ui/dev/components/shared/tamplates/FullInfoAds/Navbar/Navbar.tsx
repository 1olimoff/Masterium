"use client"
import React from "react";
import { cn } from "@/root/business/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Content } from "../Content/InfoTab/InfoTab";
import { ApplicationCard } from "../Content/Applications/Applications";

interface TabItem {
    key: string;
    label: string;
    infoText?: string;
    content: React.ReactNode;
    IconPic: string

}



const data = [
    {
        src: "eshonov-bahodir",
        categories: [
            "24/7", "Shoshilinch qo'ng'iroq", "Santexnik", "Isitish", "Gidroizolyatsiya"
        ],
        client: {
            avatar: {
                src: "/img/advertising/gas.png",
                alt: "Eshonov Baxodir",
            },
            name: "Eshonov Baxodir",
            specialistic: "Santexnik",
            online: true,
            rateMiddle: 4.5,
            commentsCount: 30
        }
    }, {
        src: "eshonov-bahodir",
        categories: [
            "24/7", "Shoshilinch qo'ng'iroq", "Santexnik", "Isitish", "Gidroizolyatsiya"
        ],
        client: {
            avatar: {
                src: "/img/advertising/gas.png",
                alt: "Eshonov Baxodir",
            },
            name: "Eshonov Baxodir",
            specialistic: "Santexnik",
            online: true,
            rateMiddle: 4.5,
            commentsCount: 30
        }
    }, {
        src: "eshonov-bahodir",
        categories: [
            "24/7", "Shoshilinch qo'ng'iroq", "Santexnik", "Isitish", "Gidroizolyatsiya"
        ],
        client: {
            avatar: {
                src: "/img/advertising/gas.png",
                alt: "Eshonov Baxodir",
            },
            name: "Eshonov Baxodir",
            specialistic: "Santexnik",
            online: true,
            rateMiddle: 4.5,
            commentsCount: 30
        }
    }, {
        src: "eshonov-bahodir",
        categories: [
            "24/7", "Shoshilinch qo'ng'iroq", "Santexnik", "Isitish", "Gidroizolyatsiya"
        ],
        client: {
            avatar: {
                src: "/img/advertising/gas.png",
                alt: "Eshonov Baxodir",
            },
            name: "Eshonov Baxodir",
            specialistic: "Santexnik",
            online: true,
            rateMiddle: 4.5,
            commentsCount: 30
        }
    }
]

const TABS: TabItem[] = [
    {
        key: "malumot",
        label: "Ma'lumot",
        infoText: "Gravida elementum diam fames dignissim sed donec nisi diam. Quisque feugiat ut rutrum fringilla id urna vitae pharetra amet.\n" +
            "\n" +
            "Lorem ipsum dolor sit amet consectetur. Accumsan phasellus aenean eget velit non interdum erat in semper. Lobortis turpis metus turpis risus congue amet ullamcorper. Vitae diam senectus feugiat amet. Rutrum ac nulla sollicitudin libero pellentesque. Non magna libero consectetur velit. Facilisi et tellus tristique vel ut enim. Vel sapien tristique ultrices ac at quis nulla ultrices. Cursus massa facilisis et pharetra varius nullam. Est id id leo sed vestibulum eros massa. Volutpat dolor tellus a a purus aliquam. Hendrerit justo suspendisse laoreet tincidunt scelerisque.",
        content: <Content />,
        IconPic: "InfoIcon.svg"
    },
    {
        key: "applications",
        IconPic: "AdvertiseProfile.svg",
        label: "E'lon uchun ariza qoldirganlar",
        content: (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
                {data.map((item, index) => (
                    <div key={index} className="flex-grow flex-1 basis-[300px]">
                        <ApplicationCard data={item} />
                    </div>
                ))}
            </div>

        ),
    },
];

interface Props {
    className?: string;
}

export const Navbar = ({ className }: Props) => {
    const [activeTab, setActiveTab] = React.useState<string>("malumot");

    return (
        <div className={cn(className, "w-full mt-2 flex flex-col")}>
            {/* Шапка с кнопками табов */}
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
