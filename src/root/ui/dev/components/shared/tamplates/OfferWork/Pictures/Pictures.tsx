"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import CustomInputFile from "./selectPart/Select";
import { useOfferWorkStore } from "../OfferWorkStore";

export const Pictures = () => {
  const t = useTranslations("OfferWork");
  const { files, setFiles } = useOfferWorkStore();

  const handleFilesAdd = (newFiles: FileList) => {
    const selected = Array.from(newFiles);
    const updated = [...(files || []), ...selected].slice(0, 6); // `files` null bo'lsa, bo'sh massiv
    setFiles(updated);
  };

  return (
    <div className="p-5 bg-white m-3 rounded-[20px] px-4">
      <h2 className="text-xl font-bold text-[#001D55]">{t("Pictures.Picture.title")}</h2>
      <p className="text-[14px] mt-[2px] font-normal text-[#001D55]">{t("Pictures.Picture.titleInfo")}</p>
      <div className="flex w-full gap-4 flex-wrap mt-4">
        {(files || []).map((file, index) => (
          <div
            key={index}
            className="w-full sm:w-[48%] md:w-[30%] lg:w-[180px] h-[120px] border rounded-[13px] overflow-hidden flex items-center justify-center bg-gray-100"
          >
            <Image
              src={URL.createObjectURL(file)}
              alt={`preview-${index}`}
              width={180}
              height={120}
              className="object-cover w-full h-full rounded-[13px]"
            />
          </div>
        ))}
        {(!files || files.length < 6) && <CustomInputFile onFilesAdd={handleFilesAdd} />}
      </div>
    </div>
  );
};