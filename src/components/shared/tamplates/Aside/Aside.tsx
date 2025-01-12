import React from 'react';
import { cn } from '@lib/utils';
import Image from "next/image";

interface Props {
    className?: string;
}

const Aside = ({ className }: Props) => {
    return (
        <aside className={cn(className, "py-12 bg-white sticky top-0 flex justify-between layout-width")}>
            <div>
                <Image src={"/svg/aside/logo.svg"} alt={"masterium logo"} width={250} height={50} />
            </div>
            <div>

            </div>
        </aside>
    );
};

export default Aside;
