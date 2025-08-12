import { getTranslations } from "next-intl/server";
import { Card } from "./Cards/Card";
import { Offer } from "../MyAds";

interface Props {
  className?: string;
  data: Offer[];
}

export const MyAdsPage = async ({ className, data }: Props) => {
  const t = await getTranslations("");

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 p-4 ${className}`}>
      {data && data.length > 0 ? (
        data.map((item, i) => (
          <div className="w-full sm:w-auto flex mb-4 justify-center" key={i}>
            <Card data={item} />
          </div>
        ))
      ) : (
        <p>{t("no_offers_available") || "Takliflar mavjud emas"}</p>
      )}
    </div>
  );
};