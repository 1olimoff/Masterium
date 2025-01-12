import React from 'react';
import { cn } from '@lib/utils';

interface Props {
    className?: string;
}

const Aside = ({ className }: Props) => {
    return (
        <aside className={cn(className, "h-[20px] border-2 bg-white border-red-500 sticky top-0")}>

        </aside>
    );
};

export default Aside;
