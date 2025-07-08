// RegistrationPage.tsx
"use client";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/root/ui/dev/shadcn/ui/drawer";
import { Input } from "@/root/ui/dev/shadcn/ui/input";
import { Button } from "@/root/ui/dev/shadcn/ui/button";
import { cn } from '@/root/business/lib/utils';
import { useTranslations } from "next-intl";
import { DialogHeader } from "@/root/ui/dev/shadcn/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

interface Props {
  className?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRegisterClick: () => void; // 🔧 YANGI: login tugmasi bosilganda chaqiriladi
}

export const RegistrationPage = ({ className, open, onOpenChange, onRegisterClick }: Props) => {

  const t = useTranslations("Account");

  // States
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Phone validation
  const validatePhone = () => {
    if (!phone) {
      setPhoneError(t("login.errors.phone.required"));
      return false;
    }
    if (phone.length < 10 || !/^\+?\d+$/.test(phone)) {
      setPhoneError(t("login.errors.phone.invalid"));
      return false;
    }
    setPhoneError("");
    return true;
  };

  // Password validation
  const validatePassword = () => {
    if (!password) {
      setPasswordError(t("login.errors.password.required"));
      return false;
    }
    if (password.length < 9) {
      setPasswordError(t("login.errors.password.minLength"));
      return false;
    }
    setPasswordError("");
    return true;
  };

  // Submit handler
  const handleSubmit = async () => {
    setLoading(true);
    const isPhoneValid = validatePhone();
    const isPasswordValid = validatePassword();
    if (!isPhoneValid || !isPasswordValid) {
      setLoading(false);
      return;
    }
    try {
      const result = await signIn("credentials", { phone, password, redirect: false });
      if (result?.error) {
        toast.error(t("login.errors.phone-or-psw"));
      } else {
        toast.success(t("login.success"));
        onOpenChange(false);
      }
    } catch {
      toast.error(t("login.errors.unknown"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger>{/* External trigger — qoladi */}</DrawerTrigger>
      <DrawerContent
        className={cn(
          "flex flex-col max-h-[90dvh] overflow-hidden  custom-scrollbar p-4 rounded-t-xl",
          className
        )}
      >
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        {/* Scroll bo‘ladigan asosiy forma qismi */}
        <div className="flex-1 overflow-y-auto px-4">
          <h2 className="text-2xl mt-4 font-bold text-[#001D55] text-center mb-4">{t("Registration.RegistrationTitle")}</h2>
          <div className="flex flex-col gap-4">
            {/* Name input */}
            <div className="flex flex-col gap-1">
              <p className="text-sm">{t("Registration.nameTitle")}</p>
              <Input
                className="border-[#CFD9FE] rounded-xl text-[#677294] mb-2 placeholder-[#677294] pr-10"
                placeholder={t("Registration.namePlaceholder")}
              />

              {/* Phone input */}
              <p className="text-sm">{t("login.inputs.phone.title")}</p>
              <PhoneInput
                country={"uz"}
                value={phone}
                onChange={setPhone}
                onBlur={validatePhone}
                inputClass="!w-full !h-[44px] !border-[#CFD9FE] !text-[#677294] !placeholder-[#677294]"
                containerClass="!w-full"
                buttonClass="!bg-transparent"
              />
              {phoneError && <p className="text-red-500 text-sm">{phoneError}</p>}
            </div>

            {/* Password input */}
            <div className="flex flex-col gap-1">
              <p className="text-sm">{t("login.inputs.password.title")}</p>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={validatePassword}
                  className="border-[#CFD9FE] rounded-xl text-[#677294] placeholder-[#677294] pr-10"
                  placeholder={t("login.inputs.password.placeholder")}
                />
                {/* Password toggle button */}
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
              {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
            </div>
          </div>
        </div>

        {/* Submit button pastda har doim ko‘rinadigan qilib joylashtirildi */}
        <div className="mt-4 px-4">
          <Button
            disabled={loading}
            onClick={handleSubmit}
            className="w-full bg-maket-primary hover:bg-blue-900 text-lg rounded-xl py-6"
          >
            {loading ? t("login.button.loading") : t("Registration.button.title")}
          </Button>
        </div>





        <p className="text-center font-thin mt-6">
          {t('login.login.text')}{" "}
          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              onRegisterClick(); // ✅ BU ENDILIKDA ISHLAYDI
            }}
            className="font-bold text-maket-secondary"
          >
            {t('login.login.action')}
          </button>
        </p>




        <Toaster />
      </DrawerContent>
    </Drawer>
  );
};
