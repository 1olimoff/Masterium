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
// import { MasterDetail } from "../Content";

// Ensure MasterDetail interface has the correct type for images
interface MasterDetail {
  images: string[]; // Define images as an array of strings
  title?: string;
}

interface Props {
  className?: string;
  response: MasterDetail;
}

export const Gallery = ({ className, response }: Props) => {
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
          {response.images.map((src, i) => (
            <CarouselItem
              key={i}
              className={cn(
                "w-full h-[300px] sm:h-[370px] md:h-[430px] lg:h-[450px] relative"
              )}
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_URL}${src}`}
                alt={response.title || "Gallery image"}
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
          {response.images.map((_, idx) => (
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