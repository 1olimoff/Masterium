"use client"
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl"
import { Title } from "./Title/Title";
import ServerLink from "../../elements/Links/ServerLink";
import { offerdetails } from "../OfferInfoAds/Gallery/Gallery";
import { useState } from "react";

interface Props {
  offerData: offerdetails
}

export const OfferPolicy = ({ offerData }: Props) => {
  const t = useTranslations("")
  const [isChecked, setIsChecked] = useState(false);
  

  return (
    <div className="min-h-screen layout-width bg-[#F8FAFC] text-[#0F172A] sm:px-8">
      <div className="p-4">
        <Title offerData={offerData}/>
        <h1 className="text-2xl font-bold mb-6 text-[#001D55]">
          {offerData.title}
        </h1>

        <div className="bg-white p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-[#001D55]">
            {t("OfferWork.Offers.offersTitle")}
          </h2>

          <div className="text-sm space-y-4 text-gray-700">
            {[...Array(7)].map((_, i) => (
              <p key={i}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit...
              </p>
            ))}
          </div>

          {/* Checkbox */}
          <div className="flex items-start mt-6">
            <input
              id="accept"
              type="checkbox"
              className="mt-1 mr-2"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <label htmlFor="accept" className="text-sm text-gray-700">
              {t("OfferWork.Offers.confirminfo")}
            </label>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center sm:justify-end gap-4 mt-6">
            <ServerLink path="services" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto py-[12px] px-[42px] bg-[#F8F9FA] text-[#677294] rounded-[16px] cursor-pointer">
                {t("Privacy.PrivacyBtn.back")}
              </button>
            </ServerLink>

            <ServerLink
              path={"services/service"}
              className="w-full sm:w-auto"
            >
              <button
                disabled={!isChecked}
                className={`w-full sm:w-auto py-[12px] px-[52px] rounded-[16px] cursor-pointer
                  ${isChecked ? "bg-[#001D55] text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
              >
                {t("ChangeData.privacypolicy.acceptoffer")}
              </button>
            </ServerLink>
          </div>
        </div>
      </div>
    </div>
  )
}
