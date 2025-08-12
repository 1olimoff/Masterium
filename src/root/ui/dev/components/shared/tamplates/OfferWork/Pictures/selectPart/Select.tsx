"use client";
import { useTranslations } from "next-intl";

interface Props {
  onFilesAdd: (files: FileList) => void;
}

export default function CustomInputFile({ onFilesAdd }: Props) {
  const t = useTranslations("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesAdd(e.target.files);
    }
  };

  return (
    <div className="flex flex-row items-center">
      <label className="text-sm font-medium w-[180px] h-[120px] text-gray-700 border-2 border-dashed border-gray-300 rounded-[13px] flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleChange}
        />
        <img src="/img/advertising/pickpic.png" alt="pick" />
        <span className="text-gray-500 text-center text-xs mt-2">
          {t("OfferWork.Advertise.Buttons.fileplaceholder")}
        </span>
      </label>
    </div>
  );
}