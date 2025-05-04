import React from 'react';
import {cn} from '@lib/utils';

interface Props {
    className?: string;
    children?: React.ReactNode;
}

export const FooterProvider = ({className, children}: Props) => {
    return (
        <footer className={cn(className, "bg-maket-primary")}>
            <div className={"layout-width py-8 px-2"}>
                <div className={"flex flex-col gap-6"}>
                    {children}
                </div>
            </div>
        </footer>
    );
};
