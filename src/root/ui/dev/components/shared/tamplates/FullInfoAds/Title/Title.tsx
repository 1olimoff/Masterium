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
import { Detail } from '../Navbar/Navbar';

interface Props {
  className?: string;
  detail:Detail;
}

export const InfoTitle = ({ className, detail }: Props) => {
  const t = useTranslations("MyAds");

  console.log("detailssss", detail);
  
  return (
    <div className={cn(className, "hidden sm:flex mt-2 px-2 flex-col gap-4")}>
      <Breadcrumb>
        <BreadcrumbList className="text-lg text-maket-gray">
          <BreadcrumbItem>
            <ServerLink path="/">
              {t("breadcrumb.home")}
            </ServerLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>

          <BreadcrumbItem className="text-maket-gray">
          <ServerLink path="/myads">
            {t("breadcrumb.myAds")}
            </ServerLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>

          <BreadcrumbItem className="text-black">
            {detail.title}
          </BreadcrumbItem>
        </BreadcrumbList>

        
      </Breadcrumb>

      <h1 className="text-maket-primary text-3xl font-semibold">
        {t("title")}
      </h1>
    </div>
  );
};
