"use client";
import React, { useState, useEffect } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/root/ui/dev/shadcn/ui/dialog";
import { useTranslations } from "next-intl";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Image from "next/image";
import { Input } from "@/root/ui/dev/shadcn/ui/input";
import { Button } from "@/root/ui/dev/shadcn/ui/button";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { LoginProviderTablet } from "../Registration/RegisterTablet";
import { OTPModal } from "../otp/OTPModal";
import Cookies from "js-cookie"; 
interface Props {
  trigger: React.ReactNode;
}

const OPERATORS = new Set([
  "20", "33", "50", "55", "61", "62", "65", "66", "67", "69",
  "70", "71", "72", "73", "74", "75", "76", "77", "78", "79",
  "88", "90", "91", "93", "94", "95", "97", "98", "99",
]);

export let token: boolean = false; // Eksport qilinadigan token o'zgaruvchisi

export const LoginProviderDialog = ({ trigger }: Props) => {
  const t = useTranslations("Account");
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [otpOpen, setOtpOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Modal ochilganda formani va loading holatini tozalash
  useEffect(() => {
    if (openLogin) {
      setPhone("");
      setPassword("");
      setShowPassword(false);
      setLoading(false); 
    }
  }, [openLogin]);

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

  const handleLogin = async () => {
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
        setOpenLogin(false);
        setOtpOpen(true);
      } else {
        toast.error(t("login.errors.phone-or-psw")); // "Nomer yoki parol notog'ri"
        setOpenLogin(false);
        setTimeout(() => {
          setOpenRegister(true);
        }, 150);
      }
    } catch (error: any) {
      console.error("Login xatosi:", error.response?.data || error.message);
      toast.error(t("login.errors.phone-or-psw")); // "Nomer yoki parol notog'ri"
    } finally {
      setLoading(false); // Har qanday holatda loadingni o'chirish
    }
  };

  const handleOtpConfirm = async (code: string) => {
    try {
      const formattedPhone = phone.startsWith("+") ? phone : `+${phone}`;
      const response = await axios.post("/api/auth/login", {
        phone_number: formattedPhone,
        code,
        req_type: "otp",
      });
  
      if (response.data.access_token) {
        // Tokenlarni cookie'larga saqlash
        Cookies.set("accessToken", response.data.access_token, {
          expires: 15 / (24 * 60),
          sameSite: "lax",
          path: "/",
        });
        Cookies.set("refreshToken", response.data.refresh_token || "", {
          expires: 15,
          sameSite: "lax",
          path: "/",
        });
        Cookies.set("authType", response.data.token_type || "", {
          expires: 15,
          sameSite: "lax",
          path: "/",
        });
  
        // Token holatini true qilish
        token = true;
        toast.success(t("login.success")); // "Siz tizimga kirdingiz :)"
        setOtpOpen(false);
        setOpenLogin(false);
  
        // Cookie mavjudligini tekshirish
        if (Cookies.get("accessToken")) {
          console.log("Access token saqlandi, token holati true");
          token = true;
          setTimeout(() => {
            window.location.reload();
          }, 500); // 0.1 sekund
        } else {
          console.error("Access token saqlanmadi!");
          token = false;
        }
      } else {
        toast.error(t("OTP.errors.invalid")); 
      }
    } catch (error: any) {
      console.error("OTP tasdiqlash muvaffaqiyatsiz:", error.response?.data || error.message);
      toast.error(t("OTP.errors.minLength")); 
      token = false; 
    }
  };

  return (
    <>
      <Dialog open={openLogin} onOpenChange={setOpenLogin}>
        <DialogTrigger asChild>
          <div onClick={() => setOpenLogin(true)}>{trigger}</div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] p-6 rounded-2xl">
          <DialogHeader>
            <DialogTitle>
              <h2 className="text-2xl text-center mb-4">{t("login.title")}</h2>
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
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
                  placeholder={t("login.inputs.password.placeholder")}
                  className="border-[#CFD9FE] rounded-xl text-[#677294] placeholder-[#677294] pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <Image
                    src={
                      showPassword
                        ? "/svg/account/login/eye-slash.svg"
                        : "/svg/account/login/eye.svg"
                    }
                    alt="Parolni ko'rsatish"
                    width={20}
                    height={20}
                  />
                </button>
              </div>
            </div>
            <Button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-maket-primary hover:bg-blue-900 text-lg rounded-xl py-6"
            >
              {loading ? t("login.button.loading") : t("login.button.title")}
            </Button>
            <p className="text-center font-thin mt-4">
              {t("login.register.text")}{" "}
              <button
                type="button"
                onClick={() => {
                  setOpenLogin(false);
                  setTimeout(() => {
                    setOpenRegister(true);
                  }, 150);
                }}
                className="font-bold text-maket-secondary"
              >
                {t("login.register.action")}
              </button>
            </p>
            <Toaster />
          </div>
        </DialogContent>
      </Dialog>
      <LoginProviderTablet
        open={openRegister}
        onOpenChange={setOpenRegister}
        onLoginClick={() => {
          setOpenRegister(false);
          setTimeout(() => {
            setOpenLogin(true);
          }, 150);
        }}
      />
      <OTPModal
        isOpen={otpOpen}
        phoneNumber={phone}
        onClose={() => setOtpOpen(false)}
        setOpenOTP={setOtpOpen}
        setOpenParentModal={setOpenLogin}
        isRegisterFlow={false}
        onConfirm={handleOtpConfirm}
      />
    </>
  );
};