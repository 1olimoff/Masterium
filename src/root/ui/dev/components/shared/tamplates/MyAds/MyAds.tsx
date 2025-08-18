import axios from "axios";
import { MyAdsPage } from "./AdsOpenCards/Card";
import { MobileBackTab } from "./Title/MobileBackTab";
import { Title } from "./Title/Title";
import { cookies } from "next/headers";

// Offer interfeysi (umumiy foydalanish uchun)
export interface Offer {
  offer_id: number;
  images: string;
  title: string;
  category_name: string;
  price: string;
  currency: string;
  application_count: number;
  is_public: boolean;
}

const MyOffers = async (): Promise<Offer[]> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    if (!token) {
      console.error("Access token topilmadi");
      return [];
    }

    const response = await axios.get(`${process.env.BASE_URL}api/v1/offers/my/?limit=40&offset=0`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    return response.data.results || [];
  } catch (error) {
    console.error("Listlarni olishda xatolik", {
    });
    return [];
  }
};

export const MyAds = async () => {
  const offers = await MyOffers();

  return (
    <div className="bg-[#F8F9FA] mt-2 layout-width sm:px-4">
      <Title />
      <div className="mt-2">
        <MyAdsPage data={offers} />
      </div>
    </div>
  );
};