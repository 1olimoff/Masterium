"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/root/business/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/root/ui/dev/shadcn/ui/carousel";
import Image from "next/image";

export interface offerdetails {
  offer_id: number;
  application_id: number;
  title: string;
  description: string;
  category_name: string;
  created_at: string;
  start_date: string;
  end_date: string;
  client_type: string;
  total_date: number;
  payment_method: string;
  price: number;
  currency: string;
  is_public: boolean;
  images: string[];
  user: { uuid: string; first_name: string; last_name: string | null; created_at: string };
}

interface Props {
  className?: string;
  response: offerdetails;
}

export const Gallery = ({ className, response }: Props) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  // Map images from response.images, with a fallback if empty
  const imageData = response.images && response.images.length > 0
    ? response.images.map((src, i) => ({
        src: `https://cdn.masterium.uz${src}`, // Prepend base URL
        alt: `Offer image ${i + 1}`,
      }))
    : [{
        src: "/img/placeholder.png", // Fallback image
        alt: "No image available",
      }];

  return (
    <section className={cn("relative w-full min-h-[250px] sm:min-h-[300px] md:min-h-[350px]", className)}>
      <Carousel setApi={setApi} className="w-full h-full">
        <CarouselContent className="w-full h-full">
          {imageData.map((item, i) => (
            <CarouselItem
              key={i}
              className="w-full h-[300px] sm:h-[370px] md:h-[430px] lg:h-[450px] relative"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover"
                priority={i === 0}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white text-black p-2 rounded-full shadow-md hover:bg-gray-100" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white text-black p-2 rounded-full shadow-md hover:bg-gray-100" />
        <div className="absolute bottom-4 left-0 w-full flex items-center justify-center gap-2 z-10">
          {imageData.map((_, idx) => (
            <div
              key={idx}
              onClick={() => api?.scrollTo(idx)}
              className={cn(
                "cursor-pointer h-2 rounded-full transition-all duration-300",
                idx === current ? "w-8 bg-white" : "w-2 bg-gray-300"
              )}
            />
          ))}
        </div>
      </Carousel>
    </section>
  );
};