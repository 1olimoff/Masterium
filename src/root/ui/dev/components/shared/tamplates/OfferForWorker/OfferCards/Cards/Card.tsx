import React, { useEffect, useState } from 'react';
import { cn } from '@/root/business/lib/utils';
import {
    Carousel,
    type CarouselApi,
    CarouselContent,
    CarouselItem,
} from "@/root/ui/dev/shadcn/ui/carousel";
import Image from "next/image";
import { useTranslations } from "next-intl";
import ServerLink from '../../../../elements/Links/ServerLink';

interface OfferCardData {
    offer_id?: number;
    images?: string[];
    title: string;
    category_name: string;
    price: number;
    currency?: string;
    application_id?: number;
    application_count?: number;
    is_public?: boolean;
    user?: {
        user_uuid?: string;
        first_name: string;
        last_name: string;
    };
    // Support for static data structure
    client?: {
        avatar?: {
            src: string;
            alt: string;
        };
        name: string;
        type: string;
        online?: boolean;
    };
    applicationCount?: number;
}

interface Props {
    className?: string;
    data: OfferCardData;
}

export const OfferCard = ({ className, data }: Props) => {
    const t = useTranslations("");
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (!api) return;

        setCurrent(api.selectedScrollSnap());
        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    // Fallback image
    const fallbackImage = {
        src: "/img/advertising/gas.png",
        alt: "Default Offer Image",
        objectFit: "cover" as const,
    };

    // Normalize images
    const images = data.images && data.images.length > 0 
        ? data.images.map((src, index) => ({
              src: src.startsWith('/static') ? `${process.env.NEXT_PUBLIC_BASE_URL}${src}` : src,
              alt: `${data.title} Image ${index + 1}`,
              objectFit: "cover" as const,
          }))
        : [fallbackImage];

    // Normalize user data
    const user = data.user || {
        user_uuid: data.client?.name || '',
        first_name: data.client?.name.split(' ')[0] || 'Unknown',
        last_name: data.client?.name.split(' ').slice(1).join(' ') || 'User',
    };

    // Normalize application count
    const applicationCount = data.application_count ?? data.applicationCount ?? 0;

    // Normalize currency
    const currency = data.currency ?? 'UZS';

    return (
        <div className={cn(
            className,
              "w-full h-auto rounded-xl overflow-hidden bg-white shadow-lg"
        )}>
            <Carousel setApi={setApi}>
                <CarouselContent className="relative w-full h-[160px] sm:h-[180px] md:h-[200px]">
                    {images.map((item, i) => (
                        <CarouselItem key={i} className="relative w-full h-full">
                            <Image
                                src={item.src}
                                alt={item.alt}
                                fill
                                style={{ objectFit: item.objectFit }}
                                priority={i === 0}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <div className="absolute bottom-4 left-0 w-full flex items-center justify-center gap-2 z-10">
                    {images.map((_, idx) => {
                        const isActive = idx === current;
                        return (
                            <div
                                key={idx}
                                onClick={() => api?.scrollTo(idx)}
                                className={cn(
                                    "cursor-pointer h-1 rounded-full transition-all duration-300",
                                    isActive ? "w-4 bg-white" : "w-1 bg-gray-300"
                                )}
                            />
                        );
                    })}
                </div>

                {applicationCount > 0 && (
                    <div className="absolute top-[30%] left-[35%] sm:top-[35%] sm:left-[30%] z-10 bg-red-500 text-white text-xs sm:text-sm font-semibold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                        {applicationCount} {t("OfferForWorkers.applicationNumb")}
                    </div>
                )}
            </Carousel>

            <div className="p-4 flex flex-col gap-3 sm:gap-4">
                <div>
                    <h3 className="text-base sm:text-lg font-semibold">{data.title}</h3>
                    <p className="text-sm text-gray-500">{data.category_name}</p>
                </div>

                <span className="text-base sm:text-lg font-bold text-[#32ADE6]">
                    {data.price} {currency}
                </span>

                <div className="flex gap-3">
                    <div className="rounded-full h-12 w-12 border-2 border-green-500 relative overflow-hidden">
                        <Image
                            src={data.client?.avatar?.src || "/img/advertising/gas.png"}
                            alt={data.client?.avatar?.alt || `${user.first_name} ${user.last_name}`}
                            fill
                            style={{ objectFit: "cover" }}
                            className="rounded-full"
                        />
                        <div className="absolute bottom-0 right-0 h-4 w-4 border-2 border-white rounded-full bg-green-500" />
                    </div>
                    <div className="flex flex-col">
                        <h4 className="text-sm font-semibold">{`${user.first_name} ${user.last_name}`}</h4>
                        <p className="text-xs text-gray-500">{data.client?.type || 'Mijoz'}</p>
                    </div>
                </div>

                <div className="flex flex-col justify-center gap-3">
                    <ServerLink
                        path={`worker-offers/${data.offer_id ?? 'unknown'}`}
                        className="bg-blue-100 text-blue-400 text-sm font-[600] sm:text-base text-center py-2 sm:py-3 rounded-lg hover:bg-[#bee5f6] hover:text-white transition-all duration-200"
                    >
                        {t('OfferForWorkers.btn.seeOffer')}
                    </ServerLink>
                </div>
            </div>
        </div>
    );
};