"use client"
import React, { useState } from "react";
import { cn } from "@lib/utils";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import Image from "next/image";

const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"];

interface Props {
    className?: string;
}

export const FilterBar = ({ className }: Props) => {
    const t = useTranslations();
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<string | null>(null);

    return (
        <div className={cn(className, "w-full flex justify-between gap-4")}>
            <div className="w-[27%] flex flex-col gap-4">
                <p>{t("OpenWorks.filter.catalog.title")}</p>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className="w-full py-6 text-left md:text-lg md:font-thin border-2 border-[#CFD9FE] rounded-xl flex justify-between items-center"
                        >
                            {selected ? selected : t("OpenWorks.filter.catalog.placeholder")}
                            <Image src={"/svg/open-works/arrow-down.svg"} alt={"Arrow down icon for list"} width={20} height={20} />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-2">
                        <Command>
                            <CommandInput placeholder={t("OpenWorks.filter.catalog.search")} className="border-0 focus:ring-0" />
                            <CommandList>
                                {frameworks.map((framework) => (
                                    <CommandItem
                                        key={framework}
                                        value={framework}
                                        onSelect={(value) => {
                                            setSelected(value);
                                            setOpen(false);
                                        }}
                                        className="cursor-pointer hover:bg-gray-100 rounded-md p-2"
                                    >
                                        {framework}
                                    </CommandItem>
                                ))}
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
};
