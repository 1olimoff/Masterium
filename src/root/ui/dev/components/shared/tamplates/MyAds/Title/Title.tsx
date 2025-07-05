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

interface Props {
  className?: string;
}

export const Title = ({ className }: Props) => {
  const t = useTranslations("MyAds");

  return (
    <div className={cn(className, "hidden mt-2 sm:flex flex-col px-2 gap-4")}>
      <Breadcrumb>
        <BreadcrumbList className="text-lg text-maket-gray">
          <BreadcrumbItem>
            <ServerLink path="/">
              {t("breadcrumb.home")}
            </ServerLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>

          <BreadcrumbItem className="text-black">
          <ServerLink path="/myads">
            {t("breadcrumb.myAds")}
            </ServerLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-maket-primary text-3xl font-semibold">
        {t("title")}
      </h1>
    </div>
  );
};
