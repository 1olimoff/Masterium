// AdvertisePage.tsx
import axios from "axios";
import { Contact } from "./Contact/Contact";
import { Description } from "./Description/Description";
import { Pictures } from "./Pictures/Pictures";
import { Price } from "./PriceInfo/Price";
import { MobileBackTab } from "./Title/MobileTabBar";
import { Title } from "./Title/Title";
import { cookies } from "next/headers";

const Categories = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}api/v1/category/search/`, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data.results;
  } catch (error) {
    console.error("Kategoriyalarni olishda xatolik", error);
    return [];
  }
};

// AdvertisePage.tsx
export const AdvertisePage = async () => {
  const cookieToken = (await cookies()).get("accessToken")?.value || null;
  const categories = await Categories();
  const catalogNames = categories?.map((category: any) => category.name) || [];

  console.log("COOKIE TOKEN", cookieToken);
  
  
  return (
    <div className="bg-[#F8F9FA] mt-2 layout-width sm:px-2">
      <Title />
      <MobileBackTab />
      <div>
        <Description catalogs={catalogNames} />
        <Pictures />
        <Price />
        <Contact cookieToken={cookieToken} />
      </div>
    </div>
  );
};