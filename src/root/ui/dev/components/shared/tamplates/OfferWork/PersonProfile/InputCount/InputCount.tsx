"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Input as ShadcnInput } from "@/root/ui/dev/shadcn/ui/input"; // To'g'ri import

export const InputCount = () => {
  const [charCount, setCharCount] = useState(0);
  const t = useTranslations("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setCharCount(inputValue.length);
  };

  return (
    <div className="relative w-full">
      <div className="relative w-full">
        <ShadcnInput
          placeholder={t("OfferWork.Offers.PersonProfile.WorkTitle.titleInfo")}
          className="w-full md:w-[75%] px-4 py-[18px] my-2 rounded-[12px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-2 disabled:cursor-not-allowed pr-20"
          maxLength={60}
          onChange={handleInputChange}
        />
        <span className="absolute right-4 top-3 text-[12px] text-gray-500 bg-white px-1 rounded">
          {charCount}/60
        </span>
      </div>
    </div>
  );
};
