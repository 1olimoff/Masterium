"use client";
import React, { useState, useEffect } from "react";
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
  description?: string;
}

interface Props {
  className?: string;
  response?: resProps[];
}

export const AdPoster = ({ className, response = []}: Props) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const filteredResponse = response.filter(
    (item) =>
      item.type === "poster" &&
      item.is_active === true &&
      (item.image_url.includes(".png") ||
        item.image_url.includes(".jpeg") ||
        item.image_url.includes(".jpg") ||
        item.image_url.includes(".webp"))
  );
  
  useEffect(() => {
    if (!api || filteredResponse.length <= 1) return;
    const interval = setInterval(() => {
      const nextIndex = (current + 1) % filteredResponse.length;
      api.scrollTo(nextIndex);
    }, 6000);

    return () => clearInterval(interval);
  }, [api, current, filteredResponse]);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className={cn("relative w-full overflow-hidden", className)}>
      <Carousel setApi={setApi}>
        <CarouselContent className="relative w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px]">
          {filteredResponse.length > 0 ? (
            filteredResponse.map((item) => (
              <CarouselItem key={item.id} className="relative w-full h-full">
                <Image
                  src={
                    item.image_url.startsWith("http")
                      ? item.image_url
                      : `${process.env.NEXT_PUBLIC_BASE_URL}${item.image_url}`
                  }
                  alt={item.description || "poster"}
                  fill
                  className="object-cover rounded-xl sm:rounded-2xl md:rounded-3xl"
                />

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
    </section>
  );
};
