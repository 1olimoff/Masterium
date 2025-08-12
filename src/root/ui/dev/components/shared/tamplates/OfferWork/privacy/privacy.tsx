"use client"
import { useState } from "react"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import toast, { Toaster } from "react-hot-toast"
import Cookies from "js-cookie" // Added js-cookie

import { MobileBackTab } from "../Title/MobileTabBar"
import ServerLink from "../../../elements/Links/ServerLink"
import { Title } from "./Title"

interface UserProfile {
  first_name: string
  last_name: string
  avg_rating: number
  profile_photo: string
  comments_count: number
  user_uuid: string
}

interface Props {
  slug: string
  userLastName: string
  response: UserProfile
}

export const Privacy = ({ slug, userLastName, response }: Props) => {
  const t = useTranslations("")
  const [isChecked, setIsChecked] = useState(false)
  const router = useRouter()

  const locale = Cookies.get("locale") || "uz"
  const region = Cookies.get("region") || "tashkent"

  const handleConfirm = () => {
    if (isChecked) {
      router.push(`/${locale}/${region}/services`)
    } else {
      toast.error(t("Privacy.PrivacyBtn.checkboxError") || "Iltimos, shartlarga rozi ekanligingizni tasdiqlang.", {
        duration: 4000,
        position: "top-center",
        style: {
          background: "#FFF1F2",
          color: "#B91C1C",
          border: "1px solid #FCA5A5",
          borderRadius: "12px",
          padding: "16px 24px",
          fontSize: "15px",
          fontWeight: "500",
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
          maxWidth: "400px",
          textAlign: "center",
        },
        iconTheme: {
          primary: "#B91C1C",
          secondary: "#FFF1F2",
        },
      })
    }
  }

  return (
    <div className="min-h-screen layout-width bg-[#F8FAFC] text-[#0F172A] sm:px-8">
      <Toaster
        toastOptions={{
          duration: 4000,
          style: {
            animation: "slideIn 0.3s ease-out",
          },
        }}
      />
      <MobileBackTab />
      <div className="p-4">
        <Title slug={slug} userUuid={userLastName} response={response} />
        <h1 className="text-2xl font-bold mb-6 text-[#001D55]">Ish taklif qilish</h1>

        <div className="bg-white p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-[#001D55]">{t("OfferWork.Offers.offersTitle")}</h2>

          <div className="text-sm space-y-4 text-gray-700">
            {[...Array(7)].map((_, i) => (
              <p key={i}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt modi, odit amet esse dicta ut
                cupiditate excepturi, ducimus nisi eligendi at saepe vel dolorum, aliquid ad! Maxime dolor labore accusamus
                perferendis, voluptatibus itaque iste aliquam nisi temporibus deserunt. Incidunt quas dignissimos
                laudantium nisi explicabo tempora earum mollitia unde temporibus ad vel, consequatur pariatur saepe sint, a
                minus dolorum, deserunt omnis quibusdam ut debitis corporis molestias. Qibusdam explicabo suscipit sint
                beatae sequi expedita deserunt eius nisi?
              </p>
            ))}
          </div>

          <div className="flex items-start mt-6">
            <input
              id="accept"
              type="checkbox"
              className="mt-1 mr-2"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <label htmlFor="accept" className="text-sm text-gray-700">
              {t("OfferWork.Offers.confirminfo")}
            </label>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:justify-end gap-4 mt-6">
            <ServerLink path="services" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto py-[12px] px-[42px] bg-[#F8F9FA] text-[#677294] rounded-[16px] cursor-pointer">
                {t("Privacy.PrivacyBtn.back")}
              </button>
            </ServerLink>
            <button
              onClick={handleConfirm}
              className={`w-full sm:w-auto py-[12px] px-[52px] text-white rounded-[16px] transition-colors duration-200
                ${isChecked ? "bg-[#001D55] hover:bg-[#001a44]" : "bg-[#9CA3AF] cursor-not-allowed"}
              `}
            >
              {t("Privacy.PrivacyBtn.confirm")}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}