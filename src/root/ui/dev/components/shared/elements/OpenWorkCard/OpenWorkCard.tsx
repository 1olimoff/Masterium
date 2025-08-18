import React from "react";
import { Link } from "@/root/business/locales/i18n/routing";
import { cn } from "@/root/business/lib/utils";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { CarouselWrapper } from "./CarouselWrapper/CarouselWraper";
import ServerLink from "../Links/ServerLink";

// props uchun to'g'ri interfeys
export interface Item {
  offer_id: number;
  title: string;
  category_name: string;
  price: number;
  currency: string;
  images: string[];
  user: {
    user_uuid: string;
    first_name: string;
    last_name: string;

  }
}

interface Props {
  className?: string;
  data: Item;
}

export const OpenWorkCard = ({ className, data }: Props) => {
  const t = useTranslations();

  const dataImages: { src: string; alt: string }[] = data.images.map((el, i) => ({
    src: `${process.env.NEXT_PUBLIC_BASE_URL}${el}`,
    alt: `Image ${i}`,
  }));


  return (
    <div
      className={cn(
        className,
        "w-full max-w-full sm:max-w-[390px] rounded-xl overflow-hidden bg-white my-custom-shadow"
      )}
    >
      <div className="relative">
        <CarouselWrapper images={dataImages} />
      </div>

      <div className="p-4 flex flex-col gap-3">
        <div>
          <h3 className="text-lg sm:text-[18px] font-[590]">{data.title}</h3>
          <p className="text-maket-gray text-sm sm:text-base">
            {data.category_name}
          </p>
        </div>

        <span className="text-lg sm:text-xl text-maket-secondary font-bold">
          {data.price} {t("price.sum.title")}
        </span>

        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            <div className="h-12 w-12 relative rounded-full">
              <Image
                src={data.images[0] ? `${process.env.NEXT_PUBLIC_BASE_URL}${data.images[0]}` : "/default-profile.jpg"}
                alt={data.user.first_name}
                fill
                style={{ objectFit: "cover" }}
                className="rounded-full"
              />
            </div>

            <div className="flex flex-col justify-between">
              <h4 className="text-base sm:text-lg font-semibold">
                {data.user.last_name} {data.user.first_name} 
              </h4>
              <p className="text-maket-gray text-sm">{data.category_name}</p>
            </div>
          </div>

          <ServerLink
            path={`open-works/${data.offer_id}`}
            className="bg-maket-batafsil text-maket-secondary text-base sm:text-xl flex justify-center font-medium py-3 sm:py-3 rounded-xl hover:bg-maket-secondary hover:text-white transition-all duration-200"
          >
            {t("Main.sections.OpenWorkCard.more")}
          </ServerLink>
        </div>
      </div>
    </div>
  );
};