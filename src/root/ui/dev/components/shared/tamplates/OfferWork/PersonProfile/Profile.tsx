// "use client"
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import { Filter } from "./Filter/Filter";
import Cataloge from "./Filter/Cataloge/Cataloge";
import { InputCount } from "./InputCount/InputCount";


interface Props {
  catalogs: string[];
  response: UserProfile
}

interface UserProfile {
  first_name: string;
  last_name: string;
  avg_rating: number;
  profile_photo: string;
  comments_count: number;
  user_uuid: string
  categories: { name: string }[]
}


export const Profile = ({ catalogs, response }: Props) => {
  const t = useTranslations("");

  return (
    <React.Fragment>
      <section>
        <div className="py-4 bg-white m-3 rounded-[20px] px-2">
          <div className={"flex gap-3"}>
            <div className={"rounded-full border-2"}>
              <div className={"h-20 w-20 rounded-full relative border-2 border-white"}>
                <Image
                  src={`${process.env.BASE_URL}${response.profile_photo}`}
                  alt={"Eshonov Baxodir"}
                  fill
                  objectFit={"cover"}
                  className={"rounded-full"}
                />
                <div className={"absolute bottom-0 right-0 h-5 w-5 border-2 border-white rounded-full bg-maket-green"}></div>
              </div>
            </div>
            <div className={"flex flex-col justify-between h-full my-2"}>
              <h1 className={"text-[18px] font-bold"}>{response.first_name} {response.last_name}</h1>
              <p className={"text-maket-gray text-[14px]"}>
                {response.categories.map((cat) => cat.name).join(", ")}
              </p>

              <div className={"flex gap-1 items-center"}>
                <div className={"relative h-3 w-3 flex items-center justify-center"}>
                  <Image
                    src={"/svg/main/dailyWorkersCard/star-fill.svg"}
                    alt={"This is star fill for rate"}
                    fill
                    objectFit={"contain"}
                  />
                </div>
                <p className={"text-maket-primary text-[12px]"}>{response.avg_rating}</p>
                <p className={"text-[12px] text-maket-gray"}>({response.comments_count} {t("Main.sections.DailyWorkers.Card.comments")})</p>
              </div>
            </div>
          </div>

          <div>
            <div className="relative">
              <h2 className="text-[14px] mt-4 font-[#001D55]">
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
              ></textarea>
            </div>

            <div>
              <Filter />
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}