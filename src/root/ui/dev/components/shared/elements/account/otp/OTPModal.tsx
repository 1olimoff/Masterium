"use client";

import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { cn } from "@/root/business/lib/utils";
import { Dialog, DialogContent, DialogTitle, DialogHeader } from "@/root/ui/dev/shadcn/ui/dialog";
import { Button } from "@/root/ui/dev/shadcn/ui/button";
import { useTranslations } from "next-intl";
import { OTPInput } from "./OTPInput";
import { toast } from "react-hot-toast";
import axios from "axios";

interface Props {
    className?: string;
    isOpen: boolean;
    phoneNumber: string;
    onClose: (open: boolean) => void;
    setOpenOTP: Dispatch<SetStateAction<boolean>>;
    setOpenParentModal: Dispatch<SetStateAction<boolean>>;
    isRegisterFlow: boolean;
    onConfirm?: (code: string) => void;
}

export const OTPModal = ({
    className,
    isOpen,
    phoneNumber,
    onClose,
    onConfirm,
    setOpenOTP,
    setOpenParentModal,
    isRegisterFlow,
}: Props) => {
    const t = useTranslations("OTP");
    const [code, setCode] = useState(["", "", "", "", ""]);
    const [timeLeft, setTimeLeft] = useState(90);
    const [isAnimating, setIsAnimating] = useState(false);
    const [resendCount, setResendCount] = useState(0);
    const [isResendDisabled, setIsResendDisabled] = useState(false);
    const maxResendAttempts = 3;

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
            toast.error(t("errors.required")); // "Son kiritishingiz shart"
            return;
        }

        if (otpValue.length < 5) {
            toast.error(t("errors.minLength")); // "Tekshirib to'liq kiriting"
            return;
        }

        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 1500);
        setTimeout(() => {
            window.location.reload();
          }, 600); // 1 sekund

        onConfirm?.(otpValue);
    };

    const handleResend = async () => {
        if (resendCount >= maxResendAttempts) {
            toast.error(t("errors.resend_limit_exceeded", { max: maxResendAttempts })); // "Qayta jo‘natish limiti oshdi! Maksimal {max} marta so‘rash mumkin."
            setIsResendDisabled(true);
            return;
        }

        try {
            const formattedPhone = phoneNumber.startsWith("+") ? phoneNumber : `+${phoneNumber}`;
            const response = await axios.post("/api/auth/resend_otp", {
                phone_number: formattedPhone,
                req_type: "resend_otp",
            });

            if (response.data.success) {
                setResendCount((prev) => prev + 1);
                setTimeLeft(90);
                toast.success(t("resend_success_message")); // "Yangi kod jo‘natildi, iltimos, telefoningizni tekshiring!"
                if (resendCount + 1 >= maxResendAttempts) {
                    setIsResendDisabled(true);
                }
            } else {
                toast.error(t("errors.resend_failed")); // "Uzur, server bilan bir nima bo'ldi. Qayta takrorlang"
            }
        } catch (error: any) {
            console.error("OTP qayta jo‘natish xatosi:", error.response?.data || error.message);
            toast.error(t("errors.resend_failed")); // "Uzur, server bilan bir nima bo'ldi. Qayta takrorlang"
        }
    };

    const handleTryPhone = () => {
        setOpenOTP(false);
        setTimeout(() => {
            setOpenParentModal(true);
        }, 300);
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
                    <button onClick={handleTryPhone} className="text-sky-500 cursor-pointer mt-2">
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
                        <button
                            className={cn("text-sky-500", { "opacity-50 cursor-not-allowed": isResendDisabled })}
                            onClick={handleResend}
                            disabled={isResendDisabled}
                        >
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