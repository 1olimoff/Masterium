"use client"
import React, {useState} from 'react';
import {cn} from '@/root/business/lib/utils';
import {Button} from "@/root/ui/dev/shadcn/ui/button";
import {useTranslations} from "next-intl";
import {AdCarousel} from "@/root/ui/dev/components/shared/elements/advertising/AdCarousel";
import {ServiceCard} from "@/root/ui/dev/components/shared/elements/Services/Service/ServiceCard";

interface Props {
    className?: string;
}

const WORKS_TO_DISPLAY = 8;

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

export const List = ({ className }: Props) => {
    const t = useTranslations()
    const [showMore, setShowMore] = useState(false);

    return (
        <section className={cn(className, "mt-4")}>
            {/* Dastlabki kartalar */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
                {data.slice(0, WORKS_TO_DISPLAY).map((item, i) => (
                    <ServiceCard data={item} key={i} />
                ))}
            </div>

            {/* Reklama karusel */}
            <div className="py-10">
                <AdCarousel />
            </div>

            {/* Qolgan kartalar */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
                {data.slice(WORKS_TO_DISPLAY).map((item, i) => (
                    <ServiceCard data={item} key={i + WORKS_TO_DISPLAY} />
                ))}
            </div>

            {/* Show More */}
            {showMore && (
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 mt-10">
                    {data.slice(WORKS_TO_DISPLAY).map((item, i) => (
                        <ServiceCard data={item} key={i + WORKS_TO_DISPLAY} />
                    ))}
                </div>
            )}

            <Button 
                className="bg-maket-primary text-white rounded-xl my-4 py-6 w-full font-semibold hover:bg-sky-800"
                onClick={() => setShowMore(!showMore)}
            >
                {t('OpenWorks.more')}
            </Button>
        </section>
    );
};
