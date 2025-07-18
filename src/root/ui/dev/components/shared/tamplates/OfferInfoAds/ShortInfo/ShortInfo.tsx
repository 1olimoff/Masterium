// components/ShortInfoTab.tsx
import React from "react"
import { cn } from "@/root/business/lib/utils"
import { useTranslations } from "next-intl"
import { Button } from "@/root/ui/dev/shadcn/ui/button"
import { Link } from "@/i18n/routing"
import Image from "next/image"

interface Props {
  className?: string
}

export const ShortInfoTab = ({ className }: Props) => {
  const t = useTranslations()
  return (
    <div className={cn("w-full flex flex-col gap-3", className)}>
    
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
          <Link
        href="/tashkent/worker-offers/sss/ss"
        className="text-maket-gold w-full py-2 px-8 justify-center text-sm sm:text-[16px] rounded-xl flex gap-2 bg-maket-primary hover:bg-sky-800">
       <Image
                    src="/svg/worksPage/send.svg"
                    alt="Send Icon"
                    width={20}
                    height={20}
                />
        {t("MyAds.FullInfoAds.seeofferdetail")}
      </Link>
    </div>
  )
}
