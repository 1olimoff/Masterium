import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export function useLocalizedLink() {
    const router = useRouter();
    const [locale, setLocale] = useState("ru");
    const [region, setRegion] = useState("tashkent");

    useEffect(() => {
        const storedLocale = Cookies.get("locale") || "ru";
        const storedRegion = Cookies.get("region") || "tashkent";
        setLocale(storedLocale);
        setRegion(storedRegion);
    }, []);

    const navigate = (path: string) => {
        router.push(`/${locale}/${region}/${path}`);
    };

    return navigate;
}
