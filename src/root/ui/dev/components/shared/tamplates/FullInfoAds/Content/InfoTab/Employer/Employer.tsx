// components/Employer.tsx
import React from "react"
import { cn } from "@/root/business/lib/utils"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { Button } from "@/root/ui/dev/shadcn/ui/button"
import { Link } from "@/i18n/routing"

interface Props {
  className?: string
}

export const Employer = ({ className }: Props) => {
  const t = useTranslations("")
  return (
    <section className={cn("w-full flex flex-col gap-2", className)}>
      <p className="text-xl font-semibold uppercase">
        {t("WorksPage.content.employer.title")}
      </p>

      <div className="flex items-center gap-3 border-b border-[#CFD9FE] pb-4">
        <div className="relative h-12 w-12 rounded-full overflow-hidden">
          <Image
            src="/img/advertising/gozo.png"
            alt="Employer"
            fill
            className="object-cover rounded-full"
          />
          <span className="absolute bottom-0 right-0 h-3 w-3 border-2 border-white rounded-full bg-maket-green" />
        </div>

        <div className="flex flex-col justify-center">
          <h4 className="text-lg font-semibold">Eshonov Bahodir</h4>
          <p className="text-sm text-maket-gray">
            {t("WorksPage.content.employer.period.title")} 2024{" "}
            {t("WorksPage.content.employer.period.subtitle")}
          </p>
        </div>
      </div>
      <div className="flex justify-center max-w-[400px] items-center w-full">
        <Link
        href=""
         className="bg-white text-[#32ADE6] hover:bg-[#FFFF]  hover:text-[#32ADE6]  sm:text-[15px] text-center">
         {t("MyAds.FullInfoAds.btn")}
        </Link>
      </div>
    </section>
  )
}
