"use client";

import { Drawer, DrawerContent, DrawerTrigger } from "@/root/ui/dev/shadcn/ui/drawer";
import { useTranslations } from "next-intl";
import PhoneInput from "react-phone-input-2";
import {Input} from "@/root/ui/dev/shadcn/ui/input";
import {Button} from "@/root/ui/dev/shadcn/ui/button";
import {cn} from '@/root/business/lib/utils';
import Image from "next/image";
import toast, {Toaster} from 'react-hot-toast';
import { useState } from "react";
import {signIn} from "next-auth/react";




interface Props {
  className?: string;
  children?: React.ReactNode;
}

export const RegistrationPage = ({ className, children }: Props) => {
  const t = useTranslations("");

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [openOTP, setOpenOTP] = useState(false);

//   const handleConfirmCode = (code: string) => {
//     console.log("Введённый код:", code);
//     setOpenOTP(false);
//   };

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
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
        toast.error(t("login.errors.phone-or-psw"));
        setOpenOTP(true);
      } else {
        toast.success(t("login.success"));
        // TODO: redirect here if needed
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
    <div className={cn(className)}>
      <Drawer>
        <DrawerTrigger>{children}</DrawerTrigger>
        <DrawerContent className="max-h-[90%] overflow-y-auto custom-scrollbar p-4 rounded-t-xl">
          <h3 className="text-2xl text-center mb-4">
            {t("login.title")}
          </h3>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-sm">{t("login.inputs.phone.title")}</p>
              <PhoneInput
                country={"uz"}
                value={phone}
                onChange={(phone) => setPhone(phone)}
                onBlur={validatePhone}
                inputClass="!w-full !h-[44px] !border-[#CFD9FE] !text-[#677294] !placeholder-[#677294]"
                containerClass="!w-full"
                buttonClass="!bg-transparent"
              />
              {phoneError && <p className="text-red-500 text-sm">{phoneError}</p>}
            </div>
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
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <Image
                    src={showPassword ? "/svg/account/login/eye-slash.svg" : "/svg/account/login/eye.svg"}
                    alt={showPassword ? "Hide password" : "Show password"}
                    width={20}
                    height={20}
                  />
                </button>
              </div>
              {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
            </div>
          </div>

          {/* <button
            onClick={validatePhone}
            className="my-4 text-sm font-thin text-end flex justify-end w-full"
          >
            {t("login.forget")}
          </button> */}

          <Button
            disabled={loading}
            onClick={handleSubmit}
            className="w-full bg-maket-primary hover:bg-blue-900 text-lg rounded-xl py-6"
          >
            {loading ? t("login.button.loading") : t("login.button.title")}
          </Button>

          <div className="my-4 text-center text-sm">{t("login.or.title")}</div>

          <Button
            variant="outline"
            disabled={loading}
            onClick={handleGoogleLogin}
            className="w-full mb-2 border-maket-primary"
          >
            <div className="w-5 h-5 relative mr-2">
              <Image src="/svg/account/login/google.svg" alt="Google Icon" fill objectFit="contain" />
            </div>
            {t("login.or.google")}
          </Button>
          <Button
            variant="outline"
            disabled={loading}
            onClick={handleAppleLogin}
            className="w-full border-maket-primary"
          >
            <div className="w-5 h-5 relative mr-2">
              <Image src="/svg/account/login/apple.svg" alt="Apple Icon" fill objectFit="contain" />
            </div>
            {t("login.or.apple")}
          </Button>

          {/* <p className="text-center font-thin my-4">
            {t("login.register.text")}{" "}
            <span className="font-bold text-maket-secondary cursor-pointer">
              {t("login.register.action")}
            </span>
          </p> */}

          <Toaster />
        </DrawerContent>
      </Drawer>
    </div>
  );
};
