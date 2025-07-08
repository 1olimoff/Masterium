import React from 'react'
import { Header } from './Header/Header';
import { Content } from './Content/Content';
import { cn } from '@/root/business/lib/utils';
import { Title } from './Title/Title';


interface Props {
    className?: string;
}
export const ForWorkers = ({ className }: Props) => {

    return (
        <div className={cn(className, "w-full flex flex-col gap-6 sm:px-4 px-2  pb-4")}>
            <Title />
            <Content />
        </div>
    );
}

export default ForWorkers