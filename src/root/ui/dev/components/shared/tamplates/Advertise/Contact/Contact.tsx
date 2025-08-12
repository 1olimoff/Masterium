"use client";
import { useTranslations } from "next-intl";
import { Input } from "@/root/ui/dev/shadcn/ui/input";
import { PhoneCheck } from "./ContactComponent/Component";
import { cn } from "@/root/business/lib/utils";
import axios from "axios";
import { toast } from "@/root/business/hooks/use-toast";
import { useAdvertiseStore } from "../AdvertiseStore";
import ServerLink from "../../../elements/Links/ServerLink";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface Props {
  className?: string;
  cookieToken: string | null;
}

export const Contact = ({ className, cookieToken }: Props) => {
  const t = useTranslations("OfferWork");
  const router = useRouter();

  // Locale va regionni cookies’dan olish
  const locale = Cookies.get("locale") || "uz";
  const region = Cookies.get("region") || "tashkent";

  const {
    contactName,
    setContactName,
    phone,
    setPhone,
    location,
    setLocation,
    workTitle,
    dateFrom,
    dateTo,
    selectedCategory,
    description,
    pictures,
    clientType,
    paymentType,
    price,
    currency,
  } = useAdvertiseStore();

  const defaultLocationLat = 41.2995;
  const defaultLocationLng = 69.2401;

  const handleSubmit = async () => {
    try {
      if (!cookieToken) {
        toast({ description: t("Contacts.authRequired") || "Autentifikatsiya talab qilinadi. Tizimga kiring." });
        return;
      }
  
      if (
        !workTitle || !description || !contactName || !phone || !location ||
        !clientType || !paymentType || !price || selectedCategory === null
      ) {
        toast({ description: t("Contacts.missingFields") || "Iltimos, barcha majburiy maydonlarni to‘ldiring" });
        return;
      }
  
      const parsedPrice = parseInt(price.replace(/[^0-9]/g, ""));
      if (isNaN(parsedPrice)) {
        toast({ description: t("Contacts.invalidPrice") || "Narx noto‘g‘ri formatda" });
        return;
      }
  
      const categoryId = selectedCategory;
      if (isNaN(categoryId) || categoryId < 1) {
        toast({ description: t("Contacts.invalidCategory") || "Kategoriya tanlanmagan yoki noto‘g‘ri ID" });
        return;
      }
  
      const offerPayload = {
        title: workTitle,
        category_id: categoryId, // Endi to'g'ri ID (1, 2, 3) ishlatiladi
        description: description,
        start_date: dateFrom ? dateFrom.toISOString().split("T")[0] : null,
        end_date: dateTo ? dateTo.toISOString().split("T")[0] : null,
        client_type: clientType,
        payment_method: paymentType,
        price: parsedPrice,
        currency: currency,
        contact_name: contactName,
        contact_phone: phone,
        contact_location_text: location,
        is_public: true,
        agreed_to_terms: true,
        location_lat: defaultLocationLat,
        location_lng: defaultLocationLng,
      };
  
      const bodyFormData = new FormData();
      Object.entries(offerPayload).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          bodyFormData.set(key, value.toString());
        }
      });
  
      if (pictures && pictures.length > 0) {
        pictures.forEach((file, index) => {
          bodyFormData.append("images", file);
        });
      }
  
      console.log("=== FormData yuborilmoqda ===");
      for (const [key, value] of bodyFormData.entries()) {
        console.log(`Key: ${key}, Value: ${value}`);
      }
  
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "");
      const response = await axios.post(
        `${baseUrl}/api/v1/offers/`,
        bodyFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${cookieToken}`,
          },
        }
      );
  
      console.log("=== Backend javobi ===");
      console.log("Status:", response.status);
      console.log("Data:", response.data);
  
      if (response.status === 200 || response.status === 201) {
        toast({ description: t("Contacts.submitSuccess") || "Ma'lumotlar muvaffaqiyatli yuborildi" });
        router.push(`/${locale}/${region}/myads`);
      } else {
        toast({ description: t("Contacts.submitError") || "Xatolik yuz berdi" });
      }
    } catch (error: any) {
      console.error("=== POST so'rov xatosi ===");
      console.error("Xato xabari:", error.message);
      console.error("Xato javobi:", error.response?.data);
      console.error("Status:", error.response?.status);
      console.error("Headerlar:", error.response?.headers);
  
      if (error.response?.status === 401) {
        toast({ description: t("Contacts.authRequired") || "Autentifikatsiya talab qilinadi. Tizimga kiring." });
      } else if (error.response?.status === 422 && error.response?.data?.detail) {
        const details = error.response.data.detail;
        if (Array.isArray(details)) {
          details.forEach((err: any) => {
            const field = err.loc[err.loc.length - 1];
            const message = err.msg;
            toast({ description: `${field}: ${message}` });
            console.error(`Validatsiya xatosi - Maydon: ${field}, Xabar: ${message}`);
          });
        } else {
          toast({ description: details || t("Contacts.submitError") || "Validatsiya xatosi" });
          console.error("Validatsiya xato detallari:", details);
        }
      } else {
        toast({ description: t("Contacts.submitError") || "Server bilan bog'lanishda xato yuz berdi" });
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-white m-3 rounded-[20px] p-5 flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/2 space-y-4">
          <div>
            <h2 className="text-xl font-bold text-[#001D55]">{t("Contacts.title")}</h2>
            <p className="text-sm mt-1 text-[#001D55]">{t("Contacts.callPerson")}</p>
            <Input
              placeholder={t("Contacts.callPersonPlaceholder")}
              className="w-full mt-2"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
            />
          </div>
          <div>
            <p className="text-sm mt-1 text-[#001D55]">{t("Contacts.phone")}</p>
            <PhoneCheck />
          </div>
          <div>
            <p className="text-sm mt-1 text-[#001D55]">{t("Contacts.location")}</p>
            <Input
              placeholder={t("Contacts.locationPlaceholder")}
              className="w-full mt-2"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>
        <div className={cn(className, "w-full lg:w-1/2 flex flex-col gap-3")}>
          <p className="text-sm sm:text-xl uppercase font-semibold">{t("Contacts.selectLocation")}</p>
          <div className="w-full" style={{ position: "relative", paddingBottom: "56.25%" }}>
            <iframe
              title="Google map location"
              aria-label="Google map for the location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23968.123231574384!2d69.2518912!3d41.3302784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b2931f41f23%3A0x81095e06b654b845!2z0KHQutCy0LXRgCDQkNC80LjRgNCwINCi0LXQvNGD0YDQsA!5e0!3m2!1sru!2s!4v1738616772427!5m2!1sru!2s"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: 0,
                borderRadius: 15,
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
      <div className="flex sm:flex-row justify-end gap-4 p-5 bg-white m-3 rounded-[20px]">
        <ServerLink
          path={`/${region}/${locale}/services/service`}
          className="py-3 px-6 bg-[#F8F9FA] text-[#677294] rounded-[16px]"
        >
          {t("Contacts.buttons.cancelBtn")}
        </ServerLink>
        <button
          onClick={handleSubmit}
          className="py-3 px-6 bg-[#001D55] text-white rounded-[16px]"
        >
          {t("Advertise.Buttons.GiveAdvertise")}
        </button>
      </div>
    </div>
  );
};