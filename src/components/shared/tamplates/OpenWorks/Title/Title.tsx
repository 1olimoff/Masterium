import React from 'react';
import { cn } from '@lib/utils';

interface Props {
    className?: string;
}

export const Title = ({ className }: Props) => {
    return (
        <div className={cn(className, "flex flex-col gap-6")}>

        </div>
    );
};
