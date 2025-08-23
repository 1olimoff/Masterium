import React from 'react';
import { cn } from '@/root/business/lib/utils';
import {useTranslations} from "next-intl";
import {Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator} from "@/root/ui/dev/shadcn/ui/breadcrumb";
import ServerLink from "@/root/ui/dev/components/shared/elements/Links/ServerLink";

interface Props {
    className?: string;
}

export const Title = ({ className }: Props) => {
    const t = useTranslations();
    return (
        <div className={cn(className, "hidden sm:flex flex-col mt-2 gap-4")}>
            <Breadcrumb>
                <BreadcrumbList className={"text-lg text-maket-gray"}>
                    <BreadcrumbItem>
                        <ServerLink path={"/"} >
                            {t("OpenWorks.breadcrumb.home")}
                        </ServerLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        /
                    </BreadcrumbSeparator>

                    <BreadcrumbItem>
                    <ServerLink path={"/services/santex/sws"} >
                        <p className={"text-gray-700"}>{t('Services.Service.breadcrumb.santexName')}</p>
                        </ServerLink>
                    </BreadcrumbItem>

                </BreadcrumbList>
            </Breadcrumb>
            <h1></h1>
        </div>
    );
};
