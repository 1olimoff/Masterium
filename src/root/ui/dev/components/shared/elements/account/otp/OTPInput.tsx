"use client";

import React, { useRef } from "react";
import { cn } from "@/root/business/lib/utils";

interface Props {
    className?: string;
    length: number;
    code: string[];
    setCode: React.Dispatch<React.SetStateAction<string[]>>;
    isAnimating: boolean;
}

export const OTPInput = ({ className, length, code, setCode, isAnimating }: Props) => {
    const refs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (value: string, idx: number) => {
        if (!/^[0-9]*$/.test(value)) return;

        const newCode = [...code];
        newCode[idx] = value;
        setCode(newCode);

        if (value && idx < length - 1) {
            refs.current[idx + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
        if (e.key === "Backspace" && !code[idx] && idx > 0) {
            refs.current[idx - 1]?.focus();
        }
    };

    return (
        <div className={cn(className, "flex gap-2")}>
            {Array(length)
                .fill(null)
                .map((_, i) => (
                    <input
                        key={i}
                        ref={(el) => {
                            refs.current[i] = el;
                        }}
                        type="text"
                        maxLength={1}
                        className={cn(
                            "w-12 h-12 border border-[#CFD9FE] rounded-xl text-center text-xl transition-colors",
                            isAnimating
                                ? "bg-gradient-to-r from-green-400 via-green-500 to-green-600 animate-gradient"
                                : ""
                        )}
                        value={code[i]}
                        onChange={(e) => handleChange(e.target.value, i)}
                        onKeyDown={(e) => handleKeyDown(e, i)}
                    />
                ))}
        </div>
    );
};
