"use client";
import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/root/business/lib/utils";
// import { AdPoster } from "../AdPoster/AdPoster"; // shu joyda AdPoster import qilinadi
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/root/ui/dev/shadcn/ui/carousel";
import { AdPoster } from "./AdPoster/Adposter";

interface resProps {
  id: number;
  type: string;
  image_url: string;
  is_active: boolean;
  description?: string;
}

interface Props {
  className?: string;
  response?: resProps[];
}

export const AdBanner = ({ className, response = [] }: Props) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // bannerlarni filter qilamiz (faqat video/gif uchun)
  const filteredResponse = response.filter(
    (item) =>
      item.type === "banner" &&
      item.is_active === true &&
      (item.image_url.endsWith(".mp4") || item.image_url.endsWith(".gif"))
  );

  const resetVideos = () => {
    videoRefs.current.forEach((video, idx) => {
      if (video && idx === current) {
        video.load();
        video.play().catch(() => {});
      } else if (video) {
        video.pause();
      }
    });
  };

  useEffect(() => {
    if (!api || filteredResponse.length <= 1) return;
    intervalRef.current = setInterval(() => {
      const nextIndex = (current + 1) % filteredResponse.length;
      api.scrollTo(nextIndex);
    }, 7000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [api, current, filteredResponse]);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
      resetVideos();
    });
  }, [api]);

  return (
<section className={cn("flex w-full", className)}>
  {/* Chap tarafda Banner */}
  <div className="w-full">
    <Carousel setApi={setApi}>
      <CarouselContent className="relative w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px]">
        {filteredResponse.length > 0 ? (
          filteredResponse.map((item, index) => (
            <CarouselItem key={item.id} className="relative w-full h-full">
              {item.image_url.endsWith(".mp4") ? (
                <video
                  ref={(el) => {
                    videoRefs.current[index] = el;
                  }}
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}${item.image_url}`}
                  className="w-full h-full object-cover rounded-xl sm:rounded-2xl md:rounded-3xl"
                  autoPlay={index === current}
                  muted
                  loop
                  playsInline
                  preload={index === 0 ? "auto" : "metadata"}
                />
              ) : (
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}${item.image_url}`}
                  alt={item.description || "Banner"}
                  fill
                  className="object-cover rounded-xl sm:rounded-2xl md:rounded-3xl"
                />
              )}
            </CarouselItem>
          ))
        ) : (
          <CarouselItem className="relative w-full h-full">
            <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-xl sm:rounded-2xl md:rounded-3xl">
              <span className="text-gray-500">Ma'lumot yo‘q</span>
            </div>
          </CarouselItem>
        )}
      </CarouselContent>
    </Carousel>
  </div>
</section>

  );
  
};
