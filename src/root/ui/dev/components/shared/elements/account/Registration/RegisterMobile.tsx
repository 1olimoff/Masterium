"use client";

import React, { ReactNode, useState, useEffect } from "react";
import { cn } from "@/root/business/lib/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import toast, { Toaster } from "react-hot-toast";
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from "@/root/ui/dev/shadcn/ui/drawer";
import { Input } from "@/root/ui/dev/shadcn/ui/input";
import { Button } from "@/root/ui/dev/shadcn/ui/button";
import { OTPModal } from "../otp/OTPModal";
import axios from "axios";

interface Props {
  className?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLoginClick: () => void;
}

const OPERATORS = new Set([
  "20", "33", "50", "55", "61", "62", "65", "66", "67", "69",
  "70", "71", "72", "73", "74", "75", "76", "77", "78", "79",
  "88", "90", "91", "93", "94", "95", "97", "98", "99",
]);

export const RegistrationPage = ({ className, open, onOpenChange, onLoginClick }: Props) => {
  const t = useTranslations("Account");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [otpOpen, setOtpOpen] = useState(false);

  // Reset form when modal opens
  useEffect(() => {
    if (open) {
      setPhone("");
      setPassword("");
      setName("");
      setShowPassword(false);
      setLoading(false);
    }
  }, [open]);

  // Prevent scroll jumps and lock viewport when inputs are focused
  useEffect(() => {
    const handleFocus = () => {
      window.scrollTo(0, 0);
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.height = "100%";
      document.documentElement.style.maxHeight = "100vh";
    };

    const handleBlur = () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.documentElement.style.height = "";
      document.documentElement.style.maxHeight = "";
    };

    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
      input.addEventListener("focus", handleFocus);
      input.addEventListener("blur", handleBlur);
    });

    return () => {
      inputs.forEach((input) => {
        input.removeEventListener("focus", handleFocus);
        input.removeEventListener("blur", handleBlur);
      });
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.documentElement.style.height = "";
      document.documentElement.style.maxHeight = "";
    };
  }, []);

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
      const response = await axios.post(
        "/api/auth/registration",
        {
          phone_number: formattedPhone,
          password,
          name,
          req_type: "register",
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        setOtpOpen(true);
        onOpenChange(false);
      } else {
        toast.error(response.data.message || t("Registration.errors.failed"));
        if (response.data.error === "user_exists") {
          toast.error(t("Registration.errors.user_exists"));
          setTimeout(() => {
            onLoginClick();
          }, 150);
        }
      }
    } catch (error: any) {
      console.error("Registration error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || t("Registration.errors.failed"));
    } finally {
      setLoading(false);
    }
  };

  const handleOtpConfirm = async (code: string) => {
    try {
      const formattedPhone = phone.startsWith("+") ? phone : `+${phone}`;
      const response = await axios.post(
        "/api/auth/registration",
        {
          phone_number: formattedPhone,
          code,
          req_type: "otp",
        },
        { withCredentials: true }
      );

      if (response.data.success && response.data.access_token) {
        toast.success(t("OTP.success"));
        setOtpOpen(false);
        onOpenChange(false);
      } else {
        toast.error(response.data.message || t("OTP.errors.failed"));
        onOpenChange(true);
      }
    } catch (error: any) {
      console.error("OTP verification failed:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || t("OTP.errors.failed"));
      onOpenChange(true);
    }
  };

  return (
    <>
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerTrigger>{/* External trigger */}</DrawerTrigger>
        <DrawerContent
          className={cn(
            "flex flex-col bg-maket-bg rounded-t-xl ios-safe-area layout-width",
            "fixed inset-0 h-[100vh] max-h-[100vh] sm:h-auto sm:max-h-[90vh]",
            "overflow-hidden",
            className
          )}
        >
          <div className="flex flex-col flex-1 overflow-y-auto p-6 sm:p-8 custom-scrollbar max-w-[400px] mx-auto w-full">
            <DrawerTitle>
              <h2 className="text-2xl font-bold text-[#001D55] text-center">
                {t("Registration.RegistrationTitle")}
              </h2>
            </DrawerTitle>
            <div className="flex flex-col gap-4 mt-4">
              {/* NAME INPUT */}
              <div className="flex flex-col gap-1">
                <p className="text-sm">{t("Registration.nameTitle")}</p>
                <div className="w-full h-[44px] overflow-hidden">
                  <Input
                    className="border-[#CFD9FE] rounded-xl text-[#677294] placeholder-[#677294] w-full h-[44px]"
                    placeholder={t("Registration.namePlaceholder")}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              {/* PHONE INPUT */}
              <div className="flex flex-col gap-1">
                <p className="text-sm">{t("login.inputs.phone.title")}</p>
                <div className="w-full h-[44px] overflow-hidden">
                  <PhoneInput
                    country={"uz"}
                    value={phone}
                    onChange={setPhone}
                    inputClass="!w-full !h-[44px] !border-[#CFD9FE] !text-[#677294] !placeholder-[#677294] !rounded-xl"
                    containerClass="!w-full !h-[44px]"
                    buttonClass="!bg-transparent !h-[44px]"
                    containerStyle={{ height: "44px" }}
                    dropdownStyle={{ maxHeight: "200px" }}
                  />
                </div>
              </div>
              {/* PASSWORD INPUT */}
              <div className="flex flex-col gap-1">
                <p className="text-sm">{t("login.inputs.password.title")}</p>
                <div className="relative w-full h-[44px] overflow-hidden">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-[#CFD9FE] rounded-xl text-[#677294] placeholder-[#677294] pr-10 w-full h-[44px]"
                    placeholder={t("login.inputs.password.placeholder")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    aria-label={t("login.inputs.password.toggle")}
                  >
                    <Image
                      src={showPassword ? "/svg/account/login/eye-slash.svg" : "/svg/account/login/eye.svg"}
                      alt={t("login.inputs.password.toggle")}
                      width={20}
                      height={20}
                    />
                  </button>
                </div>
              </div>
              <Button
                disabled={loading}
                onClick={handleRegistration}
                className="w-full bg-maket-primary hover:bg-blue-900 text-lg rounded-xl py-6"
              >
                {loading ? t("login.button.loading") : t("Registration.button.title")}
              </Button>
              <p className="text-center font-thin mt-4">
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
            </div>
          </div>
        </DrawerContent>
      </Drawer>
      <OTPModal
        isOpen={otpOpen}
        phoneNumber={phone}
        onClose={() => setOtpOpen(false)}
        setOpenOTP={setOtpOpen}
        setOpenParentModal={(value) => onOpenChange(typeof value === "boolean" ? value : false)}
        isRegisterFlow={true}
        onConfirm={handleOtpConfirm}
      />
    </>
  );
};