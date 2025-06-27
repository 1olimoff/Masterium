import { useTranslations } from "next-intl";
import { cn } from "@/root/business/lib/utils";
import { Dialog, DialogTrigger } from "@/root/ui/dev/shadcn/ui/dialog";
import Image from "next/image";
import { FeedBackModal } from "./Modal/Feedback.modal";

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
        <div className={cn("space-y-6 px-4 sm:px-8 mb-4", className)}>

            {/* Stats + Button */}
            <div className="bg-white p-6 rounded-lg shadow flex justify-between gap-6">
                <div className="flex md:flex-row md:items-start gap-6 flex-1">
                    {/* Rating */}
                    <div className="flex flex-col justify-center py-4 ml-2">
                        <h2 className="text-xl font-bold text-blue-900 mb-2">Izohlar</h2>
                        <div className="flex items-center text-4xl font-bold text-blue-900 mb-4">
                            {averageRating}
                            <span className="ml-2 text-yellow-400 text-3xl">★</span>
                        </div>
                    </div>

                    {/* Progress bars */}
                    <div className="flex-1">
                        <div className="space-y-2 md:px-8">
                            {[5, 4, 3, 2, 1].map((star) => {
                                const count = ratings[star.toString()] || 0;
                                const percent = totalReviews ? (count / totalReviews) * 100 : 0;
                                return (
                                    <div key={star} className="flex items-center gap-2 max-w-[400px]">
                                        <span className="w-14 text-sm text-blue-900">{star} stars</span>
                                        <div className="relative flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
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

                <div>
                    <Dialog>
                        <div className="hidden md:flex justify-end w-full md:pt-2">
                            <DialogTrigger asChild>
                                <div className="flex items-center gap-2 px-4 py-2 text-white text-sm rounded-2xl bg-maket-primary hover:bg-sky-800 transition">
                                    <div className="relative h-4 w-4">
                                        <Image
                                            src="/svg/worksPage/feedback.svg"
                                            alt="feedback"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    Izoh yozish
                                </div>
                            </DialogTrigger>
                            <FeedBackModal />
                        </div>
                    </Dialog>
                </div>
            </div>



            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-blue-900">
                    Barcha izohlar ({totalReviews})
                </h3>

                {reviews.map((review, index) => (
                    <div key={index} className="bg-white p-4 shadow flex justify-between rounded-[13px] items-start">
                        <div className="flex-1">
                            <div className="flex gap-2">
                                <img src={review.profile_pic} alt="profile" className="w-[64px] h-[64px] rounded-full" />
                                <div className="flex flex-col  justify-center">
                                    <p className="font-semibold text-blue-900">{review.name}</p>
                                    <p className="text-sm text-gray-500">{review.date}</p>
                                </div>
                            </div>
                            <p className="mt-2 text-gray-800 text-sm">{review.comment}</p>
                        </div>
                        <div className="text-xl font-bold text-blue-900 flex flex-col sm:flex-row items-center gap-1">
                            {review.rating.toFixed(1)}
                            <span className="text-yellow-400">
                                <span className="text-[#67729480]">★</span>★★★★
                            </span>
                        </div>
                    </div>



                ))}


                <Dialog>
                    <div className="flex md:hidden justify-center items-center mt-6">
                        <DialogTrigger asChild>
                            <button className="flex items-center justify-center gap-2 px-4 py-2 w-full max-w-[320px] text-white text-sm rounded-2xl bg-maket-primary hover:bg-sky-800 transition">
                                <div className="relative h-4 w-4">
                                    <Image
                                        src="/svg/worksPage/feedback.svg"
                                        alt="feedback"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                Izoh yozish
                            </button>
                        </DialogTrigger>
                        <FeedBackModal />
                    </div>
                </Dialog>
            </div>
        </div>
    );
};