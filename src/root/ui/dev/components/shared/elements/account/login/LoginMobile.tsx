"use client";

import React, { ReactNode, useState, useEffect } from "react";
import { cn } from "@/root/business/lib/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import toast, { Toaster } from "react-hot-toast";
import { Input } from "@/root/ui/dev/shadcn/ui/input";
import { Button } from "@/root/ui/dev/shadcn/ui/button";
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from "@/root/ui/dev/shadcn/ui/drawer";
import { OTPModal } from "../otp/OTPModal";
import axios from "axios";

interface Props {
  children: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRegisterClick: () => void;
}

const OPERATORS = new Set([
  "20", "33", "50", "55", "61", "62", "65", "66", "67", "69",
  "70", "71", "72", "73", "74", "75", "76", "77", "78", "79",
  "88", "90", "91", "93", "94", "95", "97", "98", "99",
]);

export const AuthProvider = ({ children, open, onOpenChange, onRegisterClick }: Props) => {
  const t = useTranslations("Account");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [openOTP, setOpenOTP] = useState(false);

  // Modal ochilganda formani va loading holatini tozalash
  useEffect(() => {
    if (open) {
      setPhone("");
      setPassword("");
      setShowPassword(false);
      setLoading(false); // Loading holatini reset qilish
    }
  }, [open]);

  const validateInputs = () => {
    if (!phone) {
      toast.error(t("login.errors.phone.required")); // "Telefon nomeri majburiy!"
      return false;
    }
    if (!/^\+?\d+$/.test(phone)) {
      toast.error(t("login.errors.phone.invalid")); // "Telefon nomerni to'liq kiriting"
      return false;
    }
    if (phone.length < 12) {
      toast.error(t("login.errors.phone.minLength")); // "Iltimos nomerni to'liq formatda yozing!"
      return false;
    }
    const formattedPhone = phone.startsWith("+") ? phone : `+${phone}`;
    if (formattedPhone.startsWith("+998")) {
      const operatorCode = formattedPhone.substring(4, 6);
      if (!OPERATORS.has(operatorCode)) {
        toast.error(t("Registration.errors.phone.invalidOperatorCode")); // "Kiritilgan telefon raqami operator kodi O'zbekiston operatorlariga tegishli emas."
        return false;
      }
    }
    if (!password) {
      toast.error(t("login.errors.password.required")); // "Parol majburiy!"
      return false;
    }
    if (password.length < 8) {
      toast.error(t("login.errors.password.minLength")); // "Kamida 8-ta belgi bo'lishi shart"
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (!validateInputs()) {
      setLoading(false);
      return;
    }

    try {
      const formattedPhone = phone.startsWith("+") ? phone : `+${phone}`;
      const response = await axios.post("/api/auth/login", {
        phone_number: formattedPhone,
        password,
        req_type: "login",
      });

      if (response.data.success) {
        setOpenOTP(true);
        onOpenChange(false); // Login modalni yopish
      } else {
        toast.error(t("login.errors.phone-or-psw")); // "Nomer yoki parol notog'ri"
        onOpenChange(false);
        setTimeout(() => {
          onRegisterClick(); // Register modalni ochish
        }, 150);
      }
    } catch (error: any) {
      console.error("Login xatosi:", error.response?.data || error.message);
      toast.error(t("login.errors.phone-or-psw")); // "Nomer yoki parol notog'ri"
    } finally {
      setLoading(false); // Har qanday holatda loadingni o'chirish
    }
  };

  const handleConfirmCode = async (code: string) => {
    try {
      const formattedPhone = phone.startsWith("+") ? phone : `+${phone}`;
      const response = await axios.post("/api/auth/login", {
        phone_number: formattedPhone,
        code,
        req_type: "otp",
      });

      if (response.data.access_token) {
        toast.success(t("login.success")); // "Siz tizimga kirdingiz :)"
        setOpenOTP(false);
        onOpenChange(false); // Login modalni yopish
      } else {
        toast.error(t("OTP.errors.invalid")); // "Noto'g'ri OTP kodi"
      }
    } catch (error: any) {
      console.error("OTP tasdiqlash muvaffaqiyatsiz:", error.response?.data || error.message);
      toast.error(t("OTP.errors.minLength")); // "Tekshirib to'liq kiriting"
    }
  };

  return (
    <>
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerTrigger asChild>{children}</DrawerTrigger>
        <DrawerContent
          className={cn(
            "fixed bottom-0 left-0 right-0 z-50",
            "max-w-[480px] w-full mx-auto",
            "bg-white shadow-lg overflow-hidden max-h-[90vh] flex flex-col"
          )}
        >
          <div className="flex flex-col flex-1 overflow-y-auto p-6 sm:p-8 custom-scrollbar">
            <DrawerTitle>
              <h3 className="text-2xl text-center">{t("login.title")}</h3>
            </DrawerTitle>
            <div className="flex flex-col gap-4 mt-4">
              {/* PHONE INPUT */}
              <div className="flex flex-col gap-1">
                <p className="text-sm">{t("login.inputs.phone.title")}</p>
                <PhoneInput
                  country={"uz"}
                  value={phone}
                  onChange={setPhone}
                  inputClass="!w-full !h-[44px] !border-[#CFD9FE] !text-[#677294] !placeholder-[#677294]"
                  containerClass="!w-full"
                  buttonClass="!bg-transparent"
                />
              </div>
              {/* PASSWORD INPUT */}
              <div className="flex flex-col gap-1">
                <p className="text-sm">{t("login.inputs.password.title")}</p>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-[#CFD9FE] rounded-xl text-[#677294] placeholder-[#677294] pr-10"
                    placeholder={t("login.inputs.password.placeholder")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    <Image
                      src={showPassword ? "/svg/account/login/eye-slash.svg" : "/svg/account/login/eye.svg"}
                      alt="Toggle password"
                      width={20}
                      height={20}
                    />
                  </button>
                </div>
              </div>

              <Button
                disabled={loading}
                onClick={handleSubmit}
                className="w-full bg-maket-primary hover:bg-blue-900 text-lg rounded-xl py-6"
              >
                {loading ? t("login.button.loading") : t("login.button.title")}
              </Button>

              <p className="text-center font-thin mt-4">
                {t("login.register.text")}{" "}
                <button
                  type="button"
                  onClick={() => {
                    onOpenChange(false);
                    onRegisterClick();
                  }}
                  className="font-bold text-maket-secondary"
                >
                  {t("login.register.action")}
                </button>
              </p>
              <Toaster />
            </div>
          </div>
        </DrawerContent>
      </Drawer>
      <OTPModal
        isOpen={openOTP}
        phoneNumber={phone}
        onClose={() => setOpenOTP(false)}
        setOpenOTP={setOpenOTP}
        setOpenParentModal={(value) => onOpenChange(typeof value === "boolean" ? value : false)}
        isRegisterFlow={false}
        onConfirm={handleConfirmCode}
      />
    </>
  );
};