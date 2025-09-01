// components/ShortInfoTab.tsx
import React from "react"
import { cn } from "@/root/business/lib/utils"
import { useTranslations } from "next-intl"
import Image from "next/image"
import ServerLink from "../../../elements/Links/ServerLink"
import { offerdetails } from "../Gallery/Gallery"

interface Props {
  className?: string
  response:offerdetails
}

export const ShortInfoTab = ({ className, response }: Props) => {
  const t = useTranslations()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }).split("/").join(".")
  }
  return (
    <div className={cn("w-full flex flex-col gap-3", className)}>
    
    <p className="text-sm text-maket-gray">
        {t("WorksPage.content.shortInfo.createdDateTitle")} {formatDate(response.created_at)}
      </p>
      
      <h1 className="text-xl font-semibold">
       {response.title}
      </h1>
      <h2 className="text-3xl font-semibold">
       {response.price.toLocaleString()} {t("price.sum.title")}
      </h2>

      <div className="p-4 flex flex-col gap-2 rounded-xl bg-maket-batafsil">
        <p className="text-lg font-semibold text-maket-secondary uppercase">
          <span>{t("WorksPage.content.shortInfo.period.title")}</span> {response.total_date}{" "}
          <span>{t("WorksPage.content.shortInfo.period.days")}</span>
        </p>
        <p className="text-maket-secondary">
          {formatDate(response.start_date)} {t("WorksPage.content.shortInfo.period.from")} - {formatDate(response.end_date)}{" "}
          {t("WorksPage.content.shortInfo.period.to")}
        </p>
      </div>
          <ServerLink
        path={`worker-offers/${response.offer_id}/privacy`}
        className="text-maket-gold w-full py-2 px-8 justify-center text-sm sm:text-[16px] rounded-xl flex gap-2 bg-maket-primary hover:bg-sky-800">
       <Image
                    src="/svg/worksPage/send.svg"
                    alt="Send Icon"
                    width={20}
                    height={20}
                />
        {t("MyAds.FullInfoAds.seeofferdetail")}
      </ServerLink>
    </div>
  )
}
