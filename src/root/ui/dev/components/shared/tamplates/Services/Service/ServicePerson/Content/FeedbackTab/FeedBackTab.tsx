import { useTranslations } from "next-intl";
import { cn } from "@/root/business/lib/utils";
import Image from "next/image";

interface Props {
    className?: string;
}

export const FeedBackTab = ({ className }: Props) => {
    const t = useTranslations("ReviewTab");

    const averageRating: number = t.raw("averageRating");
    const totalReviews: number = t.raw("totalReviews");
    const ratings: Record<string, number> = t.raw("ratings");
    const reviews: {
        name: string;
        date: string;
        rating: number;
        comment: string;
        profile_pic: string;
    }[] = t.raw("reviews");

    return (
        <div className={cn("space-y-6 px-12 mb-4", className)}>
            <div className="bg-white p-6 rounded-lg shadow flex flex-col md:flex-row md:items-start justify-between gap-6">
                {/* Chap taraf: Izoh va statistikalar */}
                <div className="flex flex-col md:flex-row md:items-start gap-6 flex-1">
                    {/* Reyting raqami */}
                    <div className="flex flex-col justify-center py-4 ml-2">
                        <h2 className="text-xl font-bold text-blue-900 mb-2">Izohlar</h2>
                        <div className="flex items-center text-4xl font-bold text-blue-900 mb-4">
                            4.5<span className="ml-2 text-yellow-400 text-3xl">★</span>
                        </div>
                    </div>

                    {/* Progress barlar */}
                    <div className="flex-1">
                        <div className="space-y-2 px-8">
                            {[5, 4, 3, 2, 1].map((star) => {
                                const count = ratings[star.toString()] || 0;
                                const percent = totalReviews ? (count / totalReviews) * 100 : 0;
                                return (
                                    <div key={star} className="flex items-center gap-2">
                                        <span className="w-14 text-sm text-blue-900">{star} stars</span>
                                        <div className="relative flex-1 h-2 bg-gray-100 rounded-full">
                                            <div
                                                className="absolute top-0 left-0 h-2 bg-yellow-400 rounded-full"
                                                style={{ width: `${percent}%` }}
                                            />
                                        </div>
                                        <span className="w-8 text-right text-sm text-blue-900">{count}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Ong taraf: Tugma */}
                <div className="md:pt-2 flex justify-end">
                    <button className="flex items-center gap-2 px-4 py-2 text-white text-sm rounded-lg bg-maket-primary hover:bg-sky-800 transition">
                        <div className="relative h-4 w-4 flex items-center justify-center">

                    <Image src={"/svg/worksPage/feedback.svg"} alt={"this is for feedback pic"}
                                   fill objectFit={"contain"} />
                                   </div>
                        Izoh yozish
                    </button>
                </div>
            </div>



            <div className="space-y-4 ">
                <h3 className="text-lg font-semibold text-blue-900">
                    Barcha izohlar ({totalReviews})
                </h3>

                {reviews.map((review, index) => (
                    <div key={index} className="bg-white p-4 shadow flex justify-between rounded-[13px] items-start">
                        <div className="flex-1">
                            <div className="flex gap-2">
                                <img src={review.profile_pic} alt="persons_profile_pic" className="w-[64px] h-[64px] rounded-[50px]" />
                                <div className="flex flex-col justify-center">
                                    <p className="font-semibold text-blue-900">{review.name}</p>
                                    <p className="text-sm text-gray-500">{review.date}</p>
                                </div>
                            </div>
                            <p className="mt-2 text-gray-800 text-sm">{review.comment}</p>
                        </div>
                        <div className="text-xl font-bold text-blue-900 flex items-center gap-1">
                            {review.rating.toFixed(1)}
                            <span className="text-yellow-400"><span className="text-[#67729480]">★</span>★★★★</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
