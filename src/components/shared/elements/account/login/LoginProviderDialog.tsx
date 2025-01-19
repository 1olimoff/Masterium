// src/components/shared/elements/account/login/LoginProviderDialog.tsx
"use client"; // Если вы используете app router, нужно явно включить client component

import React, { useState } from 'react';
import { cn } from '@lib/utils';
import { useTranslations } from "next-intl";

// shadcn
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { signIn } from "next-auth/react";

interface Props {
    className?: string;
    children?: React.ReactNode;
}

export const LoginProviderDialog = ({ className, children }: Props) => {
    const t = useTranslations("Account");

    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

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
        await signIn("google", { callbackUrl: "/" });
    };

    const handleAppleLogin = async () => {
        await signIn("apple", { callbackUrl: "/" });
    };

    return (
        <div className={cn(className)}>
            <Dialog>
                <DialogTrigger>{children}</DialogTrigger>
                <DialogContent>
                    <DialogTitle>
                        <h3 className="text-2xl text-center">
                            {t('login.title')}
                        </h3>
                    </DialogTitle>
                    <div>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1">
                                <p className="text-sm">{t('login.inputs.phone.title')}</p>
                                <Input
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="border-[#CFD9FE] rounded-xl text-[#677294] placeholder-[#677294]"
                                    placeholder={t('login.inputs.phone.placeholder')}
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-sm">{t('login.inputs.password.title')}</p>
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="border-[#CFD9FE] rounded-xl text-[#677294] placeholder-[#677294]"
                                    placeholder={t('login.inputs.password.placeholder')}
                                />
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
                            className="w-full rounded-xl mb-2"
                        >
                            {t('login.or.google')}
                        </Button>
                        <Button
                            variant="outline"
                            disabled={loading}
                            onClick={handleAppleLogin}
                            className="w-full rounded-xl"
                        >
                            {t('login.or.apple')}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};
