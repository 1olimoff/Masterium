// Description.tsx
"use client"
import { useTranslations } from "next-intl";
// import { InputCount } from "./InputCount/InputCount";
import Cataloge from "./Filter/Cataloge/Cataloge";
import { Filter } from "./Filter/Filter";
import { useAdvertiseStore } from "../AdvertiseStore";
import { InputCount } from "./InputCount/InputCount";
// import { InputCount } from "../../OfferWork/PersonProfile/InputCount/InputCount";
// import { useAdvertiseStore } from "../../AdvertiseStore";


interface Props {
  catalogs: string[];
}

export const Description = ({ catalogs }: Props) => {
  const t = useTranslations("");
  const { description, setDescription } = useAdvertiseStore();

  return (
    <div className="p-1 sm:p-4 bg-white m-3 rounded-[20px] px-4">
      <div>
        <h1 className="text-[20px] font-semibold mt-2 text-[#001D55]">
          {t("OfferWork.Advertise.Description.title")}
        </h1>
        <h2 className="text-[14px] mt-4 text-[#001D55]">
          {t("OfferWork.Offers.PersonProfile.WorkTitle.title")}
        </h2>
        <InputCount />
      </div>
      <div>
        <h2 className="text-[14px] font-[#001D55]">
          {t("OfferWork.Offers.PersonProfile.Category.title")}
        </h2>
        <Cataloge catalogs={catalogs} />
      </div>
      <div>
        <h2 className="mt-2 text-[14px]">{t("OfferWork.Offers.PersonProfile.Definition.title")}</h2>
        <textarea
          className="w-[75%] border border-none bg-[#F8F9FA] rounded-lg h-[150px] py-3 px-4 mt-1 text-gray-700 mb-4 placeholder-gray-400"
          placeholder={t("OfferWork.Offers.PersonProfile.Definition.titleInfo")}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div>
        <Filter />
      </div>
    </div>
  );
};