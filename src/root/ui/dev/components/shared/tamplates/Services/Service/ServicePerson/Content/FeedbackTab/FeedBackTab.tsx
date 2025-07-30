import { useTranslations } from "next-intl";
import { cn } from "@/root/business/lib/utils";
import { Dialog, DialogTrigger } from "@/root/ui/dev/shadcn/ui/dialog";
import Image from "next/image";
import { FeedBackModal } from "./Modal/Feedback.modal";

interface Feedback {
  average_rating: number;
  total_reviews: number;
  rating_distribution: { 1: number, 2: number, 3: number, 4: number, 5: number }
}

interface Props {
  className?: string;
  data: Feedback;
  slug:string
  feedBackReview:FeedBackReview[]
}

interface FeedBackReview{
  comment: string;
  created_at: string
  full_name:string;
  id:number;
  image_url:string;
  rating:number;
  user_id:string
}


export const FeedBackTab = ({ className, data, slug, feedBackReview }: Props) => {
  const t = useTranslations("ReviewTab");
 
  const { average_rating, total_reviews, rating_distribution } = data;

  return (
    <div className={cn("space-y-6 px-1 sm:px-8 mb-4", className)}>

      <div className="bg-white sm:p-6 p-2 rounded-lg shadow flex justify-between gap-6">
        <div className="flex md:flex-row md:items-start gap-6 flex-1">
          <div className="flex flex-col justify-center py-4 ml-2">
            <h2 className="sm:text-xl text-lg font-bold text-blue-900 sm:mb-2">{t("comments")}</h2>
            <div className="flex items-center sm:text-4xl text-2xl font-bold text-blue-900 mb-4">
              {average_rating.toFixed(1)}
              <span className="ml-2 text-yellow-500 sm:text-3xl text-2xl">★</span>
            </div>
          </div>

          <div className="flex-1">
            <div className="space-y-2 md:px-8">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = rating_distribution[star as keyof typeof rating_distribution] || 0;
                const percent = total_reviews ? (count / total_reviews) * 100 : 0;
                return (
                  <div key={star} className="flex items-center gap-2 max-w-[400px]">
                    <span className="w-14 text-sm text-blue-900">{star} {t("stars")}</span>
                    <div className="relative flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="absolute top-0 left-0 h-2 bg-[#FFAC33] rounded-full"
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
                  {t("writeComment")}
                </div>
              </DialogTrigger>
              <FeedBackModal slug={slug}/>
            </div>
          </Dialog>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-blue-900">
          {t("allComments")} ({total_reviews})
        </h3>

        {feedBackReview.map((review) => (
          <div
            key={review.id} // Use unique id from FeedBackReview
            className="bg-white p-4 shadow flex justify-between rounded-[13px] items-start"
          >
            <div className="flex-1">
              <div className="flex gap-2">
                <img
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}${review.image_url}`}
                  alt="profile"
                  className="w-[64px] h-[64px] rounded-full object-cover object-center"
                />
                <div className="flex flex-col justify-center">
                  <p className="font-semibold text-blue-900">{review.full_name}</p>
                </div>
              </div>
              <p className="mt-2 text-gray-800 text-sm">{review.comment}</p>
            </div>
            <div className="text-xl font-bold text-blue-900 flex flex-col sm:flex-row sm:items-center items-end gap-1 sm:text-left text-right">
              {review.rating.toFixed(1)}
              <span className="flex gap-1 sm:justify-start justify-end w-full">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={i < Math.round(review.rating) ? "text-[#FFAC33]" : "text-gray-300"}
                  >
                    ★
                  </span>
                ))}
              </span>
            </div>
          </div>
        ))}

        <Dialog>
          <div className="sticky bottom-[74px] z-40 md:hidden flex justify-center items-center h-12 pt-0">
            <DialogTrigger asChild>
              <button className="flex items-center justify-center gap-2 py-2 w-full max-w-[420px] text-white text-sm rounded-2xl bg-maket-primary hover:bg-sky-800 transition">
                <div className="relative h-4 w-4">
                  <Image
                    src="/svg/worksPage/feedback.svg"
                    alt="feedback"
                    fill
                    className="object-contain"
                  />
                </div>
                {t("writeComment")} 
              </button>
            </DialogTrigger>
            <FeedBackModal slug={slug} /> 
          </div>
        </Dialog>
      </div>
    </div>
  );
};