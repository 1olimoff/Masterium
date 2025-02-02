"use client";
import React, {useState} from "react";
import {useTranslations} from "next-intl";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Command, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input"; // Предположим, у вас есть такой
import Image from "next/image";
import {cn} from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar"


//toaster
import {useToast} from "@/hooks/use-toast"


//utils
import {processPriceInput} from "@/utils/PriceForrmater";

interface FilterBarClientProps {
    className?: string;
    catalogs: string[];
    locations: string[];
}

export default function FilterBarClient({catalogs, locations, className}: FilterBarClientProps) {
    const t = useTranslations();
    const {toast} = useToast()

    // Состояния, выбранные пользователем
    const [catalogOpen, setCatalogOpen] = useState(false);
    const [selectedCatalog, setSelectedCatalog] = useState<string | null>(null);

    const [priceFrom, setPriceFrom] = useState("");
    const [priceTo, setPriceTo] = useState("");

    const [dateFrom, setDateFrom] = useState<Date | null>(null);
    const [dateTo, setDateTo] = useState<Date | null>(null);
    const [dateFromOpen, setDateFromOpen] = useState(false);
    const [dateToOpen, setDateToOpen] = useState(false);

    const [locationOpen, setLocationOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState<string | null>(null);


    // Пример обработчика «Применить»:
    // function handleApplyFilters() {
    //     // Здесь вы вызываете нужные методы,
    //     // делаете push в query-параметры роутера и т.д.
    //     console.log("Filters:", {
    //         catalog: selectedCatalog,
    //         price: { from: priceFrom, to: priceTo },
    //         dates: { from: dateFrom, to: dateTo },
    //         location: selectedLocation,
    //     });
    // }

    return (
        <div className={cn(className, "w-full flex gap-4")}>
            {/* Первая строка: Каталог */}
            <div className="w-[27%] flex flex-col gap-1">
                <p>{t("OpenWorks.filter.catalog.title")}</p>
                <Popover open={catalogOpen} onOpenChange={setCatalogOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className="w-full py-6 text-left text-md border-2 border-[#CFD9FE] rounded-xl flex justify-between items-center"
                        >
                            {selectedCatalog
                                ? selectedCatalog
                                : t("OpenWorks.filter.catalog.placeholder")}
                            <Image
                                src={"/svg/open-works/arrow-down.svg"}
                                alt="Arrow down icon"
                                width={20}
                                height={20}
                            />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-2 w-full md:w-48">
                        <Command>
                            <CommandInput placeholder={t("OpenWorks.filter.catalog.search")}/>
                            <CommandList>
                                {catalogs.map((catalog) => (
                                    <CommandItem
                                        key={catalog}
                                        value={catalog}
                                        onSelect={(value) => {
                                            setSelectedCatalog(value);
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

            {/* Цена: от/до */}
            <div className="w-[23%] flex flex-col gap-1">
                <p>{t("OpenWorks.filter.price.title")}</p>
                <div className="flex gap-2">
                    <Input
                        className={"w-full py-6 text-left text-md border-2 border-[#CFD9FE] rounded-xl flex justify-between items-center"}
                        placeholder={t("OpenWorks.filter.price.from")}
                        value={priceFrom}
                        onChange={async (e) => {
                            const {formatted, hasInvalid} = await processPriceInput(e.target.value);
                            if (hasInvalid) {
                                toast({
                                    title: t('OpenWorks.filter.price.error.title'),
                                    description: t('OpenWorks.filter.price.error.description'),
                                });
                            }
                            setPriceFrom(formatted);
                        }}
                    />
                    <Input
                        className={"w-full py-6 text-left text-md border-2 border-[#CFD9FE] rounded-xl flex justify-between items-center"}
                        placeholder={t("OpenWorks.filter.price.to")}
                        value={priceTo}
                        onChange={(e) => {
                            const {formatted, hasInvalid} = processPriceInput(e.target.value);
                            if (hasInvalid) {
                                toast({
                                    title: t('OpenWorks.filter.price.error.title'),
                                    description: t('OpenWorks.filter.price.error.description'),
                                });
                            }
                            setPriceTo(formatted);
                        }}
                    />
                </div>
            </div>

            {/* Вторая строка: Даты + Локация */}

            <div className="w-[30%]">
                <p className="mb-1">{t("OpenWorks.filter.period.title")}</p>
                <div className="flex gap-2">
                    <Popover open={dateFromOpen} onOpenChange={setDateFromOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className={"w-full py-6 text-left text-md border-2 border-[#CFD9FE] rounded-xl flex justify-between items-center"}
                            >
                                {dateFrom
                                    ? dateFrom.toLocaleDateString() // либо форматируйте через date-fns
                                    : t("OpenWorks.filter.price.from")}
                                <Image
                                    src={"/svg/open-works/calendar.svg"}
                                    alt="Calendar icon"
                                    width={25}
                                    height={25}
                                />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-2 w-auto" align="start">
                            <Calendar
                                mode="single"
                                selected={dateFrom}
                                onSelect={(day) => {
                                    setDateFrom(day);
                                    setDateFromOpen(false);
                                }}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>

                    {/* Поле "gacha" */}
                    <Popover open={dateToOpen} onOpenChange={setDateToOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className={"w-full py-6 text-left text-md border-2 border-[#CFD9FE] rounded-xl flex justify-between items-center"}
                            >
                                {dateTo
                                    ? dateTo.toLocaleDateString()
                                    : t("OpenWorks.filter.price.to")}
                                <Image
                                    src={"/svg/open-works/calendar.svg"}
                                    alt="Calendar icon"
                                    width={25}
                                    height={25}
                                />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-2 w-auto" align="start">
                            <Calendar
                                mode="single"
                                selected={dateTo}
                                onSelect={(day) => {
                                    setDateTo(day);
                                    setDateToOpen(false);
                                }}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            {/*Location*/}
            <div className="w-[20%]">
                <p className="mb-1">{t("OpenWorks.filter.location.title")}</p>
                <Popover open={locationOpen} onOpenChange={setLocationOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className={"w-full py-6 text-left text-md border-2 border-[#CFD9FE] rounded-xl flex justify-between items-center"}
                        >
                            {selectedLocation
                                ? selectedLocation
                                : t("OpenWorks.filter.location.placeholder")}
                            <Image
                                src={"/svg/open-works/arrow-down.svg"}
                                alt="Arrow down icon"
                                width={20}
                                height={20}
                            />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-2 w-full md:w-48">
                        <Command>
                            <CommandInput placeholder={t("OpenWorks.filter.location.search")}/>
                            <CommandList>
                                {locations.map((loc) => (
                                    <CommandItem
                                        key={loc}
                                        value={loc}
                                        onSelect={(value) => {
                                            setSelectedLocation(value);
                                            setLocationOpen(false);
                                        }}
                                        className="cursor-pointer hover:bg-gray-100 rounded-md p-2"
                                    >
                                        {loc}
                                    </CommandItem>
                                ))}
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
}
