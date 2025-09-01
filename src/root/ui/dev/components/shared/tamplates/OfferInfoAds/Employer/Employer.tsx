// components/Employer.tsx
import React from "react"
import { cn } from "@/root/business/lib/utils"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { Button } from "@/root/ui/dev/shadcn/ui/button"
import { Link } from "@/i18n/routing"
import ServerLink from "../../../elements/Links/ServerLink"
import { offerdetails } from "../Gallery/Gallery"

interface Props {
  className?: string
  response: offerdetails
}

export const Employer = ({ className, response }: Props) => {
  const t = useTranslations()
  return (
    <section className={cn("w-full flex flex-col gap-2", className)}>
      <p className="text-base sm:text-xl font-semibold uppercase">
        {t("WorksPage.content.employer.title")}
      </p>

      <div className="flex gap-2 border-b border-[#CFD9FE] pb-4">
        <div className="h-12 w-12 rounded-full relative shrink-0">
          <Image
            src={"/img/advertising/gozo.png"}
            alt={"Employer Image"}
            fill
            className="rounded-full object-cover"
          />
          <div className="absolute bottom-0 right-0 h-3 w-3 border-2 border-white rounded-full bg-maket-green" />
        </div>
        <div className="flex flex-col justify-between h-full text-sm sm:text-base">
          <h4 className="font-semibold">{response.user.first_name} {response.user.last_name}</h4>
          <p className="text-maket-gray text-sm">
            {t('WorksPage.content.employer.period.title')}{new Date(response.user.created_at).getFullYear()}  {""} {t('WorksPage.content.employer.period.subtitle')}
          </p>
        </div>
      </div>

      <div className="flex justify-center max-w-[350px] text-sm items-center w-full">
        <ServerLink
          path=""
          className="bg-white text-[#32ADE6] hover:bg-[#FFFF] flex justify-center items-center mt-1 hover:text-[#32ADE6] sm:text-[15px] text-center">
          {t("MyAds.FullInfoAds.btn")}
        </ServerLink>
      </div>
    </section>
  )
}
