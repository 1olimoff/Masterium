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
import { OTPModal } from "../../elements/account/otp/OTPModal";

// shadcn
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/root/ui/dev/shadcn/ui/dialog";
import { Input } from "@/root/ui/dev/shadcn/ui/input";
import { Button } from "@/root/ui/dev/shadcn/ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "../../../../shadcn/ui/drawer";

interface TabItemProps {
  icon: string;
  label: string;
  href: string;
  isActive: boolean;
}


interface Props {
  children: React.ReactNode;
}

const token: boolean = false;





export const AuthProvider = ({ children }: Props) => {
  const t = useTranslations("Account");

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [openOTP, setOpenOTP] = useState(false);

  // Vremenno
  console.log(error)

  const handleConfirmCode = async (code: string) => {
    try {
      console.log("Kiritilgan kod:", code);
      // Misol: Serverga yuborish yoki token tekshirish
      toast.success("Kod tasdiqlandi");
      setOpenOTP(false);
      // Keyinchalik: redirect yoki token saqlash
    } catch (err) {
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
      const result = await signIn("credentials", {
        phone,
        password,
        redirect: false
      });

      if (result?.error) {
        setError(result.error);
        toast.error(t("login.errors.phone-or-psw"));
        setOpenOTP(true)
      } else {
        // Успешный логин

        toast.success(t("login.success"));
        // Дополнительная логика, например, редирект
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || t("login.errors.unknown"));
      } else {
        setError(t("login.errors.unknown"));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    await signIn("google", { callbackUrl: "/" });
  };

  const handleAppleLogin = async () => {
    await signIn("apple", { callbackUrl: "/" });
  };



  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50",
          "max-w-[480px] w-full mx-auto",
          "bg-white shadow-lg",
          "overflow-hidden max-h-[90vh] flex flex-col"
        )}
      >

        <div className="flex flex-col flex-1 overflow-y-auto p-6 sm:p-8 custom-scrollbar">
          <DrawerTitle>
            <h3 className="text-2xl text-center">{t('login.title')}</h3>
          </DrawerTitle>

          {/* Form Content */}
          <div className="flex flex-col gap-4 mt-4">

            {/* PHONE INPUT */}
            <div className="flex flex-col gap-1">
              <p className="text-sm">{t('login.inputs.phone.title')}</p>
              <PhoneInput
                country={'uz'}
                value={phone}
                onChange={(phone) => setPhone(phone)}
                onBlur={validatePhone}
                inputClass="!w-full !h-[44px] !border-[#CFD9FE] !text-[#677294] !placeholder-[#677294]"
                containerClass="!w-full"
                buttonClass="!bg-transparent"
              />
              {phoneError && <p className="text-red-500 text-sm">{phoneError}</p>}
            </div>

            {/* PASSWORD */}
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

            <button
              onClick={validatePhone}
              className="text-sm font-thin text-end"
            >
              {t('login.forget')}
            </button>

            {/* SUBMIT */}
            <Button
              disabled={loading}
              onClick={handleSubmit}
              className="w-full bg-maket-primary hover:bg-blue-900 text-lg rounded-xl py-6"
            >
              {loading ? t('login.button.loading') : t('login.button.title')}
            </Button>

            {/* OR */}
            <div className="text-center text-sm">{t('login.or.title')}</div>

            {/* GOOGLE */}
            <Button
              variant="outline"
              disabled={loading}
              onClick={handleGoogleLogin}
              className="w-full border-maket-primary gap-2"
            >
              <div className="w-5 h-5 relative">
                <Image
                  src="/svg/account/login/google.svg"
                  alt="Google"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
              {t('login.or.google')}
            </Button>

            {/* APPLE */}
            <Button
              variant="outline"
              disabled={loading}
              onClick={handleAppleLogin}
              className="w-full border-maket-primary gap-2"
            >
              <div className="w-5 h-5 relative">
                <Image
                  src="/svg/account/login/apple.svg"
                  alt="Apple"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
              {t('login.or.apple')}
            </Button>

            <p className="text-center font-thin mt-4">
              {t('login.register.text')}{" "}
              <span className="font-bold text-maket-secondary">
                {t('login.register.action')}
              </span>
            </p>
          </div>
        </div>
      </DrawerContent>
      <OTPModal
        isOpen={openOTP}
        phoneNumber={phone}
        onClose={(open) => setOpenOTP(open)}
        setOpenOTP={setOpenOTP}
        onConfirm={handleConfirmCode}
      />
    </Drawer>


  );
};

export const TabItem = ({ icon, label, href, isActive }: TabItemProps) => {
  const iconPath = `/svg/tabbar/${icon}${isActive ? "active" : ""}.svg`;

  if (!token && label == 'Profil') {
    return (
      <AuthProvider>
        <div
          className="flex flex-col items-center justify-center w-full"
        >
          <div className="h-6 flex items-center justify-center">
            <Image src={iconPath} alt={label} width={24} height={24} />
          </div>
          <span
            className={`text-[12px] mt-1 ${isActive ? "text-[#00174C] font-semibold" : "text-gray-500"
              }`}
          >
            {label}
          </span>
        </div>
      </AuthProvider>
    )
  }

  return (
    <Link
      href={href}
      className="flex flex-col items-center justify-center w-full"
    >
      <div className="h-6 flex items-center justify-center">
        <Image src={iconPath} alt={label} width={24} height={24} />
      </div>
      <span
        className={`text-[12px] mt-1 ${isActive ? "text-[#00174C] font-semibold" : "text-gray-500"
          }`}
      >
        {label}
      </span>
    </Link>
  );
};

