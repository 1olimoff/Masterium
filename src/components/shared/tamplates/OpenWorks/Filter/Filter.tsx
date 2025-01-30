import React from 'react';
import { cn } from '@lib/utils';

interface Props {
    className?: string;
}

export const Filter = ({ className }: Props) => {
    return (
        <div className={cn(className, "w-full rounded-2xl bg-white p-6 flex flex-col gap-6")}>

        </div>
    );
};
