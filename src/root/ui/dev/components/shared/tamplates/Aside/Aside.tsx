import React from 'react';
import {cn} from '@/root/business/lib/utils';
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/root/components/ui/dropdown-menu"
import {Input} from "@/root/components/ui/input"
import {Button} from "@/root/components/ui/button";
import {useTranslations} from "next-intl";
import {LoginProviderDialog} from "@/root/components/shared/elements/account/login/LoginProviderDialog";


interface Props {
    className?: string;
}

const Aside = ({className}: Props) => {
    const t = useTranslations("Aside");
    return (
        <aside
            className={cn(className, "py-3 px-2 shadow bg-maket-primary sticky top-0 z-[50]")}>
            <div className={'layout-width flex justify-between items-center gap-8'}>
                <a href={'/'}>
                    <Image src={"/svg/footer/logo.svg"} alt={"masterium logo"} width={250} height={80}/>
                </a>
                <div className={"flex justify-between items-center gap-4 flex-1"}>
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            className={"bg-white hover:bg-maket-primary border border-white hover:text-white text-maket-primary transition-all duration-200 flex gap-2 group justify-center items-center py-2 px-6 rounded-lg"}>
                            <Image src={"/svg/aside/catalog.svg"} alt={"Category Icon"} width={25} height={25} className={"group-hover:hidden"}/>
                            <Image src={"/svg/aside/catalog-white.svg"} alt={"Category Icon"} width={25} height={25} className={"group-hover:block hidden"}/>
                            <p className={"font-light"}>{t('catalog')}</p>
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
                            placeholder={t('search.placeholder')}
                            className="pl-10 rounded-lg border-[#CFD9FE] border-2 flex-1" // Отступ для текста, чтобы не перекрывал иконку
                        />
                    </div>
                    <Button type={"submit"}
                            className={"bg-white text-maket-primary border border-white hover:bg-maket-primary hover:text-white"}>{t('search.button')}</Button>
                </div>
                <div className={"flex gap-2"}>
                    <Button className={"bg-white text-maket-primary group hover:bg-maket-primary hover:text-white border border-white"}>
                        <Image src={'/svg/aside/add.svg'} alt={"Add Icon"} width={20} height={20} className={"group-hover:hidden"}/>
                        <Image src={'/svg/aside/add-white.svg'} alt={"Add Icon"} width={20} height={20} className={"group-hover:block hidden"}/>
                        <p>{t('action.announcement')}</p>
                    </Button>
                    <LoginProviderDialog>
                        <Button className={"bg-white group text-maket-primary hover:bg-maket-primary hover:text-white border border-white"}>
                            <Image src={'/svg/aside/user.svg'} alt={"Add Icon"} width={20} height={20} className={"group-hover:hidden"}/>
                            <Image src={'/svg/aside/user-white.svg'} alt={"Add Icon"} width={20} height={20} className={"group-hover:block hidden"}/>
                            <p>{t('action.account.login')}</p>
                        </Button>
                    </LoginProviderDialog>
                </div>
            </div>
        </aside>
    );
};

export default Aside;
