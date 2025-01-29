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
                        <div className={"flex flex-col gap-4"}>
                            <Image src={"/svg/footer/logo.svg"} alt={"Footer logo of Masterium"} width={500}
                                   height={100} className={"w-full max-w-[350px] h-auto"} quality={100}/>
                            <p className={"text-maket-gold"}>MASTERIUM - ustalar markazi</p>
                        </div>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </footer>
    );
};
