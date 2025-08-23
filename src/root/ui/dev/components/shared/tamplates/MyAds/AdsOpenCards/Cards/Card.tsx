"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/root/business/lib/utils";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/root/ui/dev/shadcn/ui/carousel";
import Image from "next/image";
import { useTranslations } from "next-intl";
import ServerLink from "../../../../elements/Links/ServerLink";
import { Offer } from "../../MyAds";

interface Props {
  className?: string;
  data: Offer;
}

export const Card = ({ className, data }: Props) => {
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

  let imageList: { src: string; alt: string; objectFit: string }[] = [];
  try {
    if (data.images) {
      const parsedImages = typeof data.images === "string" ? JSON.parse(data.images) : data.images;
      imageList = Array.isArray(parsedImages)
        ? parsedImages.map((src: string, i: number) => ({
            src,
            alt: `Image ${i + 1}`,
            objectFit: "cover",
          }))
        : [];
    }
  } catch (error) {
    console.error("Imagesni parse qilishda xato:", error);
  }

  // Agar imageList bo'sh bo'lsa, standart rasm
  if (imageList.length === 0) {
    imageList = [{ src: "/img/advertising/gas.png", alt: "Default Image", objectFit: "cover" }];
  }

  return (
    <div
      className={cn(
        className,
        "w-full h-full rounded-xl overflow-hidden bg-white my-custom-shadow flex flex-col"
      )}
    >
      <Carousel setApi={setApi}>
        <CarouselContent className="relative w-full h-[160px] sm:h-[180px] md:h-[200px]">
          {imageList.map((item, i) => (
            <CarouselItem key={i} className="relative w-full h-full">
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_URL}${item.src}`}
                alt={item.alt}
                fill
                style={{ objectFit: "cover" }}
                priority={i === 0}
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="absolute bottom-4 left-0 w-full flex items-center justify-center gap-2 z-10">
          {imageList.map((_, idx) => {
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

        {data.application_count > 0 && (
          <div className="absolute top-[32%] left-[15%] sm:top-[38%] sm:left-[25%] z-10 bg-red-500 text-white text-xs sm:text-sm font-semibold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
            {data.application_count} {t("new_applications") || "ta yangi ariza"}
          </div>
        )}
      </Carousel>

      <div className="p-2 flex flex-col flex-1">
    <div>
      <h3 className="text-base sm:text-lg md:text-xl font-semibold">
        {data.title || "Noma'lum sarlavha"}
      </h3>
      <p className="text-sm sm:text-base text-maket-gray">
        {data.category_name || "Noma'lum kategoriya"}
      </p>
    </div>

    <span className="text-base sm:text-lg md:text-xl text-maket-secondary font-bold mt-2">
      {data.price || "0"} {data.currency || "so'm"} {t("price.sum.title") || ""}
    </span>

    {/* 🚀 Button har doim pastda turadi */}
    <div className="mt-auto">
      <ServerLink
        path={`myads/${data.offer_id || ""}`}
        className="bg-maket-batafsil text-maket-secondary text-sm sm:text-base md:text-lg text-center font-medium py-2 sm:py-4 md:py-3 rounded-xl hover:bg-maket-secondary hover:text-white transition-all duration-200 block"
      >
        {t("MyAds.myAdsBtn.btnTitle") || "Batafsil"}
      </ServerLink>
    </div>
  </div>
</div>
  );
};