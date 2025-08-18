// components/Gallery.tsx
"use client"

import React, { useState, useEffect } from "react"
import { cn } from "@/root/business/lib/utils"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/root/ui/dev/shadcn/ui/carousel"
import Image from "next/image"
import { Detail } from "../../../Navbar/Navbar"

interface Props {
  className?: string
  detail: Detail
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
]

export const Gallery = ({ className, detail }: Props) => {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)


  console.log("DETAILLLLL", detail);
  



  useEffect(() => { 
    if (!api) return
    setCurrent(api.selectedScrollSnap())
    api.on("select", () => setCurrent(api.selectedScrollSnap()))
  }, [api])

  return (
    <section className={cn("relative w-full h-full min-h-[250px]", className)}>
      <Carousel setApi={setApi} className="w-full h-full">
        <CarouselContent className="w-full h-full">
          {detail.images.map((item, i) => (
            <CarouselItem
              key={i}
              className="w-full h-[300px] sm:h-[370px] md:h-[430px] lg:h-[450px] relative"
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_URL}${item}`}
                alt={item}
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
          {data.map((_, idx) => (
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
  )
}
