"use client";
import { toast } from "@/root/business/hooks/use-toast";
import { Input } from "@/root/ui/dev/shadcn/ui/input";
import { useTranslations } from "next-intl";
import { useOfferWorkStore } from "../../OfferWorkStore";


export const PhoneCheck = () => {
  const t = useTranslations("OfferWork");
  const { phone, setPhone } = useOfferWorkStore();

  return (
    <div>
      <Input
        type="text"
        placeholder={t("Contacts.phonePlaceholder")}
        className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none flex-grow p-2 outline-none w-[75%] mt-[5px]"
        value={phone}
        onChange={async (e) => {
          const inputValue = e.target.value;
          const isOnlyNumbers = /^\d*$/.test(inputValue);
          if (!isOnlyNumbers) {
            toast({
              description: t("PriceandInfo.Btn.Price.error.title"),
            });
            return;
          }
          setPhone(inputValue);
        }}
      />
    </div>
  );
};