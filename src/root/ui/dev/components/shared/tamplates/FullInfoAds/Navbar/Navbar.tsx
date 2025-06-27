"use client"
import React from "react";
import {cn} from "@/root/business/lib/utils";
import {motion, AnimatePresence} from "framer-motion";
import { Content } from "../Content/InfoTab/InfoTab";
import { ApplicationCard } from "../Content/Applications/Applications";

interface TabItem {
    key: string;
    label: string;
    infoText?: string;
    content: React.ReactNode;
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
    },{
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
    },{
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
    },{
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
    },
    {
        key: "applications",
        label: "E'lon uchun ariza qoldirganlar",
        content: (
            <div className="flex flex-wrap gap-4">
  {data.map((item, index) => (
    <div key={index} className="flex-grow min-w-[280px] max-w-[350px] flex-1 basis-[300px]">
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

export const Navbar = ({className}: Props) => {
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
                                "relative py-2 text-base transition-colors flex gap-3 duration-200",
                                isActive
                                    ? "text-blue-600 font-semibold"
                                    : "text-gray-500 hover:text-gray-600"
                            )}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2Z"
                                    stroke={`${isActive ? "#677294" : "#000"}`} stroke-width="1.8"
                                    stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M12 16V11" stroke="#677294" stroke-width="1.8" stroke-linecap="round"
                                      stroke-linejoin="round"/>
                                <path d="M12.0054 8H11.9964" stroke="#677294" stroke-width="1.8" stroke-linecap="round"
                                      stroke-linejoin="round"/>
                            </svg>
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
                            initial={{opacity: 0, x: 30}}
                            animate={{opacity: 1, x: 0}}
                            exit={{opacity: 0, x: -30}}
                            transition={{duration: 0.2}}
                            className="w-full"
                        >
                            <p>
                                {tab.content}
                            </p>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};
