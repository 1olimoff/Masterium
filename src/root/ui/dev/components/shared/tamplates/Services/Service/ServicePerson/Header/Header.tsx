import React from 'react';
import { cn } from '@/root/business/lib/utils';
import { Button } from "@/root/ui/dev/shadcn/ui/button";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from '@/root/business/locales/i18n/routing';
import ServerLink from '../../../../../elements/Links/ServerLink';



interface Props {
    className?: string;
}

export const Header = ({ className }: Props) => {
    const t = useTranslations('')
    return (
        <section className={cn(className, "w-full  flex justify-between gap-4")}>
            <div className={"flex gap-3"}>
                <div className={"rounded-full max-h-[84px] border-2 border-maket-green"}>
                    <div className={"h-20 w-20  rounded-full relative border-2 border-white"}>
                        <Image src={"/img/advertising/gas.png"} alt={"Eshonov Baxodir"} fill objectFit={"cover"}
                            className={"rounded-full"} />
                        <div
                            className={"absolute bottom-0 right-0 h-5 w-5 border-2 border-white rounded-full bg-maket-green"}>
                        </div>

                    </div>
                </div>
                <div className={"flex flex-col justify-between h-full"}>
                    <h1 className={"text-2xl sm:text-3xl font-semibold"}>Eshonov Baxodir</h1>
                    <p className={"text-maket-gray"}>Santexnik</p>
                    <div className={"flex gap-1 items-center"}>
                        <div className={"relative h-4 w-4 flex items-center justify-center"}>
                            <Image src={"/svg/main/dailyWorkersCard/star-fill.svg"} alt={"This is star fill for rate"}
                                fill objectFit={"contain"} />
                        </div>
                        <p className={"text-maket-primary"}>4.5</p>
                        <p className={"text-sm text-maket-gray"}>(30 {t("Main.sections.DailyWorkers.Card.comments")})</p>
                    </div>
                </div>
            </div>
 
            <ServerLink
                path="offer-works"
                className="hidden sm:inline-flex items-center max-w-[250px] h-[50px] gap-2 px-4 py-2 rounded-xl bg-maket-primary text-maket-gold text-lg font-medium hover:bg-sky-800 transition-colors duration-200"
            >
                <Image
                    src="/svg/worksPage/send.svg"
                    alt="Send this work icon"
                    width={24}
                    height={24}
                    className="object-contain"
                />
                <span>{t('Services.Service.ServicePerson.sendOffer')}</span>
            </ServerLink>


        </section>
    );
};
