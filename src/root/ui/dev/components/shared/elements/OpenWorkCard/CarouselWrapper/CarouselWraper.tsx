// components/CarouselWrapper.tsx
"use client";

import React, { useEffect, useState } from "react";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/root/ui/dev/shadcn/ui/carousel";
import Image from "next/image";
import { cn } from "@/root/business/lib/utils";

interface Props {
  images: {
    src: string;
    alt: string;
  }[];
}

export const CarouselWrapper = ({ images }: Props) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <Carousel setApi={setApi}>
      <CarouselContent className="relative w-full h-[200px]">
        {images.map((item, i) => (
          <CarouselItem
            key={i}
            className="relative w-full h-full min-w-[100%]"
          >
            <div className="relative w-full h-full">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                style={{ objectFit: "cover" }}
                priority={i === 0}
              />
            </div>
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
    </Carousel>
  );
};
