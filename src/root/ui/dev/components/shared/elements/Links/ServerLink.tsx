// src/components/shared/elements/Links/ServerLink.tsx (или где-то в shared)
import Link from "next/link";
import {cookies} from "next/headers";
import React, {PropsWithChildren} from "react";

type ServerLinkProps = {
    path: string; // например, "open-works"
    className?: string;
} & PropsWithChildren;

export default async function ServerLink({ path, className, children }: ServerLinkProps) {
    // Достаём куки на сервере:
    const store = await cookies();
    const locale = store.get("locale")?.value || "uz";
    const region = store.get("region")?.value || "tashkent";

    // Формируем финальный путь
    const finalHref = `/${locale}/${region}/${path.replace(/^\/+/, "")}`;

    return (
        <Link href={finalHref} className={className}>
            {children}
        </Link>
    );
}
