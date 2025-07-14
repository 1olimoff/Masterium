"use client";
import React, { useState } from "react";
import "react-phone-input-2/lib/style.css";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/root/ui/dev/shadcn/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Input } from "@/root/ui/dev/shadcn/ui/input";
import { Button } from "@/root/ui/dev/shadcn/ui/button";
import { cn } from "@/root/business/lib/utils";
import { useTranslations } from "next-intl";
import axios from "axios";
import { OTPModal } from "../otp/OTPModal";
import PhoneInput from "react-phone-input-2";

interface Props {
  className?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLoginClick: () => void;
}

const OPERATORS = new Set([
    "20", "33", "50", "55", "61", "62", "65", "66", "67", "69",
    "70", "71", "72", "73", "74", "75", "76", "77", "78", "79",
    "88", "90", "91", "93", "94", "95", "97", "98", "99"
]);

export const LoginProviderTablet = ({ className, open, onOpenChange, onLoginClick }: Props) => {
  const t = useTranslations("Account");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [otpOpen, setOtpOpen] = useState(false);

  const validateInputs = () => {
    if (!name) {
      toast.error(t("Registration.errors.name.required"));
      return false;
    }
    if (name.length < 2) {
      toast.error(t("Registration.errors.name.minLength"));
      return false;
    }
    if (!phone) {
      toast.error(t("login.errors.phone.required"));
      return false;
    }
    if (!/^\+?\d+$/.test(phone)) {
      toast.error(t("login.errors.phone.invalid"));
      return false;
    }
    if (phone.length < 12) {
      toast.error(t("login.errors.phone.minLength"));
      return false;
    }
    const formattedPhone = phone.startsWith("+") ? phone : `+${phone}`;
    if (formattedPhone.startsWith("+998")) {
        const operatorCode = formattedPhone.substring(4, 6);
        if (!OPERATORS.has(operatorCode)) {
            toast.error(t("Registration.errors.phone.invalidOperatorCode", { code: operatorCode }));
            return false;
        }
    }
    if (!password) {
      toast.error(t("login.errors.password.required"));
      return false;
    }
    if (password.length < 8) {
      toast.error(t("login.errors.password.minLength"));
      return false;
    }
    return true;
  };

  const handleRegistration = async () => {
    setLoading(true);
    if (!validateInputs()) {
      setLoading(false);
      return;
    }

    try {
      const formattedPhone = phone.startsWith("+") ? phone : `+${phone}`;
      const response = await axios.post('/api/auth/registration', {
        phone_number: formattedPhone,
        password,
        name,
        req_type: "register"
      });

      if (response.data.success) {
        setOtpOpen(true); // Faqat OTP modalini ochish
        onOpenChange(false);
      }
    } catch (error: any) {
      console.error("Ro'yxatdan o'tish xatosi:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || t("Registration.errors.failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger>{/* Tashqi trigger */}</DialogTrigger>
        <DialogContent
          className={cn(
            "flex flex-col max-h-[90dvh] overflow-hidden custom-scrollbar p-4 rounded-t-xl",
            className
          )}
        >
          <DialogHeader>
            <DialogTitle>
              <h2 className="text-2xl mt-4 font-bold text-[#001D55] text-center">
                {t("Registration.RegistrationTitle")}
              </h2>
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto px-4 py-2">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <p className="text-sm">{t("Registration.nameTitle")}</p>
                <Input
                  className="border-[#CFD9FE] rounded-xl text-[#677294] mb-2 placeholder-[#677294] pr-10"
                  placeholder={t("Registration.namePlaceholder")}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
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
                      alt="Parolni ko'rsatish"
                      width={20}
                      height={20}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 px-4">
            <Button
              disabled={loading}
              onClick={handleRegistration}
              className="w-full bg-maket-primary hover:bg-blue-900 text-lg rounded-xl py-6"
            >
              {loading ? t("login.button.loading") : t("Registration.button.title")}
            </Button>
          </div>
          <p className="text-center font-thin mt-2">
            {t("login.login.text")}{" "}
            <button
              type="button"
              onClick={() => {
                onOpenChange(false);
                setTimeout(() => {
                  onLoginClick();
                }, 150);
              }}
              className="font-bold text-maket-secondary"
            >
              {t("login.login.action")}
            </button>
          </p>
          <Toaster />
        </DialogContent>
      </Dialog>
      <OTPModal
        isOpen={otpOpen}
        phoneNumber={phone}
        onClose={() => setOtpOpen(false)}
        setOpenOTP={setOtpOpen}
        setOpenParentModal={(value) => onOpenChange(typeof value === "boolean" ? value : false)}
        isRegisterFlow={true}
        onConfirm={async (code) => {
          try {
            const formattedPhone = phone.startsWith("+") ? phone : `+${phone}`;
            const response = await axios.post("/api/auth/registration", {
              phone_number: formattedPhone,
              code,
              req_type: "otp"
            });

            if (response.data.access_token) {
              localStorage.setItem("accessToken", response.data.access_token);
              localStorage.setItem("refreshToken", response.data.refresh_token);
              localStorage.setItem("authType", response.data.token_type);
              toast.success(t("OTP.success")); // Faqat OTP tasdiqlanganda chiqadi
              setOtpOpen(false);
            }
          } catch (error: any) {
            console.error("OTP tasdiqlash muvaffaqiyatsiz:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || t("OTP.errors.failed"));
          }
        }}
      />
    </div>
  );
};