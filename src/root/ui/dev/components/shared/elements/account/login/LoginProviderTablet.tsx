// src/components/LoginProviderTablet.tsx
"use client";
import React, { useState } from "react";
// import PhoneInput from "react chaqueInput-2";
import "react-phone-input-2/lib/style.css";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { signIn } from "next-auth/react";
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

export const LoginProviderTablet = ({ className, open, onOpenChange, onLoginClick }: Props) => {
  const t = useTranslations("Account");

  // States
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // Name holati qo‘shildi
  const [loading, setLoading] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otpOpen, setOtpOpen] = useState(false);

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

  // Submit handler for login
  const handleSubmit = async () => {
    setLoading(true);
    const isPhoneValid = validatePhone();
    const isPasswordValid = validatePassword();
    if (!isPhoneValid || !isPasswordValid) {
      setLoading(false);
      return;
    }
    try {
      const formattedPhone = phone.startsWith("+") ? phone : `+${phone}`;
      const result = await signIn("credentials", { phone: formattedPhone, password, redirect: false });
      if (result?.error) {
        toast.error(t("login.errors.phone-or-psw"));
      } else {
        toast.success(t("login.success"));
        onOpenChange(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(t("login.errors.unknown"));
    } finally {
      setLoading(false);
    }
  };

  // Registration handler
  const handleRegistration = async () => {
    setLoading(true);

    const isPhoneValid = validatePhone();
    const isPasswordValid = validatePassword();
    if (!isPhoneValid || !isPasswordValid || !name) {
      setLoading(false);
      if (!name) toast.error(t("Registration.errors.name.required"));
      return;
    }

    try {
      const formattedPhone = phone.startsWith("+") ? phone : `+${phone}`;
      const response = await axios.post('/api/auth/registration', {
        phone_number: formattedPhone,
        password,
        name,
      });

      console.log("Registration response:", response.data);
      toast.success(t("Registration.success"));
      setOtpOpen(true);
      onOpenChange(false);
    } catch (error: any) {
      console.error("Registration error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || t("Registration.errors.failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger>{/* External trigger */}</DialogTrigger>
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
              {/* Name input */}
              <div className="flex flex-col gap-1">
                <p className="text-sm">{t("Registration.nameTitle")}</p>
                <Input
                  className="border-[#CFD9FE] rounded-xl text-[#677294] mb-2 placeholder-[#677294] pr-10"
                  placeholder={t("Registration.namePlaceholder")}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Phone input */}
              <div className="flex flex-col gap-1">
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
        onConfirm={async (code) => {
          try {
            const formattedPhone = phone.startsWith("+") ? phone : `+${phone}`;
            const response = await axios.post("/api/auth/registration", {
              phone_number: formattedPhone,
              code,
            });

            if (response.data.access_token) {
              localStorage.setItem("accessToken", response.data.access_token);
              localStorage.setItem("refreshToken", response.data.refresh_token);
              localStorage.setItem("authType", response.data.token_type);
            }

            toast.success(t("OTP.success"));
            setOtpOpen(false);
          } catch (error: any) {
            console.error("OTP verification failed:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || t("OTP.errors.failed"));
          }
        }}
      />
    </div>
  );
};