// "use client"
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl"
// import { useRouter } from "next/navigation";
import { Title } from "./Title";
import { MobileBackTab } from "../Title/MobileTabBar";

export const Privacy = () => {
  const t = useTranslations("")
  // const router = useRouter();

  return (
    <div className="min-h-screen layout-width bg-[#F8FAFC]  text-[#0F172A] sm:px-8 ">
      <MobileBackTab />
      <div className="p-4">
      <Title />
      <h1 className="text-2xl font-bold mb-6 text-[#001D55]">Ish taklif qilish</h1>

      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-[#001D55]">ISH TAKLIF QILISH SHARTLARI</h2>

        <div className="text-sm space-y-4  text-gray-700">
          {[...Array(7)].map((_, i) => (
            <p key={i}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt modi, odit amet esse dicta ut cupiditate excepturi, ducimus nisi eligendi at saepe vel dolorum, aliquid ad! Maxime dolor labore accusamus perferendis, voluptatibus itaque iste aliquam nisi temporibus deserunt. Incidunt quas dignissimos laudantium nisi explicabo tempora earum mollitia unde temporibus ad vel, consequatur pariatur saepe sint, a minus dolorum, deserunt omnis quibusdam ut debitis corporis molestias. Quibusdam explicabo suscipit sint beatae sequi expedita deserunt eius nisi?
            </p>
          ))}
        </div>

        <div className="flex items-start mt-6">
          <input id="accept" type="checkbox" className="mt-1 mr-2" />
          <label htmlFor="accept" className="text-sm text-gray-700">
            Yuqorida yozilgan barcha shartlar bilan tanishdim va ularni tasdiqlayman!
          </label>
        </div>

        <div className="flex flex-col sm:flex-row items-center sm:justify-end gap-4 mt-6">
          <Link href="/tashkent/services" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto py-[12px] px-[42px] bg-[#F8F9FA] text-[#677294] rounded-[16px] cursor-pointer">
              {t("Privacy.PrivacyBtn.back")}
            </button>
          </Link>
          <Link href={"/tashkent/services/service"} className="w-full sm:w-auto">
            <button className="w-full sm:w-auto py-[12px] px-[52px] bg-[#001D55] text-white rounded-[16px] cursor-pointer">
              {t("Privacy.PrivacyBtn.confirm")}
            </button>
          </Link>
        </div>
      </div>

          </div>
    </div>
  )
}