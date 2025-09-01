"use client";

import { Button } from "@/root/ui/dev/shadcn/ui/button";
import { Calendar } from "@/root/ui/dev/shadcn/ui/calendar";
import { Input } from "@/root/ui/dev/shadcn/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/root/ui/dev/shadcn/ui/popover";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import axios from "axios";
import { useChangeDataStore } from "../ChangeDataStore";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface Props {
  token: string | undefined;
}

export const DetailsPage = ({ token }: Props) => {
  const t = useTranslations("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const {
    first_name,
    last_name,
    father_name,
    passport_number,
    birth_date,
    about,
    phone_number,
    service_activity,
    setFirstName,
    setLastName,
    setFatherName,
    setPassportNumber,
    setBirthDate,
    setAbout,
    setPhoneNumber,
    setServiceActivity,
  } = useChangeDataStore();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 📌 Default birth_date
  useEffect(() => {
    if (!birth_date) {
      setBirthDate(format(today, "yyyy-MM-dd"));
    }
  }, [birth_date, setBirthDate]);

  // 📌 Faqat phone_number olish
  useEffect(() => {
    const fetchPhoneNumber = async () => {
      if (!token) return;

      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}api/v1/masters/me/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = res.data.results;
        const phone = data.phone_number || "";
        setPhoneNumber(phone.startsWith("+") ? phone : `+${phone}`);
      } catch (err) {
        console.error("❌ Error fetching phone_number:", err);
      }
    };

    fetchPhoneNumber();
  }, [token, setPhoneNumber]);

  // 📁 File yuklash
  // 📁 File yuklash
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview chiqarish
    setPreview(URL.createObjectURL(file));

    if (!token) {
      console.error("❌ Token yo‘q");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await axios.patch(
        "https://cdn.masterium.uz/api/v1/masters/upload-photo/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("✅ Rasm yuklandi:", res.data);
      // Agar server success qaytarsa previewni serverdagi urlga update qilib qo‘yamiz
      if (res.data?.image) {
        setPreview(res.data.image);
      }
    } catch (err) {
      console.error("❌ Rasm yuklashda xatolik:", err);
    }
  };


  return (
    <div className="mx-auto px-2 space-y-4">
      <h1 className="text-2xl hidden sm:flex font-bold">
        {t("ChangeData.title")}
      </h1>

      <div className="bg-white rounded-xl py-6 px-6 shadow-sm space-y-4">
        <div>
          <h3 className="text-xl font-semibold">
            {t("ChangeData.PersonalDetails.title")}
          </h3>
        </div>

        {/* Rasm yuklash */}
        <div className="flex gap-6 items-start">
          <div
            onClick={() => inputRef.current?.click()}
            className="relative w-32 h-32 border-2 border-dashed rounded-full overflow-hidden cursor-pointer bg-gray-100 hover:bg-gray-200 transition"
          >
            <Image
              src={preview || "/img/advertising/user.png"}
              alt="Profile"
              fill
              className={`${preview ? "object-cover" : "object-contain p-6"
                } transition-all duration-300`}
            />
            <Input
              ref={inputRef}
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          <div>
            <h4 className="text-base font-semibold">
              {t("ChangeData.PersonalDetails.uploadphototitle")}
            </h4>
            <p className="text-sm max-w-[350px] text-muted-foreground">
              {t("ChangeData.PersonalDetails.uploadphotodescription")}
            </p>
          </div>
        </div>

        {/* Form Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              {t("ChangeData.PersonalDetails.Inputs.nameInp")}
            </label>
            <Input
              type="text"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              {t("ChangeData.PersonalDetails.Inputs.surnameInp")}
            </label>
            <Input
              type="text"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              {t("ChangeData.PersonalDetails.Inputs.fatherNameInpt")}
            </label>
            <Input
              type="text"
              value={father_name}
              onChange={(e) => setFatherName(e.target.value)}
            />
          </div>

          {/* Telefon */}
          <div>
            <label className="block text-sm font-medium mb-1">
              {t("ChangeData.PersonalDetails.Inputs.phoneInp")}
            </label>
            <Input type="text" value={phone_number} disabled />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              {t("ChangeData.PersonalDetails.Inputs.passport")}
            </label>
            <Input
              type="text"
              value={passport_number}
              onChange={(e) => setPassportNumber(e.target.value)}
            />
          </div>

          {/* 💰 Price */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Narx (so'm)
            </label>
            <Input
              type="number"
              value={service_activity.price ?? ""}
              onChange={(e) =>
                setServiceActivity("price", Number(e.target.value))
              }
              placeholder="100000"
            />
          </div>

          {/* Tug‘ilgan sana */}
          <div>
            <label className="block text-sm font-medium mb-1">
              {t("ChangeData.PersonalDetails.Inputs.BirthInpt")}
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full py-4 px-4 text-left text-md border border-[#CFD9FE] rounded-xl flex justify-between items-center text-[#6B7280]"
                >
                  {birth_date
                    ? format(new Date(birth_date), "dd.MM.yyyy")
                    : "kk.oo.yyyy"}
                  <Image
                    src="/svg/open-works/calendar.svg"
                    alt="Calendar icon"
                    width={20}
                    height={20}
                  />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-2 w-auto" align="start">
                <Calendar
                  mode="single"
                  selected={birth_date ? new Date(birth_date) : undefined}
                  onSelect={(day) => {
                    if (day) setBirthDate(format(day, "yyyy-MM-dd"));
                  }}
                  captionLayout="dropdown"
                  fromYear={1900}
                  toYear={new Date().getFullYear()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* About */}
        <div>
          <label className="block text-sm font-medium mb-1">
            {t("ChangeData.PersonalDetails.Inputs.AboutYourself")}
          </label>
          <textarea
            rows={4}
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="w-full border rounded-lg p-2 bg-[#F8F9FA]"
          />
        </div>
      </div>
    </div>
  );
};
