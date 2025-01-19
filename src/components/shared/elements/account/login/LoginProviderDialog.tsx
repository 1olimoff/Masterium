// src/components/shared/elements/account/login/LoginProviderDialog.tsx
"use client"; // Если вы используете app router, нужно явно включить client component

import React, {useState} from 'react';
import {cn} from '@lib/utils';
import {useTranslations} from "next-intl";
import Image from "next/image";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

// shadcn
import {Dialog, DialogContent, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

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
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        setError("");
        try {
            // signIn возвращает промис, в который можно передать callbackUrl и другие параметры
            const result = await signIn("credentials", {
                phone,
                password,
                redirect: false // чтобы управлять редиректом самостоятельно
            });

            if (result?.error) {
                setError(result.error);
            } else {
                // Успешный логин
                // Например, можно редиректнуть на главную:
                // router.push("/") (если используете useRouter() из next/navigation)
                // или закрыть диалог и показать сообщение об успехе
            }
        } catch (err: any) {
            setError(err.message || "Unknown error");
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
                <DialogContent className={"max-w-[400px] max-sm:max-w-[300px] max-h-[90%] overflow-y-auto"}>
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
                                    inputClass="!w-full !h-[44px] !border-[#CFD9FE] !rounded-xl !text-[#677294] !placeholder-[#677294]"
                                    containerClass="!w-full"
                                    buttonClass="!bg-transparent"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-sm">{t('login.inputs.password.title')}</p>
                                <div className="relative">
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
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
                            </div>
                        </div>
                        <p className="my-4 text-sm font-thin text-end">{t('login.forget')}</p>

                        {error && (
                            <p className="text-red-500 text-center mb-2">
                                {error}
                            </p>
                        )}

                        <Button
                            disabled={loading}
                            onClick={handleSubmit}
                            className="w-full bg-maket-primary hover:bg-blue-900 text-lg rounded-xl py-6"
                        >
                            {loading ? "Loading..." : t('login.button')}
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
                </DialogContent>
            </Dialog>
        </div>
    );
};
