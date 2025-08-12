// Price.tsx
"use client";
import { toast } from "@/root/business/hooks/use-toast";
import { Input } from "@/root/ui/dev/shadcn/ui/input";
import { useTranslations } from "next-intl";
import { useAdvertiseStore } from "../../AdvertiseStore";
// import { processPriceInput } from "@/root/business/utils/PriceFormatter";
import { cn } from "@/root/business/lib/utils";
import { processPriceInput } from "@/root/business/utils/PriceForrmater";

export const Modal = () => {
  const t = useTranslations("OfferWork");
  const {
    clientType,
    setClientType,
    paymentType,
    setPaymentType,
    price,
    setPrice,
    currency,
    setCurrency,
  } = useAdvertiseStore();

  const ButtonComponent = () => {
    return (
      <div className="flex flex-wrap gap-4 mt-4">
        <button
          className={`rounded-[12px] font-[500] sm:w-40 w-full h-[44px] ${
            clientType === "individual" ? "bg-[#32ADE6] text-white" : "bg-[#F8F9FA] text-black"
          }`}
          onClick={() => setClientType("individual")}
        >
          {t("PriceandInfo.Btn.titleBtn.physical")}
        </button>
        <button
          className={`rounded-[12px] font-[500] sm:w-40 w-full h-[44px] ${
            clientType === "business" ? "bg-[#32ADE6] text-white" : "bg-[#F8F9FA] text-black"
          }`}
          onClick={() => setClientType("business")}
        >
          {t("PriceandInfo.Btn.titleBtn.business")}
        </button>
      </div>
    );
  };

  return (
    <div>
      <div className="p-5 bg-white m-3 rounded-[20px] px-4">
        <h2 className="text-xl font-bold text-[#001D55]">{t("PriceandInfo.title")}</h2>
        <p className="text-[14px] mt-3 font-normal text-[#001D55]">
          {t("PriceandInfo.titleInfo")}
        </p>
        <ButtonComponent />
        <p className="text-[14px] mt-3 font-normal text-[#001D55]">
          {t("PriceandInfo.Btn.PaymentType.title")}
        </p>
        <div className="flex flex-wrap gap-4 mt-4">
          <button
            className={`rounded-[12px] font-[500] sm:w-56 w-full h-[44px] ${
              paymentType === "step_by_step" ? "bg-[#32ADE6] text-white" : "bg-[#F8F9FA] text-black"
            }`}
            onClick={() => setPaymentType("step_by_step")}
          >
            {t("PriceandInfo.Btn.PaymentType.stepbystep")}
          </button>
          <button
            className={`rounded-[12px] font-[500] sm:w-44 w-full h-[44px] ${
              paymentType === "prepayment" ? "bg-[#32ADE6] text-white" : "bg-[#F8F9FA] text-black"
            }`}
            onClick={() => setPaymentType("prepayment")}
          >
            {t("Advertise.Buttons.PaymentType")}
          </button>
          <button
            className={`rounded-[12px] font-[500] sm:w-52 w-full h-[44px] ${
              paymentType === "postpayment" ? "bg-[#32ADE6] text-white" : "bg-[#F8F9FA] text-black"
            }`}
            onClick={() => setPaymentType("postpayment")}
          >
            {t("PriceandInfo.Btn.PaymentType.afterjob")}
          </button>
        </div>
        <p className="text-[14px] mt-2 font-normal text-[#001D55]">
          {t("PriceandInfo.Btn.Price.title")}
        </p>
        <div className="flex items-center border mt-2 w-full md:w-[37%] px-[3px] border-gray-300 rounded-[11px] overflow-hidden">
          <Input
            className={cn(
              "flex h-2 w-full bg-background text-base disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              "flex-grow py-[18px] pr-8 border-none text-left",
              "focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:border-none"
            )}
            placeholder={t("PriceandInfo.Btn.Price.description")}
            value={price}
            onChange={async (e) => {
              const { formatted, hasInvalid } = await processPriceInput(e.target.value);
              if (hasInvalid) {
                toast({
                  description: t("PriceandInfo.Btn.Price.error.title"),
                });
              }
              setPrice(formatted);
            }}
          />
          <select
            className="p-2 rounded-lg bg-white border-none cursor-pointer"
            value={currency}
            onChange={(e) => setCurrency(e.target.value as "UZS" | "USD")}
          >
            <option value="UZS">UZS</option>
            <option value="USD">USD</option>
          </select>
        </div>
      </div>
    </div>
  );
};