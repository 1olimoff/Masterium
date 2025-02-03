import React from 'react';
import { cn } from '@lib/utils';

interface Props {
    className?: string;
}

export const Description = ({ className }: Props) => {
    return (
        <div className={cn(className, "w-full h-full")}>

        </div>
    );
};
