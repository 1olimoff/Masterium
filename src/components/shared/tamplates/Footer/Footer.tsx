import React from 'react';
import {cn} from '@lib/utils';
import Image from "next/image";

interface Props {
    className?: string;
}

export const Footer = ({className}: Props) => {
    return (
        <footer className={cn(className, "bg-maket-primary")}>
            <div className={"layout-width py-8 px-2"}>
                <div className={"flex flex-col gap-6"}>
                    <div className={"grid grid-cols-4"}>
                        <div className={"flex flex-col gap-2"}>
                            <Image src={"/svg/footer/logo.svg"} alt={"Footer logo of Masterium"} width={500} height={100} className={"w-full h-auto"} quality={100} />
                            <p>MASTERIUM - ustalar markazi</p>
                        </div>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </footer>
    );
};
