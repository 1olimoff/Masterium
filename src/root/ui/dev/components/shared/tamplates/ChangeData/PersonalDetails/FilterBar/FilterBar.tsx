"use client"
import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/root/ui/dev/shadcn/ui/popover";
import { Command, CommandInput, CommandItem, CommandList } from "@/root/ui/dev/shadcn/ui/command";
import { Button } from "@/root/ui/dev/shadcn/ui/button";
import Image from "next/image";

interface FilterBarProps {
  label: string;
  options: string[];
  placeholder: string;
  className?: string;
}

export default function FilterBar({ label, options, placeholder }: FilterBarProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full text-[#a5abbd] hover:text-[#a5abbd] py-4 text-left text-md  border-[#CFD9FE] rounded-xl flex justify-between items-center"
          >
            {selected || placeholder}
            <Image src="/svg/open-works/arrow-down.svg" alt="Arrow down icon" width={20} height={20} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-2 w-full md:w-48">
          <Command>
            <CommandInput placeholder="Qidirish..." className="placeholder:text-[#677294]" />
            <CommandList>
              {options.map((option) => (
                <CommandItem
                  key={option}
                  value={option}
                  onSelect={(value) => {
                    setSelected(value);
                    setOpen(false);
                  }}
                  className="cursor-pointer text-[#677294] hover:bg-gray-100 rounded-md p-2"
                >
                  {option}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
