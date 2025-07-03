import { DialogContent, DialogTitle } from "@/root/ui/dev/shadcn/ui/dialog";
import { Rate } from "./Rate/Rate.component";
import { Link } from "@/i18n/routing";

export const FeedBackModal = () => {
    return (
        <DialogContent className="rounded-[24px] pb-4 px-4 w-[100%] sm:max-w-[400px] mx-auto sm:top-1/2 top-[45%] sm:translate-y-[-50%] translate-y-0">
            <div className="flex flex-col w-full items-center">
                <DialogTitle>
                    <p className="text-xl font-bold mb-2 text-[#001D55] text-center">
                        Bahodir uchun sharh qoldiring
                    </p>
                    <p className="text-sm text-gray-600 text-center mb-4">
                        Bahodirni ishlashini qanday baholaysiz?
                    </p>
                </DialogTitle>

                <div className="mb-4 flex justify-center">
                    <Rate />
                </div>

                <textarea
                    className="w-full border border-gray-300 bg-[#F8F9FA] rounded-[16px] h-[120px] p-3 text-gray-700 resize-none mb-4 placeholder:text-gray-400"
                    placeholder="Sharh yozing..."
                ></textarea>

                <div className="w-full">
                    <Link href="slug">
                        <button className="bg-[#001D55] text-white font-semibold py-3 px-6 rounded-[16px] w-full hover:bg-blue-900 transition">
                            Yuborish
                        </button>
                    </Link>
                    <p className="text-sm text-gray-500 mt-4 text-center">
                        Barcha sharhlar haqiqiyligi va aniqligini ta'minlash uchun joylashtirishdan oldin 48 soat ichida tekshiriladi.
                    </p>
                </div>
            </div>
        </DialogContent>
    );
};