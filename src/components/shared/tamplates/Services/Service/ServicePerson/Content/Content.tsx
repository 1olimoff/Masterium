import React from 'react';
import { cn } from '@lib/utils';

interface Props {
    className?: string;
}

export const Content = ({ className }: Props) => {
    return (
        <div className={cn(className, "w-full flex flex-col pt-6")}>

        </div>
    );
};
