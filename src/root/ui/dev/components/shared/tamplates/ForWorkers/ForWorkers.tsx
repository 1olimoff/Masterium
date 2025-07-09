import React from 'react'
import { Header } from './Header/Header';
import { Content } from './Content/Content';
import { cn } from '@/root/business/lib/utils';
import { Title } from './Title/Title';
import { MobileBackTab } from './Title/MobileTabBar';


interface Props {
    className?: string;
}
export const ForWorkers = ({ className }: Props) => {

    return (
        <div className={cn(className, "w-full flex flex-col gap-6 sm:px-4 sm:py-2 pb-4")}>
            <Title />
            <MobileBackTab />
            <div className='px-2'>
            <Content />
            </div>
        </div>
    );
}

export default ForWorkers