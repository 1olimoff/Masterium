"use client";
import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/root/business/lib/utils";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/root/ui/dev/shadcn/ui/carousel";

interface resProps {
  id: number;
  type: string;
  image_url: string;
  is_active: boolean;
}

interface Props {
  className?: string;
  response?: resProps[];
}

export const AdCarousel = ({ className, response = [] }: Props) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const filteredResponse = response.filter(
    (item) =>
      item.type === "display" &&
      item.is_active === true &&
      (item.image_url.endsWith(".mp4") || item.image_url.endsWith(".gif"))
  );

  const resetVideos = () => {
    videoRefs.current.forEach((video, idx) => {
      if (video && idx === current) {
        video.load();
        video.play().catch(() => { });
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

  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        resetVideos();
        api?.scrollTo(current);
      }
    };

    window.addEventListener("pageshow", handlePageShow);
    return () => {
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, [api, current]);

  return (
    <section className={cn("relative w-full overflow-hidden", className)}>
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
                    autoPlay={index === current} // Faqat joriy video avtomatik o'ynaydi
                    muted
                    loop
                    playsInline
                    preload={index === 0 ? "auto" : "metadata"} // Birinchi video uchun preload
                  />
                ) : (
                  <div className="relative w-full h-[300px]"> {/* yoki kerakli balandlik */}
                    <Image
                      src="/images/image.png"
                      alt="description"
                      fill
                      className="object-cover"
                    />
                  </div>

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

        {filteredResponse.length > 1 && (
          <>
            <CarouselPrevious
              className={cn(
                "absolute left-4 top-1/2 -translate-y-1/2 z-10",
                "bg-white text-black p-2 rounded-full shadow-md hover:bg-gray-100"
              )}
              onClick={() => api?.scrollPrev()}
            />
            <CarouselNext
              className={cn(
                "absolute right-4 top-1/2 -translate-y-1/2 z-10",
                "bg-white text-black p-2 rounded-full shadow-md hover:bg-gray-100"
              )}
              onClick={() => api?.scrollNext()}
            />
            <div className="absolute bottom-2 md:bottom-4 left-0 w-full flex items-center justify-center gap-2 z-10">
              {filteredResponse.map((_, idx) => (
                <div
                  key={idx}
                  onClick={() => api?.scrollTo(idx)}
                  className={cn(
                    "cursor-pointer h-2 rounded-full transition-all duration-300",
                    idx === current ? "w-6 md:w-8 bg-white" : "w-2 bg-gray-300"
                  )}
                />
              ))}
            </div>
          </>
        )}
      </Carousel>
    </section>
  );
};