import React from 'react';
import { cn } from '@lib/utils';
import {AdGrid} from "@/root/components/shared/elements/advertising/AdGrid";
import {Title} from "@/root/components/shared/tamplates/Services/Service/ServicePerson/Title/Title";
import {Header} from "@/root/components/shared/tamplates/Services/Service/ServicePerson/Header/Header";
import {Content} from "@/root/components/shared/tamplates/Services/Service/ServicePerson/Content/Content";

interface Props {
    className?: string;
}

export const ServicePerson = ({ className }: Props) => {
    return (
        <div className={cn(className, "w-full flex flex-col gap-12 pt-6")}>
            <AdGrid />
            <Title />
            <Header />
            <Content />
        </div>
    );
};
