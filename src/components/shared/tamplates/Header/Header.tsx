import React from 'react';
import {cn} from '@lib/utils';

interface Props {
    className?: string;
}

const Header = ({className}: Props) => {
    return (
        <header className={cn(className)}>
            Header Fuck
        </header>
    );
};


export default Header;
