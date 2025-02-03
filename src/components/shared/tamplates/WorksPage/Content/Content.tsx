import React from 'react';
import { cn } from '@lib/utils';
import {ShortInfo} from "@/components/shared/tamplates/WorksPage/Content/ShortInfo/ShortInfo";
import {Employer} from "@/components/shared/tamplates/WorksPage/Content/Employer/Employer";
import {Gallery} from "@/components/shared/tamplates/WorksPage/Content/Gallery/Gallery";

interface Props {
    className?: string;
}

export const Content = ({ className }: Props) => {
    return (
        <div className={cn(className, "flex gap-6")}>
            <div className={"flex-1 p-4 bg-white rounded-xl shadow"}>
                <Gallery />
            </div>
            <div className={"flex flex-col gap-6"}>
                <div className={"p-4 bg-white rounded-xl shadow"}>
                    <ShortInfo />
                </div>
                <div className={"p-4 bg-white rounded-xl shadow"}>
                    <Employer />
                </div>
            </div>
        </div>
    );
};
