import React from 'react';
import { cn } from '@lib/utils';

interface Props {
    className?: string;
}

const Aside = ({ className }: Props) => {
    return (
        <div className={cn(className)}>
            Aside Fuck
        </div>
    );
};

export default Aside;
