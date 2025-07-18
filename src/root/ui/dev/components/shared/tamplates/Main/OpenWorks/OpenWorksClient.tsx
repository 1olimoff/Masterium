'use client'
import { MoreButton } from "../../../elements/Buttons/MoreButton"
import { Item, OpenWorkCard } from "../../../elements/OpenWorkCard/OpenWorkCard"
import { cn } from "@/root/business/lib/utils"
import { useTranslations } from "next-intl"

export const OpenWorksClient = ({openWorks}: any) => {
    const t = useTranslations('Main.sections');


    return (<>
    <div className="w-full flex justify-between items-center gap-2 md:gap-4">
        <h3 className="text-2xl font-semibold md:text-4xl">{t('OpenWorks.title')}</h3>
        <MoreButton className="text-[15px]" title={t('OpenWorks.more')} link="open-works" />
      </div>
      <div className="w-full overflow-x-auto scrollbar-hide md:overflow-x-auto md:scrollbar-hide lg:overflow-x-visible">
        <div
          className={cn(
            'flex flex-row gap-4 pb-4',
            'md:gap-2 md:flex md:flex-row',
            'lg:grid lg:grid-cols-4 lg:gap-2'
          )}
        >
          {openWorks.map((item: Item) => (
            <div
              className={cn(
                'flex-shrink-0 w-[270px]',
                'md:flex-shrink-0 md:w-[300px]',
                'lg:w-auto'
              )}
              key={item.offer_id}
            >
              <OpenWorkCard data={item} />
            </div>
          ))}
        </div>
      </div>
      </>)
}