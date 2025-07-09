import { useTranslations } from "next-intl";
import { OfferCard } from "./Cards/Card";


const data = [
    {
        title: "Oshxonani  yevro remont qilish kerak",
        category: "Malyar - shtukatur",
        price: 12850000,
        client: {
            avatar: {
                src: "/img/advertising/gas.png",
                alt: "Eshonov Baxodir",
            },
            name: "Eshonov Baxodir",
            type: "Mijoz",
            online: true,
        },
        applicationCount: 5
    },
]


export const OfferWorkerCards = () => {

    const t = useTranslations('');

    return (
        <div className="flex flex-col mt-2 sm:flex-row flex-wrap items-center sm:items-start gap-2 sm:gap-6 px-4">
            {data.map((item, i) => (
                <div className="w-full sm:w-auto flex mb-4 justify-center" key={i}>
                    <OfferCard data={item} />
                </div>
            ))}
        </div>
    );
}