import { DialogContent } from "@/root/ui/dev/shadcn/ui/dialog"
import { Rate } from "./Rate/Rate.component"
import { Link } from "@/i18n/routing"

export const FeedBackModal = () => {
    return (
        <DialogContent>
            <div className="flex flex-col w-[100%] items-center">
                <h1 className="text-2xl font-bold mb-4 text-[#001D55]">Bahodir uchun sharh qoldiring</h1>
                <p className="text-gray-600 mb-4">Bahodirni ishlashini qanday baholaysiz?</p>

                <Rate />
                <textarea
                    className="w-full border border-gray-300 bg-[#F8F9FA] rounded-lg h-[150px] p-3 text-gray-700 resize-none mb-4 placeholder-gray-400"
                    placeholder="Sharh yozing..."
                ></textarea>

                <div>
                    <Link href="slug">
                    <button className="bg-[#001D55] text-white font-semibold py-[10px] px-6 rounded-[16px] w-full hover:bg-blue-900 transition">Yuborish</button>
                    <p className="text-sm text-gray-500 mt-4 text-center">Barcha sharhlar haqiqiyligi va aniqligini ta'minlash uchun joylashtirishdan
                        oldin 48 soat ichida tekshiriladi.</p>
                    </Link>
                </div>
            </div>
        </DialogContent>
    )
}
