"use client";
import { useTranslations } from "next-intl";
import { OfferCard } from "./Cards/Card";

export interface AppliedCard {
    offer_id: number;
    images: string[];
    title: string;
    category_name: string;
    price: number;
    currency: string;
    application_id: number;
    application_count: number;
    is_public: boolean;
    user: { user_uuid: string; first_name: string; last_name: string };
}

interface Props {
    response: AppliedCard[];
}

export const OfferWorkerCards = ({ response }: Props) => {
    const t = useTranslations('');

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 px-4 py-4">
            {response.map((item, i) => (
                <OfferCard key={item.offer_id || i} data={item} />
            ))}
        </div>
    );
};
