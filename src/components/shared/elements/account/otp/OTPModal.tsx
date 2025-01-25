"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@lib/utils";
import { Dialog, DialogContent, DialogTitle, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { OTPInput } from "./OTPInput";

interface Props {
    className?: string;
    /** Управляет открытием/закрытием модалки */
    isOpen: boolean;
    /** Телефон, который нужно подтвердить */
    phoneNumber: string;
    /** Что делать при закрытии окна (например, поставить isOpen=false в родителе) */
    onClose: (open: boolean) => void;
    /** Колбэк, срабатывающий при нажатии кнопки подтверждения (передаёт введённый код) */
    setOpenOTP: state

    /** Колбэк, срабатывающий при нажатии кнопки подтверждения (передаёт введённый код) */
    onConfirm?: (code: string) => void;
}

export const OTPModal = ({
                             className,
                             isOpen,
                             phoneNumber,
                             onClose,
                             onConfirm
                         }: Props) => {
    const t = useTranslations("OTP");
    // Храним код в виде массива из 5 символов
    const [code, setCode] = useState(["", "", "", "", ""]);
    // Таймер для повторной отправки кода, например 90 секунд
    const [timeLeft, setTimeLeft] = useState(90);

    // При открытии окна запускаем таймер
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isOpen && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        }
        return () => {
            clearInterval(timer);
        };
    }, [isOpen, timeLeft]);

    // Форматируем время в mm:ss
    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? "0" : ""}${s}`;
    };

    // Когда пользователь нажимает «Tasdiqlash»:
    const handleSubmit = () => {
        const otpValue = code.join("");
        // Проверка минимальной длины кода
        if (otpValue.length < 5) {
            // В реальном проекте тут можно показывать toast или что-то другое
            console.warn(t("errors.minLength"));
            return;
        }
        // Вызываем родительский колбэк, передавая введённый код
        onConfirm?.(otpValue);
    };

    // Повторная отправка кода
    const handleResend = () => {
        // Здесь логика отправки SMS повторно
        // ...
        // Сбросим таймер заново
        setTimeLeft(90);
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => onClose(open)}>
            <DialogContent className={cn(className, "max-w-[400px]")} >
                <DialogHeader>
                    <DialogTitle className="text-center text-3xl font-semibold">
                        {t("title")}
                    </DialogTitle>
                </DialogHeader>

                <div className="text-center mt-2">
                    {/* Пример: +998 99 997 99 77 raqamingizga yuborilgan SMS kodni kiriting. */}
                    <p>
                        +{phoneNumber} {t("description")}
                    </p>
                    {/* «Телефон раqamни o’zgатириш» – можно сделать кликабельной ссылкой */}
                    <button onClick={} className="text-sky-500 cursor-pointer mt-2">
                        {t("try-phone")}
                    </button>
                </div>

                {/* Сам ввод OTP – 5 окошек */}
                <div className="flex justify-center mt-4">
                    <OTPInput length={6} code={code} setCode={setCode} />
                </div>

                {/* Таймер или кнопка «повторить» */}
                <div className="text-center mt-4">
                    {timeLeft > 0 ? (
                        <span>
              {formatTime(timeLeft)} {t("timer-text")}
            </span>
                    ) : (
                        // Когда таймер обнулился, показываем кнопку для повторной отправки
                        <button className="text-sky-500" onClick={handleResend}>
                            {t("try-phone")} {/* или \"Qaytadan yuborish\" */}
                        </button>
                    )}
                </div>

                <div className="mt-6">
                    <Button className="w-full" onClick={handleSubmit}>
                        {t("accept")}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
