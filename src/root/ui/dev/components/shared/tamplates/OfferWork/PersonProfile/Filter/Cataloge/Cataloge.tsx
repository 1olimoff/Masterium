"use client"

import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { Button } from "@/root/ui/dev/shadcn/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from "@/root/ui/dev/shadcn/ui/popover";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList
} from "@/root/ui/dev/shadcn/ui/command";
import Image from "next/image";

interface FilterBarClientProps {
  className?: string;
  catalogs: string[];
}

function Cataloge({ catalogs }: FilterBarClientProps) {
  const t = useTranslations("");
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [selectedCatalog, setSelectedCatalog] = useState<string | null>(null);

  return (
    <div className="w-full md:w-[50%] lg:w-[27%] flex mt-2 flex-col gap-1">
      <Popover open={catalogOpen} onOpenChange={setCatalogOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full py-4 text-left text-md border-2 border-[#e8eaf3] rounded-xl flex justify-between items-center"
          >
            <span className={selectedCatalog ? "text-black" : "text-maket-gray"}>
              {selectedCatalog || t("OpenWorks.filter.catalog.placeholder")}
            </span>
            <Image
              src="/svg/open-works/arrow-down.svg"
              alt="Arrow down"
              width={20}
              height={20}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-2 w-full md:w-64">
          <Command>
            <CommandInput placeholder={t("OpenWorks.filter.catalog.search")} />
            <CommandList>
              {catalogs.map((catalog) => (
                <CommandItem
                  key={catalog}
                  onSelect={() => {
                    setSelectedCatalog(catalog);
                    setCatalogOpen(false);
                  }}
                  className="cursor-pointer hover:bg-gray-100 rounded-md p-2"
                >
                  {catalog}
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
