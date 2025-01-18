import React from 'react';
import {cn} from '@lib/utils';
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button";


interface Props {
    className?: string;
}

const Aside = ({className}: Props) => {
    return (
        <aside
            className={cn(className, "py-3 px-2 shadow bg-white sticky top-0")}>
            <div className={'layout-width flex justify-between items-center gap-8'}>
                <div>
                    <Image src={"/svg/aside/logo.svg"} alt={"masterium logo"} width={200} height={50}/>
                </div>
                <div className={"flex justify-between items-center gap-4 flex-1"}>
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            className={"bg-maket-primary hover:bg-blue-900 text-white flex gap-2 justify-center items-center py-2 px-6 rounded-lg"}>
                            <Image src={"/svg/aside/catalog.svg"} alt={"Category Icon"} width={25} height={25}/>
                            <p className={"font-light"}>Katalog</p>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem><Image src={'/svg/aside/tech.svg'} alt={'Tech Icon'} width={18}
                                                     height={18}/>Santehniklar</DropdownMenuItem>
                            <DropdownMenuItem><Image src={'/svg/aside/tech.svg'} alt={'Tech Icon'} width={18}
                                                     height={18}/>Santehniklar</DropdownMenuItem>
                            <DropdownMenuItem><Image src={'/svg/aside/tech.svg'} alt={'Tech Icon'} width={18}
                                                     height={18}/>Santehniklar</DropdownMenuItem>
                            <DropdownMenuItem><Image src={'/svg/aside/tech.svg'} alt={'Tech Icon'} width={18}
                                                     height={18}/>Santehniklar</DropdownMenuItem>
                            <DropdownMenuItem><Image src={'/svg/aside/tech.svg'} alt={'Tech Icon'} width={18}
                                                     height={18}/>Santehniklar</DropdownMenuItem>
                            <DropdownMenuItem><Image src={'/svg/aside/tech.svg'} alt={'Tech Icon'} width={18}
                                                     height={18}/>Santehniklar</DropdownMenuItem>
                            <DropdownMenuItem><Image src={'/svg/aside/tech.svg'} alt={'Tech Icon'} width={18}
                                                     height={18}/>Santehniklar</DropdownMenuItem>
                            <DropdownMenuItem><Image src={'/svg/aside/tech.svg'} alt={'Tech Icon'} width={18}
                                                     height={18}/>Santehniklar</DropdownMenuItem>
                            <DropdownMenuItem><Image src={'/svg/aside/tech.svg'} alt={'Tech Icon'} width={18}
                                                     height={18}/>Santehniklar</DropdownMenuItem>
                            <DropdownMenuItem><Image src={'/svg/aside/tech.svg'} alt={'Tech Icon'} width={18}
                                                     height={18}/>Santehniklar</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <div className="relative w-full">
                        <Image
                            src="/svg/aside/search.svg"
                            alt="Search Icon"
                            width={20}
                            height={20}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        />
                        <Input
                            type="search"
                            placeholder="Xizmat yoki usta nomi bo’yicha qidirish"
                            className="pl-10 rounded-lg border-[#CFD9FE] border-2 flex-1" // Отступ для текста, чтобы не перекрывал иконку
                        />
                    </div>
                    <Button type={"submit"} className={"bg-maket-primary hover:bg-blue-900"}>Qidirish</Button>
                </div>
                <div>
                    <Button variant={'ghost'}>
                        <Image src={'/svg/aside/add.svg'} alt={"Add Icon"} width={20} height={20}/>
                        <p>E'lon berish</p>
                    </Button>
                    <Button variant={'ghost'}>
                        <Image src={'/svg/aside/user.svg'} alt={"Add Icon"} width={20} height={20}/>
                        <p>Kirish</p>
                    </Button>
                </div>
            </div>
        </aside>
    );
};

export default Aside;
