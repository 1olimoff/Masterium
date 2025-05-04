// src/components/shared/elements/account/login/LoginProviderDialog.tsx
"use client"; // Если вы используете app router, нужно явно включить client component

import React, {useState} from 'react';
import {cn} from '@/root/business/lib/utils';
import {useTranslations} from "next-intl";
import Image from "next/image";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

//Toaster
import toast, {Toaster} from 'react-hot-toast';

// shadcn
import {Dialog, DialogContent, DialogTitle, DialogTrigger} from "@/root/components/ui/dialog";
import {Input} from "@/root/components/ui/input";
import {Button} from "@/root/components/ui/button";

// Otp Modal
import {OTPModal} from "@/root/components/shared/elements/account/otp/OTPModal";

import {signIn} from "next-auth/react";

interface Props {
    className?: string;
    children?: React.ReactNode;
}

export const LoginProviderDialog = ({className, children}: Props) => {
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

    const handleConfirmCode = (code: string) => {
        console.log('Введённый код:', code);
        // Отправить на сервер или сделать нужные действия
        setOpenOTP(false);
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
        await signIn("google", {callbackUrl: "/"});
    };

    const handleAppleLogin = async () => {
        await signIn("apple", {callbackUrl: "/"});
    };

    return (
        <div className={cn(className)}>
            <Dialog>
                <DialogTrigger>{children}</DialogTrigger>
                <DialogContent
                    className={"max-w-[400px] max-sm:max-w-[300px] max-h-[90%] overflow-y-auto custom-scrollbar"}>
                    <DialogTitle>
                        <h3 className="text-2xl text-center">
                            {t('login.title')}
                        </h3>
                    </DialogTitle>
                    <div>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1">
                                <p className="text-sm">{t('login.inputs.phone.title')}</p>
                                <PhoneInput
                                    country={'uz'}
                                    value={phone}
                                    onChange={(phone) => setPhone(phone)}
                                    onBlur={validatePhone}
                                    inputClass="!w-full !h-[44px] !border-[#CFD9FE]  !text-[#677294] !placeholder-[#677294]"
                                    containerClass="!w-full"
                                    buttonClass="!bg-transparent"
                                />
                                {phoneError && <p className="text-red-500 text-sm">{phoneError}</p>}
                            </div>
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
                                            alt={showPassword ? "Hide password" : "Show password"}
                                            width={20}
                                            height={20}
                                        />
                                    </button>
                                </div>
                                {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                validatePhone();
                            }}
                            className="my-4 text-sm font-thin text-end flex justify-end w-full">
                            {t('login.forget')}
                        </button>
                        <Button
                            disabled={loading}
                            onClick={handleSubmit}
                            className="w-full bg-maket-primary hover:bg-blue-900 text-lg rounded-xl py-6"
                        >
                            {loading ? t('login.button.loading') : t('login.button.title')}
                        </Button>

                        {/* Кнопки входа через Google / Apple */}
                        <div className="my-4 text-center text-sm">
                            {t('login.or.title')}
                        </div>
                        <Button
                            variant="outline"
                            disabled={loading}
                            onClick={handleGoogleLogin}
                            className="w-full mb-2 border-maket-primary"
                        >
                            <div className={'w-5 h-5 relative'}>
                                <Image
                                    src={'/svg/account/login/google.svg'}
                                    alt={"Google Icon"}
                                    fill
                                    objectFit={"conatin"}
                                />
                            </div>
                            {t('login.or.google')}
                        </Button>
                        <Button
                            variant="outline"
                            disabled={loading}
                            onClick={handleAppleLogin}
                            className="w-full border-maket-primary"
                        >
                            <div className={'w-5 h-5 relative'}>
                                <Image
                                    src={'/svg/account/login/apple.svg'}
                                    alt={"Google Icon"}
                                    fill
                                    objectFit={"conatin"}
                                />
                            </div>
                            {t('login.or.apple')}
                        </Button>
                        <p className={"text-center font-thin my-4"}>
                            {t('login.register.text')} {''}
                            <span className={"font-bold text-maket-secondary"}>{t('login.register.action')}</span>
                        </p>
                    </div>
                    <Toaster/>
                    <OTPModal isOpen={openOTP} phoneNumber={phone} onClose={(open) => {
                        setOpenOTP(open)
                    }} setOpenOTP={setOpenOTP} onConfirm={handleConfirmCode}/>
                </DialogContent>
            </Dialog>
        </div>
    );
};
