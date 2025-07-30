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

interface UserProfile {
  first_name:string;
  last_name:string;
  avg_rating:number;
  profile_photo:string;
  comments_count:number;
  user_uuid:string
}

interface Props {
  className?: string;
  slug: string;
  response: UserProfile
}

export const Title = ({ className, slug, response }: Props) => {
  const t = useTranslations("OfferWork.Offers.breadcrumb");

  return (
    <div className={cn(className, "hidden sm:flex flex-col mt-2 gap-4")}>
      <Breadcrumb>
        <BreadcrumbList className="text-lg text-maket-gray">
          <BreadcrumbItem>
            <ServerLink path="/">
              {t("home")}
            </ServerLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>

          <BreadcrumbItem className="text-maket-gray">
            <ServerLink path="/services">
              {t("allServices")}
            </ServerLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>

          <BreadcrumbItem className='text-maket-gray'>
            <ServerLink path={`/services/${slug}`} >
              <p className={"text-gray-700"}>{t(`${slug}`)}</p>
            </ServerLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>


          <BreadcrumbItem className='text-maket-gray'>
            <ServerLink path={`/services/${slug}/${response.user_uuid}`}>
              <p className={"text-gray-700"}>{`${response.first_name} ${response.last_name}`}</p>
            </ServerLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>

          <BreadcrumbItem className="text-black">
              {t("offers")}
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-maket-primary text-3xl font-semibold">
        {t("offerData.offersTitle")}
      </h1>
    </div>
  );
};
