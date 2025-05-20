import React from 'react';
import { cn } from '@/root/business/lib/utils';
import {useTranslations} from "next-intl";
import {Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator} from "@/root/ui/dev/components/ui/breadcrumb";
import ServerLink from "@/root/ui/dev/components/shared/elements/Links/ServerLink";

interface Props {
    className?: string;
}

export const Title = ({ className }: Props) => {
    const t = useTranslations();
    return (
        <div className={cn(className, "flex flex-col gap-4")}>
            <Breadcrumb>
                <BreadcrumbList className={"text-lg text-maket-gray"}>
                    <BreadcrumbItem>
                        <ServerLink path={""} >
                            {t("OpenWorks.breadcrumb.home")}
                        </ServerLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        /
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <ServerLink path={""} >
                            {t("Services.Service.breadcrumb.allServices")}
                        </ServerLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        /
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <ServerLink path={""} >
                            {t('Services.Service.breadcrumb.santex')}
                        </ServerLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        /
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <li className={"text-gray-700"}>Eshonov Bahodir</li>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
};
