"use client";
import { toast } from "@/root/business/hooks/use-toast";
import { Input } from "@/root/ui/dev/shadcn/ui/input";
import { useTranslations } from "next-intl";
import { processPriceInput } from "@/root/business/utils/PriceForrmater";
import { cn } from "@/root/business/lib/utils";
import { useOfferWorkStore } from "../../OfferWorkStore";


export const Modal = () => {
  const t = useTranslations("OfferWork");
  const { activeTopButton, setActiveTopButton, activeBottomButton, setActiveBottomButton, priceFrom, setPriceFrom, currency, setCurrency } = useOfferWorkStore();

  const ButtonComponent = () => (
    <div className="flex flex-wrap gap-4 mt-4">
      <button
        className={`rounded-[12px] font-[500] w-full sm:w-40 h-[44px] ${
          activeTopButton === "individual" ? "bg-[#32ADE6] text-white" : "bg-[#F8F9FA] text-black"
        }`} 
        onClick={() => setActiveTopButton("individual")}
      >
        {t("PriceandInfo.Btn.titleBtn.physical")}
      </button>
      <button
        className={`rounded-[12px] font-[500] w-full sm:w-40 h-[44px] ${
          activeTopButton === "business" ? "bg-[#32ADE6] text-white" : "bg-[#F8F9FA] text-black"
        }`}
        onClick={() => setActiveTopButton("business")}
      >
        {t("PriceandInfo.Btn.titleBtn.business")}
      </button>
    </div>
  );

  return (
    <div>
      <div className="p-5 bg-white m-3 rounded-[20px] px-4">
        <h2 className="text-xl font-bold text-[#001D55]">{t("PriceandInfo.title")}</h2>
        <p className="text-[14px] mt-3 font-normal text-[#001D55]">{t("PriceandInfo.titleInfo")}</p>
        <ButtonComponent />
        <p className="text-[14px] mt-3 font-normal text-[#001D55]">{t("PriceandInfo.Btn.PaymentType.title")}</p>
        <div className="flex flex-wrap gap-4 mt-4">
          <button
            className={`rounded-[12px] font-[500] w-full sm:w-56 h-[44px] ${
              activeBottomButton === "step_by_step" ? "bg-[#32ADE6] text-white" : "bg-[#F8F9FA] text-black"
            }`}
            onClick={() => setActiveBottomButton("step_by_step")}
          >
            {t("PriceandInfo.Btn.PaymentType.stepbystep")}
          </button>
          <button
            className={`rounded-[12px] font-[500] w-full sm:w-44 h-[44px] ${
              activeBottomButton === "prepayment" ? "bg-[#32ADE6] text-white" : "bg-[#F8F9FA] text-black"
            }`}
            onClick={() => setActiveBottomButton("prepayment")}
          >
            {t("PriceandInfo.Btn.PaymentType.advpayment")}
          </button>
          <button
            className={`rounded-[12px] font-[500] w-full sm:w-52 h-[44px] ${
              activeBottomButton === "postpayment" ? "bg-[#32ADE6] text-white" : "bg-[#F8F9FA] text-black"
            }`}
            onClick={() => setActiveBottomButton("postpayment")}
          >
            {t("PriceandInfo.Btn.PaymentType.afterjob")}
          </button>
        </div>
        <p className="text-[14px] mt-2 font-normal text-[#001D55]">{t("PriceandInfo.Btn.Price.title")}</p>
        <div className="flex items-center border mt-2 w-full md:w-[37%] px-[3px] border-gray-300 rounded-[11px] overflow-hidden">
          <Input
            className={cn(
              "w-full px-4 py-2 text-base md:text-sm bg-background text-left",
              "border-none shadow-none focus:outline-none focus:ring-0 focus:border-none",
              "focus-visible:outline-none focus-visible:ring-0 focus-visible:border-none"
            )}
            placeholder={t("PriceandInfo.Btn.Price.description")}
            value={priceFrom}
            onChange={async (e) => {
              const { formatted, hasInvalid } = await processPriceInput(e.target.value);
              if (hasInvalid) {
                toast({ description: t("PriceandInfo.Btn.Price.error.title") });
              }
              setPriceFrom(formatted);
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