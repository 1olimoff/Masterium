"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { cn } from '@/root/business/lib/utils';
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/root/ui/dev/shadcn/ui/dropdown-menu";
import { useTranslations } from "next-intl";
import ServerLink from '../../elements/Links/ServerLink';
import InputArea from './InputArea/InputArea';
import { Button } from '@/root/ui/dev/shadcn/ui/button';
import { LoginProviderDialog } from '../../elements/account/login/LoginTablet';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/root/ui/dev/shadcn/ui/dialog';
import PhoneInput from 'react-phone-input-2';
import { Input } from '@/root/ui/dev/shadcn/ui/input';

interface Category {
    id: number;
    name: string;
    icon: string;
    slug: string
}

interface Props {
    className?: string;
    token: string | null;
    categories: Category[]
}

const Aside = ({ className, token, categories }: Props) => {
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");

    const t = useTranslations("Aside");

    return (
        <aside className={cn(className, "py-3 px-2 sm:shadow sm:flex hidden sticky sm:bg-maket-primary bg-white top-0 z-[50]")}>
            <div className="layout-width flex justify-between items-center gap-4 w-full">

                {/* Logo */}
                <ServerLink path="" className="max-w-[200px] w-full hidden sm:flex">
                    <Image src="/svg/footer/logo.svg" alt="masterium logo" priority width={250} height={80} />
                </ServerLink>

                {/* Middle section */}
                <div className="flex items-center gap-3 flex-1 min-w-0">

                    {/* Catalog */}
                    <div className="w-full max-w-[120px] flex-shrink-0">
                        <DropdownMenu>
                            <DropdownMenuTrigger className="bg-white hover:bg-maket-primary w-full border border-white hover:text-white text-maket-primary transition-all duration-200 gap-2 group justify-center items-center py-2 px-3 rounded-lg flex">
                                <Image src="/svg/aside/catalog.svg" alt="Category Icon" width={20} height={20} className="group-hover:hidden" />
                                <Image src="/svg/aside/catalog-white.svg" alt="Category Icon" width={20} height={20} className="group-hover:block hidden" />
                                <p className="font-light text-sm truncate">{t('catalog')}</p>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {
                                    categories.map((category) => (
                                        <ServerLink path={`services/${category.slug}`} key={category.id}>
                                            <DropdownMenuItem className="flex items-center space-x-2 px-2 py-1.5 text-sm">
                                                <Image
                                                    src={`${process.env.NEXT_PUBLIC_BASE_URL}${category.icon}`}
                                                    alt={`${category.name} Icon`}
                                                    width={18}
                                                    height={18}
                                                />
                                                <span>{category.name}</span>
                                            </DropdownMenuItem>
                                        </ServerLink>
                                    ))
                                }
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    {/* Search */}
                    <InputArea />

                    {/* Search Button */}
                    {/* <div className="w-full max-w-[130px] flex-shrink-0">
                        <Button
                            type="submit"
                            className="bg-white text-maket-primary border border-white hover:bg-maket-primary hover:text-white w-full"
                        >
                            {t('search.button')}
                        </Button>
                    </div> */}
                </div>

                {/* Actions */}
                <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
                    {/* Add link */}
                    <ServerLink
                        path="advertise"
                        className="group bg-white h-[42px] px-2 flex items-center gap-2 rounded-md text-maket-primary border border-white hover:bg-maket-primary hover:text-white whitespace-nowrap transition-colors"
                    >
                        <Image
                            src="/svg/aside/add.svg"
                            alt="Add Icon"
                            width={20}
                            height={20}
                            className="group-hover:hidden transition-opacity duration-200"
                        />
                        <Image
                            src="/svg/aside/add-white.svg"
                            alt="Add Icon"
                            width={20}
                            height={20}
                            className="hidden group-hover:block transition-opacity duration-200"
                        />
                        <p className="text-sm">{t('action.announcement')}</p>
                    </ServerLink>

                    {/* Login */}
                    {token ? (
                        <>

                            <ServerLink
                                path="myads"
                                className="group bg-white h-[42px] px-2 flex items-center gap-2 rounded-md text-maket-primary border border-white hover:bg-maket-primary hover:text-white whitespace-nowrap transition-colors"
                            >
                                <Image
                                    src="/svg/aside/ads.svg"
                                    alt="My Ads Icon"
                                    width={20}
                                    height={20}
                                    className="group-hover:hidden transition-opacity duration-200"
                                />
                                <Image
                                    src="/svg/aside/adsactive.svg"
                                    alt="My Ads Active Icon"
                                    width={20}
                                    height={20}
                                    className="hidden group-hover:block transition-opacity duration-200"
                                />
                                <p className="text-sm">{t('action.myads')}</p>
                            </ServerLink>

                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button className="group bg-white h-[42px] px-2 flex items-center gap-2 rounded-md text-maket-primary border border-white hover:bg-maket-primary hover:text-white whitespace-nowrap transition-colors">Master bo'lish</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader className='text-center'>
                                        <DialogTitle className='text-2xl font-bold text-[#001D55] text-center'>Master bo'lib kirish</DialogTitle>
                                        <DialogDescription className='text-center'>
                                            Master bo'lib ishlash uchun quyidagi ma'lumotlarni to'ldiring
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="flex-1 overflow-y-auto px-2 py-2">
                                        <div className="flex flex-col gap-2">
                                            <label
                                                className="text-sm font-medium w-28 h-28 text-gray-700 border-2 border-gray-300 rounded-[10px] flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 self-center"
                                            >
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    multiple
                                                    className="hidden"
                                                />
                                                <img src="/img/advertising/pickpic.png" alt="pick" className="w-8 h-8" />
                                                <span className="text-gray-500 text-center text-xs mt-2">
                                                    {t("photo")}
                                                </span>
                                            </label>

                                            <div className="flex flex-col gap-1">
                                                <p className="text-sm">{t("Registration.nameTitle")}</p>
                                                <Input
                                                    className="border-[#CFD9FE] rounded-xl text-[#677294] mb-2 placeholder-[#677294] pr-10"
                                                    placeholder={t("Registration.namePlaceholder")}
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                            </div>

                                            <div className="flex flex-col gap-1">
                                                <p className="text-sm">{t("Registration.surnameTitle")}</p>
                                                <Input
                                                    className="border-[#CFD9FE] rounded-xl text-[#677294] mb-2 placeholder-[#677294] pr-10"
                                                    placeholder={t("Registration.surnamePlaceholder")}
                                                    value={surname}
                                                    onChange={(e) => setSurname(e.target.value)}
                                                />
                                            </div>

                                            <div className="flex flex-col gap-1">
                                                <p className="text-sm">{t("phone.title")}</p>
                                                <PhoneInput
                                                    country={"uz"}
                                                    value={phone}
                                                    onChange={setPhone}
                                                    inputClass="!w-full !h-[44px] !border-[#CFD9FE] !text-[#677294] !placeholder-[#677294]"
                                                    containerClass="!w-full"
                                                    buttonClass="!bg-transparent"
                                                />
                                            </div>
                                        </div>

                                    </div>
                                    <div className='flex justify-end gap-4'>
                                        <DialogClose asChild>
                                            <Button variant="outline">Orqaga</Button>
                                        </DialogClose>

                                        <DialogClose asChild>
                                            <ServerLink
                                                path='myprofile'
                                                className="group bg-maket-primary h-[42px] px-2 flex items-center gap-2 rounded-md text-white border hover:bg-white hover:text-maket-primary whitespace-nowrap transition-colors"
                                            >
                                                Davom etish
                                            </ServerLink>
                                        </DialogClose>
                                    </div>      
                                </DialogContent>
                            </Dialog>
                        </>

                    ) : (
                        <LoginProviderDialog
                            trigger={
                                <div className="bg-white group h-[42px] px-2 flex items-center gap-1 text-maket-primary rounded-md hover:bg-maket-primary hover:text-white border cursor-pointer border-white whitespace-nowrap">
                                    <Image src="/svg/aside/user.svg" alt="User Icon" width={20} height={20} className="group-hover:hidden" />
                                    <Image src="/svg/aside/user-white.svg" alt="User Icon" width={20} height={20} className="group-hover:block hidden" />
                                    <p className="text-sm">{t('action.account.login')}</p>
                                </div>
                            }
                        />

                    )}
                </div>
            </div>
        </aside>
    );
};
export default Aside;