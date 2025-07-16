// components/ShortInfoTab.tsx
import React from "react"
import { cn } from "@/root/business/lib/utils"
import { useTranslations } from "next-intl"
import { Button } from "@/root/ui/dev/shadcn/ui/button"
import { Link } from "@/i18n/routing"

interface Props {
  className?: string
}

export const ShortInfoTab = ({ className }: Props) => {
  const t = useTranslations("")
  return (
    <div className={cn("w-full flex flex-col gap-3", className)}>
      <Link
        href="/tashkent/advertise"
        className="text-maket-gold w-full py-2 px-4  justify-center text-sm sm:text-[16px] rounded-xl flex gap-2 bg-maket-primary hover:bg-sky-800">
        <svg
          width="22"
          height="22"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.5 2H9.5C4.5 2 2.5 4 2.5 9V15C2.5 20 4.5 22 9.5 22H15.5C20.5 22 22.5 20 22.5 15V13"
            stroke="#F0E7D8"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16.5399 3.02001L8.65988 10.9C8.35988 11.2 8.05988 11.79 7.99988 12.22L7.56988 15.23C7.40988 16.32 8.17988 17.08 9.26988 16.93L12.2799 16.5C12.6999 16.44 13.2899 16.14 13.5999 15.84L21.4799 7.96001C22.8399 6.60001 23.4799 5.02001 21.4799 3.02001C19.4799 1.02001 17.8999 1.66001 16.5399 3.02001Z"
            stroke="#F0E7D8"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.4102 4.15C16.0802 6.54 17.9502 8.41 20.3502 9.09"
            stroke="#F0E7D8"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
       {t("MyAds.changeAdsbtn")}
      </Link>
      <p className="text-sm text-maket-gray">
        {t("WorksPage.content.shortInfo.createdDateTitle")} 25.11.2024 09:45
      </p>
      
      <h1 className="text-xl font-semibold">
        Oshxonani yevro remont qilish kerak
      </h1>
      <h2 className="text-3xl font-semibold">
        12 850 000 {t("price.sum.title")}
      </h2>

      <div className="p-4 flex flex-col gap-2 rounded-xl bg-maket-batafsil">
        <p className="text-lg font-semibold text-maket-secondary uppercase">
          <span>{t("WorksPage.content.shortInfo.period.title")}</span> 23{" "}
          <span>{t("WorksPage.content.shortInfo.period.days")}</span>
        </p>
        <p className="text-maket-secondary">
          25.11.2024 {t("WorksPage.content.shortInfo.period.from")} - 18.12.2024{" "}
          {t("WorksPage.content.shortInfo.period.to")}
        </p>
      </div>
    </div>
  )
}
