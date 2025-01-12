import React from 'react';
import {cn} from '@lib/utils';
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


interface Props {
    className?: string;
}

const Aside = ({className}: Props) => {
    return (
        <aside className={cn(className, "py-3 px-2 shadow bg-white sticky top-0 flex justify-between items-center gap-2 layout-width")}>
            <div>
                <Image src={"/svg/aside/logo.svg"} alt={"masterium logo"} width={200} height={50}/>
            </div>
            <div className={"flex justify-between gap-4"}>
                <DropdownMenu>
                    <DropdownMenuTrigger
                        className={"bg-maket-primary text-white flex gap-4 justify-center items-center py-3 px-6 rounded-lg"}><Image
                        src={"/svg/aside/catalog.svg"} alt={"Category Icon"} width={25} height={25}/> <p
                        className={"font-light"}>Katalog</p></DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                        <DropdownMenuItem>Team</DropdownMenuItem>
                        <DropdownMenuItem>Subscription</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            </div>
        </aside>
    );
};

export default Aside;
