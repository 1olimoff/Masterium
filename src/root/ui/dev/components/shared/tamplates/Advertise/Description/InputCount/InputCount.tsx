"use client";
import { useTranslations } from "next-intl";
import { Input as ShadcnInput } from "@/root/ui/dev/shadcn/ui/input";
import { useAdvertiseStore } from "../../AdvertiseStore";

export const InputCount = () => {
  const t = useTranslations("");
  const { workTitle, setWorkTitle } = useAdvertiseStore();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWorkTitle(event.target.value);
  };

  return (
    <div className="relative w-full md:w-[75%] my-2">
      <ShadcnInput
        placeholder={t("OfferWork.Offers.PersonProfile.WorkTitle.titleInfo")}
        className="w-full px-4 py-[18px] rounded-[12px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-2 disabled:cursor-not-allowed pr-20"
        maxLength={60}
        value={workTitle}
        onChange={handleInputChange}
      />
      <span className="absolute right-4 top-3 text-[12px] text-gray-500 bg-white px-1 rounded">
        {workTitle.length}/60
      </span>
    </div>
  );
};