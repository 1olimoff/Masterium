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
        <div className={cn(className, "hidden sm:flex mt-2 flex-col gap-4")}>
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
                        <ServerLink path={"/services"} >
                            {t("Services.Service.breadcrumb.allServices")}
                        </ServerLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        /
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                    <ServerLink path={"/services/santex"} >
                        <p className={"text-gray-700"}>{t('Services.Service.breadcrumb.santex')}</p>
                        </ServerLink>

                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <h1 className={"text-maket-primary text-3xl font-semibold"}>{t("Services.Service.breadcrumb.santex")}</h1>
        </div>
    );
};
