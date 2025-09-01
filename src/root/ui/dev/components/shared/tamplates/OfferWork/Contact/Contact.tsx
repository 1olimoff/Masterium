"use client";
import { cn } from "@/root/business/lib/utils";
import { Input } from "@/root/ui/dev/shadcn/ui/input";
import { useTranslations } from "next-intl";
import { PhoneCheck } from "./Contact.component.tsx/component";
import ServerLink from "../../../elements/Links/ServerLink";
import axios from "axios";
import { toast } from "@/root/business/hooks/use-toast";
import { useOfferWorkStore } from "../OfferWorkStore";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface Props {
  className?: string;
  cookieToken: string | null;
  targetUserUuid: string;
  slug: string;
}

export const Contact = ({ className, cookieToken, targetUserUuid, slug }: Props) => {
  const t = useTranslations("OfferWork");
  const router = useRouter();

  // Locale va regionni cookies’dan olish
  const locale = Cookies.get("locale") || "uz";
  const region = Cookies.get("region") || "tashkent";

  // Zustand’dan faqat kerakli state va setter’larni alohida chaqirish
  const activeTopButton = useOfferWorkStore((state) => state.activeTopButton);
  const activeBottomButton = useOfferWorkStore((state) => state.activeBottomButton);
  const priceFrom = useOfferWorkStore((state) => state.priceFrom);
  const currency = useOfferWorkStore((state) => state.currency);
  const workTitle = useOfferWorkStore((state) => state.workTitle);
  const selectedCategory = useOfferWorkStore((state) => state.selectedCategory);
  const definition = useOfferWorkStore((state) => state.definition);
  const contactPerson = useOfferWorkStore((state) => state.contactPerson);
  const phone = useOfferWorkStore((state) => state.phone);
  const location = useOfferWorkStore((state) => state.location);
  const dateFrom = useOfferWorkStore((state) => state.dateFrom);
  const dateTo = useOfferWorkStore((state) => state.dateTo);
  const isPublic = useOfferWorkStore((state) => state.isPublic);
  const agreedToTerms = useOfferWorkStore((state) => state.agreedToTerms);
  const files = useOfferWorkStore((state) => state.files);
  const setContactPerson = useOfferWorkStore((state) => state.setContactPerson);
  const setLocation = useOfferWorkStore((state) => state.setLocation);
  const reset = useOfferWorkStore((state) => state.reset);

  const defaultLocationLat = 41.2995;
  const defaultLocationLng = 69.2401;

  const handleSubmit = async () => {
    try {
      if (!cookieToken) {
        toast({
          description: t("Contacts.authRequired") || "Autentifikatsiya talab qilinadi. Tizimga kiring.",
        });
        return;
      }

      if (
        !workTitle ||
        !definition ||
        !contactPerson ||
        !phone ||
        !location ||
        !activeTopButton ||
        !activeBottomButton ||
        !priceFrom ||
        selectedCategory === null
      ) {
        toast({
          description: t("Contacts.missingFields") || "Iltimos, barcha majburiy maydonlarni to‘ldiring",
        });
        return;
      }

      const parsedPrice = parseInt(priceFrom.replace(/[^0-9]/g, ""));
      if (isNaN(parsedPrice)) {
        toast({ description: t("Contacts.invalidPrice") || "Narx noto‘g‘ri formatda" });
        return;
      }

      const categoryId = selectedCategory;
      if (isNaN(categoryId)) {
        toast({ description: t("Contacts.invalidCategory") || "Kategoriya IDsi noto‘g‘ri formatda" });
        return;
      }

      // Fayllarni tekshirish
      if (files && files.length > 0) {
        for (const file of files) {
          if (!(file instanceof File)) {
            toast({ description: t("Contacts.invalidFileFormat") || "Fayl formati noto‘g‘ri. Iltimos, to‘g‘ri fayl yuklang." });
            return;
          }
          // Fayl turi va hajmini tekshirish
          if (!["image/jpeg", "image/png"].includes(file.type)) {
            toast({ description: t("Contacts.invalidFileType") || `Fayl turi noto‘g‘ri: ${file.name}. Faqat JPEG yoki PNG ruxsat etiladi.` });
            return;
          }
          if (file.size > 5 * 1024 * 1024) {
            toast({ description: t("Contacts.fileTooLarge") || `Fayl hajmi katta: ${file.name}. Maksimal 5MB ruxsat etiladi.` });
            return;
          }
          console.log(`Fayl: ${file.name}, Hajmi: ${file.size}, Turi: ${file.type}`);
        }
      } else {
        console.log("Fayllar yo‘q yoki bo‘sh");
      }

      const offerPayload = {
        title: workTitle,
        category_id: categoryId,
        description: definition,
        start_date: dateFrom ? dateFrom.toISOString().split("T")[0] : null,
        end_date: dateTo ? dateTo.toISOString().split("T")[0] : null,
        client_type: activeTopButton,
        payment_method: activeBottomButton,
        price: parsedPrice,
        currency: currency,
        contact_name: contactPerson,
        contact_phone: phone,
        contact_location_text: location,
        is_public: targetUserUuid ? false : isPublic,
        agreed_to_terms: agreedToTerms, 
        target_user_uuid: targetUserUuid,
        location_lat: defaultLocationLat,
        location_lng: defaultLocationLng,
      };

      console.log("Backendga yuborilayotgan ma'lumot (offerPayload):", offerPayload);

      const bodyFormData = new FormData();

      Object.entries(offerPayload).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          bodyFormData.set(key, value.toString());
        }
      });

      if (files && files.length > 0) {
        files.forEach((file, index) => {
          bodyFormData.append("images", file); 
        });
      }

      // FormData tarkibini log qilish
      for (const [key, value] of bodyFormData.entries()) {
        console.log(`FormData: ${key} = ${value}`);
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/v1/offers/`,
        bodyFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${cookieToken}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast({
          description: "Ma'lumotlar muvaffaqiyatli yuborildi",
        });
        reset();
        router.push(`/${locale}/${region}/services/`);
      } else {
        toast({
          description: "Xatolik yuz berdi",
          variant: "destructive",
        });
      }

    } catch (error: any) {
      console.error("POST so'rov xatosi: CONTACT.tsx", error.message, error.response);
      if (error.response?.status === 401) {
        toast({
          description: t("Contacts.authRequired") || "Autentifikatsiya talab qilinadi. Tizimga kiring.",
        });
      } else if (error.response?.status === 422 && error.response?.data?.detail) {
        const details = error.response.data.detail;
        if (Array.isArray(details)) {
          details.forEach((err: any) => {
            const field = err.loc[err.loc.length - 1];
            toast({ description: `${field}: ${err.msg}` });
          });
        } else {
          toast({ description: details || t("Contacts.submitError") || "Validatsiya xatosi" });
        }
      } else {
        toast({
          description: t("Contacts.submitError") || "Server bilan bog'lanishda xato yuz berdi",
        });
      }
    }
  };

  return (
    <div>
      <div className="p-5 bg-white m-3 flex flex-col lg:flex-row gap-6 rounded-[20px] px-4">
        <div className="w-full">
          <div className="mt-3">
            <h2 className="text-xl font-bold text-[#001D55]">{t("Contacts.title")}</h2>
            <p className="text-[14px] mt-[6px] font-normal text-[#001D55]">{t("Contacts.callPerson")}</p>
            <Input
              placeholder={t("Contacts.callPersonPlaceholder")}
              className="w-full sm:w-[75%] mt-[5px]"
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
            />
          </div>
          <div className="mt-3 gap-2">
            <p className="text-[14px] mt-[2px] font-normal text-[#001D55]">{t("Contacts.phone")}</p>
            <PhoneCheck />
          </div>
          <div className="mt-3">
            <p className="text-[14px] mt-[2px] font-normal text-[#001D55]">{t("Contacts.location")}</p>
            <Input
              placeholder={t("Contacts.locationPlaceholder")}
              className="w-full sm:w-[75%] mt-[5px]"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>
        <div className={cn(className, "w-full flex max-w-full lg:max-w-[400px] flex-col gap-3")}>
          <p className="text-sm sm:text-xl uppercase font-semibold">{t("Contacts.selectLocation")}</p>
          <div className="w-full" style={{ position: "relative", paddingBottom: "56.25%" }}>
            <iframe
              title="Google map location"
              aria-label="Google map for the location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23968.123231574384!2d69.2518912!3d41.3302784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b2931f41f23%3A0x81095e06b654b845!2z0KHQutCy0LXRgCDQkNC80LjRgNCwINCi0LXQvNGD0YDQsA!5e0!3m2!1sru!2s!4v1738616772427!5m2!1sru!2s"
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0, borderRadius: 15 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
      <div className="flex sm:flex-row justify-end gap-4 mt-6 p-5 bg-white m-3 rounded-[20px] px-4">
        <ServerLink path={`/${region}/${locale}/services/service`}>
          <button className="w-full sm:w-auto py-[12px] px-[42px] bg-[#F8F9FA] text-[#677294] rounded-[16px] cursor-pointer">
            {t("Contacts.buttons.cancelBtn")}
          </button>
        </ServerLink>
        <button
          className="w-full sm:w-auto py-[12px] px-[52px] bg-[#001D55] text-white rounded-[16px] cursor-pointer"
          onClick={handleSubmit}
        >
          {t("Contacts.buttons.submitBtn")}
        </button>
      </div>
    </div>
  );
};