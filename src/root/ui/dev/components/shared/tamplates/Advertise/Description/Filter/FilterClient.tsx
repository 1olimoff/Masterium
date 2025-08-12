"use client";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Calendar } from "@/root/ui/dev/shadcn/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/root/ui/dev/shadcn/ui/popover";
import { Button } from "@/root/ui/dev/shadcn/ui/button";

type Props = {
  dateFrom: Date | undefined;
  dateTo: Date | undefined;
  setDateFrom: (date: Date | undefined) => void;
  setDateTo: (date: Date | undefined) => void;
};

export const FilterBar = ({
  dateFrom,
  dateTo,
  setDateFrom,
  setDateTo,
}: Props) => {
  const [dateFromOpen, setDateFromOpen] = useState(false);
  const [dateToOpen, setDateToOpen] = useState(false);
  const t = useTranslations("");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  useEffect(() => {
    if (!dateFrom) {
      setDateFrom(today);
    }
  }, [dateFrom, setDateFrom]);

  return (
    <div className="flex w-full md:w-[60%] gap-4">
      <div className="flex flex-col flex-1">
        <label className="mb-2 text-sm font-medium text-[#002250]">
          {t("OfferWork.Offers.PersonProfile.Date.titleStart")}
        </label>
        <Popover open={dateFromOpen} onOpenChange={setDateFromOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full py-4 px-4 text-left text-md border border-[#CFD9FE] rounded-xl flex justify-between items-center text-[#6B7280]"
            >
              {dateFrom ? dateFrom.toLocaleDateString() : "kk.oo.yyyy"}
              <Image
                src="/svg/open-works/calendar.svg"
                alt="Calendar icon"
                width={20}
                height={20}
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-2 w-auto" align="start">
            <Calendar
              mode="single"
              selected={dateFrom}
              onSelect={(day) => {
                if (day) {
                  setDateFrom(day);
                  if (dateTo && day > dateTo) {
                    setDateTo(undefined);
                  }
                }
                setDateFromOpen(false);
              }}
              disabled={(date) => date < today}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-col flex-1">
        <label className="mb-2 text-sm font-medium text-[#002250]">
          {t("OfferWork.Offers.PersonProfile.Date.titleEnd")}
        </label>
        <Popover open={dateToOpen} onOpenChange={setDateToOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full py-4 px-4 text-left text-md border border-[#CFD9FE] rounded-xl flex justify-between items-center text-[#6B7280]"
            >
              {dateTo ? dateTo.toLocaleDateString() : "kk.oo.yyyy"}
              <Image
                src="/svg/open-works/calendar.svg"
                alt="Calendar icon"
                width={20}
                height={20}
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
              disabled={(date) => !!dateFrom && date < dateFrom}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};