// components/OpenWorkCard.tsx
import React from "react";

import { Link } from "@/root/business/locales/i18n/routing";
import { cn } from "@/root/business/lib/utils";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { CarouselWrapper } from "./CarouselWrapper/CarouselWraper";

type Item = {
  title: string;
  category: string;
  price: number;
  client: {
    avatar: {
      src: string;
      alt: string;
    };
    name: string;
    type: string;
    online: boolean;
  };
  applicationCount: number;
};

interface Props {
  className?: string;
  data: Item;
}

const images = [
  { src: "/img/advertising/gas.png", alt: "Gas Repair" },
  { src: "/img/advertising/gas.png", alt: "Gas Repair" },
  { src: "/img/advertising/gas.png", alt: "Gas Repair" },
];

export const OpenWorkCard = ({ className, data }: Props) => {
  const t = useTranslations();

  return (
    <div
      className={cn(
        className,
        "w-full max-w-full sm:max-w-[300px] rounded-xl overflow-hidden bg-white my-custom-shadow"
      )}
    >
      <div className="relative">
        <CarouselWrapper images={images} />
      </div>

      <div className="p-4 flex flex-col gap-3">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold">{data.title}</h3>
          <p className="text-maket-gray text-sm sm:text-base">
            {data.category}
          </p>
        </div>

        <span className="text-lg sm:text-xl text-maket-secondary font-bold">
          {data.price} {t("price.sum.title")}
        </span>

        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            <div className="h-12 w-12 relative rounded-full">
              <Image
                src={data.client.avatar.src}
                alt={data.client.avatar.alt}
                fill
                style={{ objectFit: "cover" }}
                className="rounded-full"
              />
              {data.client.online && (
                <div className="absolute bottom-0 right-0 h-3 w-3 border-2 border-white rounded-full bg-maket-green" />
              )}
            </div>

            <div className="flex flex-col justify-between">
              <h4 className="text-base sm:text-lg font-semibold">
                {data.client.name}
              </h4>
              <p className="text-maket-gray text-sm">{data.client.type}</p>
            </div>
          </div>

          <Link
            href="/tashkent/open-works/slug"
            className="bg-maket-batafsil text-maket-secondary text-base sm:text-xl flex justify-center font-medium py-3 sm:py-3 rounded-xl hover:bg-maket-secondary hover:text-white transition-all duration-200"
          >
            {t("Main.sections.OpenWorkCard.more")}
          </Link>
        </div>
      </div>
    </div>
  );
};
