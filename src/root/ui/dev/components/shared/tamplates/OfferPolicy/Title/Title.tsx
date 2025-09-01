import React from 'react';
import { cn } from '@/root/business/lib/utils';
import { useTranslations } from "next-intl";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/root/ui/dev/shadcn/ui/breadcrumb";
import ServerLink from "@/root/ui/dev/components/shared/elements/Links/ServerLink";
import { offerdetails } from '../../OfferInfoAds/Gallery/Gallery';

interface Props {
    className?: string;
  offerData: offerdetails

}

interface Props {
}

export const Title = ({ className, offerData }: Props) => {

    const t = useTranslations("ChangeData");

    return (
        <div className={cn(className, "hidden sm:flex flex-col mb-2 gap-2")}>
            <Breadcrumb>
                <BreadcrumbList className="text-lg text-maket-gray">
                    <BreadcrumbItem>
                        <ServerLink path="/">
                            {t("privacypolicy.breadcrumb.home")}
                        </ServerLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>/</BreadcrumbSeparator>

                    <BreadcrumbItem className="text-maket-gray">
                        <ServerLink path="">
                            {t("privacypolicy.breadcrumb.myoffers")}
                        </ServerLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>/</BreadcrumbSeparator>

                    <BreadcrumbItem className="text-black">
                        <ServerLink path="">
                            {offerData.title}
                        </ServerLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
};
