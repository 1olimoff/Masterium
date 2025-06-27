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
  // NOTE: Bu yerda namespace aniqligi muhim
  const t = useTranslations("OfferWork.Advertise.breadcrumb");

  return (
    <div className={cn(className, "flex flex-col gap-[10px]")}>
      <Breadcrumb>
        <BreadcrumbList className="text-lg text-maket-gray">
          <BreadcrumbItem>
            <ServerLink path="/">
              {t("home")}
            </ServerLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>

          <BreadcrumbItem className="text-black">
          <ServerLink path="/advertise">
            {t("advertise")}
            </ServerLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-maket-primary text-3xl font-semibold">
        {t("advertise")}
      </h1>
    </div>
  );
};
