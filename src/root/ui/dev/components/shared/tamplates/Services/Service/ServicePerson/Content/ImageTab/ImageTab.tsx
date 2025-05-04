import React from 'react';
import { cn } from '@/root/business/lib/utils';

interface Props {
    className?: string;
}

export const ImageTab = ({ className }: Props) => {
    return (
        <div className={cn(className)}></div>
    );
};
