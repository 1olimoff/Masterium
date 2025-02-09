import React from 'react';
import { cn } from '@lib/utils';

interface Props {
    className?: string;
}

export const ImageTab = ({ className }: Props) => {
    return (
        <div className={cn(className)}></div>
    );
};
