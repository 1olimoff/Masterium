import { cn } from "@/root/business/lib/utils";
import { useTranslations } from "next-intl";
import { DailyWorkersCard } from "../../../elements/DailyWorkersCard/DailyWorkersCard";
import { MoreButton } from "../../../elements/Buttons/MoreButton";
import ServerLink from "../../../elements/Links/ServerLink";

interface Props {
    className?: string;
    dailyWorkers: []
}

export const DailyWorkersClient = ({ dailyWorkers, className }: Props) => {
    const t = useTranslations('Main.sections');

    return (
        <section className={cn(className, 'w-full flex flex-col gap-4 sm:mt-6 mt-2 md:gap-6')}>
            <div className="w-full flex justify-between items-center gap-2 md:gap-4">
                <h3 className="text-2xl font-semibold md:text-4xl">{t('DailyWorkers.title')}</h3>
                <MoreButton title={t('OpenWorks.more')} link="services/slug" />
            </div>
            <div className="w-full overflow-x-auto scrollbar-hide md:overflow-x-auto md:scrollbar-hide lg:overflow-x-visible">
                <div
                    className={cn(
                        'flex flex-row gap-4 pb-4',
                        'md:flex md:gap-6 md:pb-4',
                        'lg:grid lg:grid-cols-4 lg:gap-6'
                    )}
                >
                    {dailyWorkers.map((item: any, index: number) => (
                        <div
                            key={index}
                            className={cn(
                                'flex-shrink-0 w-[270px]',
                                'md:flex-shrink-0 md:w-[300px]',
                                'lg:w-auto'
                            )}
                        >
                            <ServerLink path={`services/${item.user_uuid}`}>
                                <DailyWorkersCard data={item} />
                            </ServerLink>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    )
}