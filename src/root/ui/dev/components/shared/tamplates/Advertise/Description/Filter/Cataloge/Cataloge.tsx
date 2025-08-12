"use client";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { Button } from "@/root/ui/dev/shadcn/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/root/ui/dev/shadcn/ui/popover";
import { Command, CommandInput, CommandItem, CommandList } from "@/root/ui/dev/shadcn/ui/command";
import Image from "next/image";
import { useAdvertiseStore } from "../../../AdvertiseStore";

interface Category {
  id: number;
  name: string;
}

interface CatalogeProps {
  catalogs: string[];
}

function Cataloge({ catalogs = [] }: CatalogeProps) {
  const t = useTranslations("");
  const { selectedCategory, setSelectedCategory } = useAdvertiseStore();
  const [catalogOpen, setCatalogOpen] = useState(false);

  // Indekslarni backend ID lariga moslashtirish (0 → 1, 1 → 2, 2 → 3)
  const categories: Category[] = catalogs.map((name, index) => ({
    id: index + 1, // Backend ID lari odatda 1 dan boshlanadi
    name,
  }));

  const handleSelect = (id: number) => {
    setSelectedCategory(id);
    setCatalogOpen(false);
  };

  const selectedCategoryObj = categories.find((cat) => cat.id === selectedCategory);

  return (
    <div className="w-full md:w-[50%] lg:w-[27%] flex mt-2 flex-col gap-1">
      <Popover open={catalogOpen} onOpenChange={setCatalogOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full py-4 text-left text-md border-2 border-[#e8eaf3] rounded-xl flex justify-between items-center"
          >
            <span className={selectedCategoryObj ? "text-black" : "text-maket-gray"}>
              {selectedCategoryObj?.name || t("OpenWorks.filter.catalog.placeholder")}
            </span>
            <Image src="/svg/open-works/arrow-down.svg" alt="Arrow down" width={20} height={20} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-2 w-full md:w-64">
          <Command>
            <CommandInput placeholder={t("OpenWorks.filter.catalog.search")} />
            <CommandList>
              {categories.map((category) => (
                <CommandItem
                  key={category.id}
                  onSelect={() => handleSelect(category.id)}
                  className="cursor-pointer hover:bg-gray-100 rounded-md p-2"
                >
                  <span>{category.name}</span>
                  {selectedCategory === category.id && (
                    <span className="ml-2 text-green-500">✓</span>
                  )}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default Cataloge;