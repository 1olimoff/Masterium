// src/components/shared/elements/Links/ServerLink.tsx (или где-то в shared)
import Cookies from "js-cookie";
import Link from "next/link";
import React, {PropsWithChildren} from "react";

type ServerLinkProps = {
    path: string; // например, "open-works"
    className?: string;
} & PropsWithChildren;

export default function ServerLink({ path, className, children }: ServerLinkProps) {
    const region = Cookies.get('region') 
    const locale = Cookies.get('locale')

    // Формируем финальный путь
    const finalHref = `/${locale == undefined ? 'uz' : locale}/${region == undefined ? 'tashkent' : region}/${path.replace(/^\/+/, "")}`;

    return (
        <Link href={finalHref} className={className}>
            {children}
        </Link>
    );
}
