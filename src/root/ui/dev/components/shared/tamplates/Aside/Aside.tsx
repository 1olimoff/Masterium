import React from 'react';
import { cn } from '@/root/business/lib/utils';
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/root/ui/dev/shadcn/ui/dropdown-menu";
import { Input } from "@/root/ui/dev/shadcn/ui/input";
import { Button } from "@/root/ui/dev/shadcn/ui/button";
import { useTranslations } from "next-intl";
import { LoginProviderDialog } from "@/root/ui/dev/components/shared/elements/account/login/LoginProviderDialog";
import { Link } from '@/i18n/routing';
import InputArea from './InputArea/InputArea';

interface Props {
    className?: string;
}

const Aside = ({ className }: Props) => {
    const t = useTranslations("Aside");

    return (
        <aside className={cn(className, "py-3 px-2 sm:shadow sm:flex hidden sticky sm:bg-maket-primary bg-white top-0 z-[50]")}>
            <div className="layout-width flex justify-between items-center gap-4 w-full">

                {/* Logo */}
                <a href="/" className="max-w-[200px] w-full hidden sm:flex">
                    <Image src="/svg/footer/logo.svg" alt="masterium logo" width={250} height={80} />
                </a>

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
                                {[...Array(10)].map((_, idx) => (
                                    <DropdownMenuItem key={idx}>
                                        <Image src="/svg/aside/tech.svg" alt="Tech Icon" width={18} height={18} />
                                        Santehniklar
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    {/* Search */}
                    <InputArea />

                    {/* Search Button */}
                    <div className="w-full max-w-[130px] flex-shrink-0">
                        <Button
                            type="submit"
                            className="bg-white text-maket-primary border border-white hover:bg-maket-primary hover:text-white w-full"
                        >
                            {t('search.button')}
                        </Button>
                    </div>
                </div>

                {/* Actions */}
                <div className="hidden sm:flex items-center gap-2 flex-shrink-0">

                    {/* Add link */}
                    <Link
                        href="/tashkent/advertise"
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
                    </Link>


                    {/* Login */}

                    <LoginProviderDialog
                        trigger={
                            <div className="bg-white group h-[42px] px-2 flex items-center gap-1 text-maket-primary rounded-md hover:bg-maket-primary hover:text-white border cursor-pointer border-white whitespace-nowrap">
                                 <Image src="/svg/aside/user.svg" alt="User Icon" width={20} height={20} className="group-hover:hidden" />
                                 <Image src="/svg/aside/user-white.svg" alt="User Icon" width={20} height={20} className="group-hover:block hidden" />
                                 <p className="text-sm">{t('action.account.login')}</p>
                            </div>
                        }
                    />





                    {/* <LoginProviderDialog>
                        <div className="bg-white group h-[42px] px-2 flex items-center gap-1 text-maket-primary rounded-md hover:bg-maket-primary hover:text-white border border-white whitespace-nowrap">
                            <Image src="/svg/aside/user.svg" alt="User Icon" width={20} height={20} className="group-hover:hidden" />
                            <Image src="/svg/aside/user-white.svg" alt="User Icon" width={20} height={20} className="group-hover:block hidden" />
                            <p className="text-sm">{t('action.account.login')}</p>
                        </div>
                    </LoginProviderDialog> */}
                </div>
            </div>
        </aside>
    );
};

export default Aside;
