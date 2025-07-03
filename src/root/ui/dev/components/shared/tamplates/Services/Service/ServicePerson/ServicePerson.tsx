import React from 'react';
import { cn } from '@/root/business/lib/utils';
import { AdGrid } from "@/root/ui/dev/components/shared/elements/advertising/AdGrid";
import { Title } from "@/root/ui/dev/components/shared/tamplates/Services/Service/ServicePerson/Title/Title";
import { Header } from "@/root/ui/dev/components/shared/tamplates/Services/Service/ServicePerson/Header/Header";
import { Content } from "@/root/ui/dev/components/shared/tamplates/Services/Service/ServicePerson/Content/Content";
import { useTranslations } from 'next-intl';


interface Props {
    className?: string;
}

export const ServicePerson = ({ className }: Props) => {
    const t = useTranslations("")
    return (
        <div className={cn(className, "w-full flex flex-col gap-12 pt-4 pb-4")}>
            <AdGrid />
            <Title />
            <Header />
            <Content />

        </div>
    );
};
