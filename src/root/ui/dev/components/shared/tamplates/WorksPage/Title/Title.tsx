import React from 'react';
import { cn } from '@/root/business/lib/utils';
import {useTranslations} from "next-intl";
import {Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator} from "@/root/ui/dev/shadcn/ui/breadcrumb";
import ServerLink from "@/root/ui/dev/components/shared/elements/Links/ServerLink";
import { MasterDetail } from '../Content/Content';

interface Props {
    className?: string;
    response: MasterDetail
}

export const Title = ({ className, response }: Props) => {
    const t = useTranslations();
    return (
        <div className={cn(className, "hidden sm:flex pt-2 flex-col gap-4")}>
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
                        <ServerLink path={"open-works"} >
                            {t("OpenWorks.breadcrumb.openWorks")}
                        </ServerLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        /
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <p className={"text-gray-700"}>{response.title}</p>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <h1 className={"text-maket-primary text-3xl font-semibold"}>{t("OpenWorks.breadcrumb.openWorks")}</h1>
        </div>
    );
};
