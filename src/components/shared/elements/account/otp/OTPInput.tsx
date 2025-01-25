"use client";

import React, { useRef } from "react";
import { cn } from "@lib/utils";

interface Props {
    className?: string;
    /** Сколько инпутов нужно (5 или 6). */
    length: number;
    /** Текущее состояние кода, массив символов */
    code: string[];
    /** Функция для обновления state кода в родителе */
    setCode: React.Dispatch<React.SetStateAction<string[]>>;
}

export const OTPInput = ({ className, length, code, setCode }: Props) => {
    // Храним ссылки на каждый input, чтобы переключать фокус
    const refs = useRef<(HTMLInputElement | null)[]>([]);

    // Обрабатываем ввод символа
    const handleChange = (value: string, idx: number) => {
        // Разрешаем ввод только цифр
        if (!/^[0-9]*$/.test(value)) return;

        const newCode = [...code];
        newCode[idx] = value;
        setCode(newCode);

        // Если ввели цифру и это не последний input, переключаем фокус на следующий
        if (value && idx < length - 1) {
            refs.current[idx + 1]?.focus();
        }
    };

    // Если нажали Backspace на пустом поле – переходим на предыдущее
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
                        ref={(el) => (refs.current[i] = el)}
                        type="text"
                        maxLength={1}
                        className="w-12 h-12 border border-[#CFD9FE] rounded text-center text-xl"
                        value={code[i]}
                        onChange={(e) => handleChange(e.target.value, i)}
                        onKeyDown={(e) => handleKeyDown(e, i)}
                    />
                ))}
        </div>
    );
};
