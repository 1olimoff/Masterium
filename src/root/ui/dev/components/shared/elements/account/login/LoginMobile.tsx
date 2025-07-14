"use client"
import Link from "next/link";
import React, { ReactNode, useState } from "react";
import { cn } from '@/root/business/lib/utils';
import { useTranslations } from "next-intl";
import Image from "next/image";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import toast, { Toaster } from 'react-hot-toast';
import { signIn } from "next-auth/react";
import { Input } from "@/root/ui/dev/shadcn/ui/input";
import { Button } from "@/root/ui/dev/shadcn/ui/button";
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from "@/root/ui/dev/shadcn/ui/drawer";
import { OTPModal } from "../otp/OTPModal";

interface TabItemProps {
  icon: string;
  label: string;
  href: string;
  isActive: boolean;
}


interface Props {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRegisterClick: () => void;
}

const token: boolean = false;




export const AuthProvider = ({ children, open, onOpenChange, onRegisterClick }: Props) => {
  const t = useTranslations("Account");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [openOTP, setOpenOTP] = useState(false);

  const handleConfirmCode = async (code: string) => {
    try {
      toast.success("Kod tasdiqlandi");
      setOpenOTP(false);
    } catch {
      toast.error("Kod xato yoki muddati tugagan");
    }
  };

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

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    const isPhoneValid = validatePhone();
    const isPasswordValid = validatePassword();
    if (!isPhoneValid || !isPasswordValid) {
      setLoading(false);
      return;
    }
    try {
      const result = await signIn("credentials", { phone, password, redirect: false });
      if (result?.error) {
        setError(result.error);
        toast.error(t("login.errors.phone-or-psw"));
        setOpenOTP(true);
      } else {
        toast.success(t("login.success"));
        onOpenChange(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t("login.errors.unknown"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className={cn("fixed bottom-0 left-0 right-0 z-50", "max-w-[480px] w-full mx-auto", "bg-white shadow-lg", "overflow-hidden max-h-[90vh] flex flex-col")}>
        <div className="flex flex-col flex-1 overflow-y-auto p-6 sm:p-8 custom-scrollbar">
          <DrawerTitle><h3 className="text-2xl text-center">{t('login.title')}</h3></DrawerTitle>
          <div className="flex flex-col gap-4 mt-4">
            {/* PHONE INPUT */}
            <div className="flex flex-col gap-1">
              <p className="text-sm">{t('login.inputs.phone.title')}</p>
              <PhoneInput
                country={'uz'}
                value={phone}
                onChange={setPhone}
                onBlur={validatePhone}
                inputClass="!w-full !h-[44px] !border-[#CFD9FE] !text-[#677294] !placeholder-[#677294]"
                containerClass="!w-full"
                buttonClass="!bg-transparent"
              />
              {phoneError && <p className="text-red-500 text-sm">{phoneError}</p>}
            </div>
            {/* PASSWORD INPUT */}
            <div className="flex flex-col gap-1">
              <p className="text-sm">{t('login.inputs.password.title')}</p>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={validatePassword}
                  className="border-[#CFD9FE] rounded-xl text-[#677294] placeholder-[#677294] pr-10"
                  placeholder={t('login.inputs.password.placeholder')}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Image src={showPassword ? "/svg/account/login/eye-slash.svg" : "/svg/account/login/eye.svg"} alt="Toggle password" width={20} height={20} />
                </button>
              </div>
              {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
            </div>

            <Button disabled={loading} onClick={handleSubmit} className="w-full bg-maket-primary hover:bg-blue-900 text-lg rounded-xl py-6">
              {loading ? t('login.button.loading') : t('login.button.title')}
            </Button>

            <p className="text-center font-thin mt-4">
              {t('login.register.text')}{" "}
              <button
                type="button"
                onClick={() => {
                  onOpenChange(false);
                  onRegisterClick();
                }}
                className="font-bold text-maket-secondary"
              >
                {t('login.register.action')}
              </button>
            </p>
          </div>
        </div>
        <OTPModal isOpen={openOTP} phoneNumber={phone} onClose={setOpenOTP} setOpenOTP={setOpenOTP} onConfirm={handleConfirmCode} />
      </DrawerContent>
    </Drawer>
  );
};