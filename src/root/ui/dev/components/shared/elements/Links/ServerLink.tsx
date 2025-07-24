"use client";

import Cookies from "js-cookie";
import Link from "next/link";
import React, { PropsWithChildren } from "react";

type ServerLinkProps = {
    path: string;
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
} & PropsWithChildren;

export default function ServerLink({ path, className, children }: ServerLinkProps) {
    const region = Cookies.get("region") || "tashkent"; 
    const locale = Cookies.get("locale") || "uz"; 

    const finalHref = `/${locale}/${region}/${path.replace(/^\/+/, "")}`;

    return (
        <Link href={finalHref} className={className}>
            {children}
        </Link>
    );
}