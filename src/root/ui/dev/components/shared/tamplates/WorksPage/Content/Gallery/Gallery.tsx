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

interface Props {
  className?: string;
}

const data = [
  {
    src: "/img/advertising/plumbing.png",
    alt: "Plumbing Repair & Maintenance",
  },
  {
    src: "/img/advertising/gas.png",
    alt: "Gas Repair",
  },
  {
    src: "/img/advertising/plumbing.png",
    alt: "Plumbing Repair & Maintenance",
  },
];

export const Gallery = ({ className }: Props) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  return (
    <section className={cn("relative w-full", className)}>
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {data.map((item, i) => (
            <CarouselItem
              key={i}
              className={cn(
                 className="w-full h-[300px] sm:h-[370px] md:h-[430px] lg:h-[450px] relative"
              )}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover rounded-xl transition-all duration-300 ease-in-out"
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Previous button */}
        <CarouselPrevious
          className={cn(
            "absolute left-4 top-1/2 -translate-y-1/2 z-10",
            "bg-white text-black p-2 rounded-full shadow hover:bg-gray-100"
          )}
        />

        {/* Next button */}
        <CarouselNext
          className={cn(
            "absolute right-4 top-1/2 -translate-y-1/2 z-10",
            "bg-white text-black p-2 rounded-full shadow hover:bg-gray-100"
          )}
        />

        {/* Dots (indicator) */}
        <div className="absolute bottom-3 left-0 w-full flex items-center justify-center gap-2 z-10">
          {data.map((_, idx) => (
            <div
              key={idx}
              onClick={() => api?.scrollTo(idx)}
              className={cn(
                "cursor-pointer h-[6px] rounded-full transition-all duration-300",
                idx === current ? "w-6 bg-blue-600" : "w-2 bg-gray-300"
              )}
            />
          ))}
        </div>
      </Carousel>
    </section>
  );
};
