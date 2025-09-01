"use client";
import { DialogContent, DialogTitle } from "@/root/ui/dev/shadcn/ui/dialog";
import { Rate } from "./Rate/Rate.component";
import { useTranslations } from "next-intl";
import { useState } from "react";
import ServerLink from "@/root/ui/dev/components/shared/elements/Links/ServerLink";
import axios from "axios";
import { UserData } from "../FeedBackTab";
import { useToast } from "@/root/business/hooks/use-toast";


interface Props {
  slug: string;
  profile: UserData;
}

export const FeedBackModal = ({ slug, profile }: Props) => {
  const t = useTranslations("ReviewTab");
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const { toast } = useToast();

  const handleSubmit = async () => {
    const data = {
      master_id: profile.user_uuid,
      rating,
      comment,
    };

    try {
      const response = await axios.post("/api/review", data, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        toast({
          title: "✅ Muvaffaqiyatli",
          description: "Fikr muvaffaqiyatli yuborildi!",
        });
      } else {
        toast({
          variant: "destructive",
          title: "⚠️ Xatolik",
          description: "Noma'lum javob qaytdi!",
        });
      }
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 403) {
          toast({
            variant: "destructive",
            title: "❌ Ruxsat berilmagan",
            description:
              "Izoh yozishingiz uchun ushbu ishchi sizning buyurtmangizni bajargan bo'lishi kerak",
          });
        } else {
          toast({
            variant: "destructive",
            title: "❌ Server xatosi",
            description: `Kod: ${error.response.status}`,
          });
        }
      } else {
        toast({
          variant: "destructive",
          title: "🌐 Tarmoq xatosi",
          description: "Qayta urinib ko'ring",
        });
      }
    }
  };

  return (
    <DialogContent className="rounded-[24px] pb-4 px-4 w-[100%] sm:max-w-[400px] mx-auto sm:top-1/2 top-[45%] sm:translate-y-[-50%] translate-y-0">
      <div className="flex flex-col w-full items-center">
        <DialogTitle>
          <p className="text-xl font-bold mb-2 text-[#001D55] text-center">
            {profile.first_name} {t("Modal.writetext")}
          </p>
          <p className="text-sm text-gray-600 text-center mb-4">
            {profile.first_name} {t("Modal.rate")}
          </p>
        </DialogTitle>

        <div className="mb-4 flex justify-center">
          <Rate onRateChange={setRating} />
        </div>

        <textarea
          className="w-full border border-gray-300 bg-[#F8F9FA] rounded-[16px] h-[120px] p-3 text-gray-700 resize-none mb-4 placeholder:text-gray-400"
          placeholder="Sharh yozing..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>

        <div className="w-full">
          <ServerLink path={`/services/${slug}`}>
            <button
              className="bg-[#001D55] text-white font-semibold py-3 px-6 rounded-[16px] w-full hover:bg-blue-900 transition"
              onClick={handleSubmit}
            >
              {t("Modal.sendbtn")}
            </button>
          </ServerLink>
          <p className="text-sm text-gray-500 mt-4 text-center">
            {t("Modal.checktext")}
          </p>
        </div>
      </div>
    </DialogContent>
  );
};
