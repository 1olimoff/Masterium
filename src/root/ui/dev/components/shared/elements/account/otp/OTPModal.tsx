"use client";

import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { cn } from "@/root/business/lib/utils";
import { Dialog, DialogContent, DialogTitle, DialogHeader } from "@/root/components/ui/dialog";
import { Button } from "@/root/components/ui/button";
import { useTranslations } from "next-intl";
import { OTPInput } from "./OTPInput";
import { toast } from "react-hot-toast";

interface Props {
    className?: string;
    isOpen: boolean;
    phoneNumber: string;
    onClose: (open: boolean) => void;
    setOpenOTP: Dispatch<SetStateAction<boolean>>;
    onConfirm?: (code: string) => void;
}

export const OTPModal = ({
                             className,
                             isOpen,
                             phoneNumber,
                             onClose,
                             onConfirm,
                             setOpenOTP,
                         }: Props) => {
    const t = useTranslations("OTP");
    const [code, setCode] = useState(["", "", "", "", ""]);
    const [timeLeft, setTimeLeft] = useState(90);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isOpen && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        }
        return () => {
            clearInterval(timer);
        };
    }, [isOpen, timeLeft]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? "0" : ""}${s}`;
    };

    const handleSubmit = () => {
        const otpValue = code.join("");

        if (otpValue.trim() === "") {
            toast.error(t("errors.empty"));
            return;
        }

        if (otpValue.length < 5) {
            toast.error(t("errors.incomplete"));
            return;
        }

        // Анимация успешного ввода
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 1500);

        onConfirm?.(otpValue);
    };

    const handleResend = () => {
        setTimeLeft(90);
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => onClose(open)}>
            <DialogContent className={cn(className, "max-w-[400px]")}>
                <DialogHeader>
                    <DialogTitle className="text-center text-3xl font-semibold">
                        {t("title")}
                    </DialogTitle>
                </DialogHeader>

                <div className="text-center mt-2">
                    <p>
                        +{phoneNumber} {t("description")}
                    </p>
                    <button onClick={() => setOpenOTP(false)} className="text-sky-500 cursor-pointer mt-2">
                        {t("try-phone")}
                    </button>
                </div>

                <div className="flex justify-center">
                    <OTPInput length={6} code={code} setCode={setCode} isAnimating={isAnimating} />
                </div>

                <div className="text-center">
                    {timeLeft > 0 ? (
                        <span>
                            {formatTime(timeLeft)} {t("timer-text")}
                        </span>
                    ) : (
                        <button className="text-sky-500" onClick={handleResend}>
                            {t("try-code")}
                        </button>
                    )}
                </div>

                <div className="mt-2">
                    <Button
                        className="w-full bg-maket-primary py-6 rounded-xl hover:bg-sky-800"
                        onClick={handleSubmit}
                    >
                        {t("accept")}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
