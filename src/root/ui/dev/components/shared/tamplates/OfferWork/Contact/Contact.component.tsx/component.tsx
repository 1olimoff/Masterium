"use client"
import { toast } from "@/root/business/hooks/use-toast";
import { Input } from "@/root/ui/dev/shadcn/ui/input";
import { useTranslations } from "next-intl";
import { useState } from "react";

export const PhoneCheck = () => {
    const [phone, setPhone] = useState("");

    const t = useTranslations("OfferWork")

    return (
        <div>
            <Input
                type="text" // telefon raqami uchun text, keyin validatsiya qilamiz
                placeholder={t("Contacts.phonePlaceholder")}
                className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none flex-grow p-2 outline-none w-[75%] mt-[5px]"
                value={phone}
                onChange={async (e) => {
                    const inputValue = e.target.value;
                    const isOnlyNumbers = /^\d*$/.test(inputValue); // faqat raqam bo‘lsa true

                    if (!isOnlyNumbers) {
                        toast({
                            description: t("PriceandInfo.Btn.Price.error.title"), // masalan: "Iltimos, faqat raqam kiriting"
                        });
                        return;
                    }

                    setPhone(inputValue); 
                }}
            />
        </div>
    )
}