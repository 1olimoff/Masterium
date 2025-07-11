"use client";
import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/root/ui/dev/shadcn/ui/dialog";

import { useTranslations } from "next-intl";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Image from "next/image";
import { Input } from "@/root/ui/dev/shadcn/ui/input";
import { Button } from "@/root/ui/dev/shadcn/ui/button";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { RegistrationPage } from "../RegistrationPage/RegistrationPage";
import { LoginProviderTablet } from "./LoginProviderTablet";

interface Props {
  trigger: React.ReactNode;
}

export const LoginProviderDialog = ({ trigger }: Props) => {
  const t = useTranslations("Account");

  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
    const isPhoneValid = validatePhone();
    const isPasswordValid = validatePassword();

    await fetch('/api/auth/registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: 'john',
        password: 'secure'
      })
    });



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
        toast.error(t("login.errors.phone-or-psw"));
      } else {
        toast.success(t("login.success"));
        setOpenLogin(false);
      }
    } catch (err) {
      toast.error(t("login.errors.unknown"));
    } finally {
      setLoading(false);
    }
  };




  return (
    <>
      {/* Trigger for login dialog */}
      <Dialog open={openLogin} onOpenChange={setOpenLogin}>
        <DialogTrigger asChild>
          <div onClick={() => setOpenLogin(true)}>{trigger}</div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] p-6 rounded-2xl">
          <DialogHeader>
            <DialogTitle><h2 className="text-2xl text-center mb-4">{t("login.title")}</h2></DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col gap-4">
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

            <div className="flex flex-col gap-1">
              <p className="text-sm">{t("login.inputs.password.title")}</p>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={validatePassword}
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
                    alt="Toggle password"
                    width={20}
                    height={20}
                  />
                </button>
              </div>
              {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
            </div>

            <Button
              onClick={handleSubmit}
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
                  setOpenLogin(false); // login dialog yopiladi
                  setTimeout(() => {
                    setOpenRegister(true); // register drawer ochiladi
                  }, 150); // smooth transition
                }}
                className="font-bold text-maket-secondary"
              >
                {t("login.register.action")}
              </button>
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Register drawer modal */}
      <LoginProviderTablet
        open={openRegister}
        onOpenChange={setOpenRegister}
        onLoginClick={() => {
          setOpenRegister(false); // Register modalni yopamizfff
          setTimeout(() => {
            setOpenLogin(true); // Login modalni ochamiz
          }, 150);
        }}
      />

    </>
  );
};
