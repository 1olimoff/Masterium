import { Title } from "@/root/ui/dev/components/shared/tamplates/OfferWork/Title/Title";
import { Pictures } from "./Pictures/Pictures";
import { Price } from "./PriceandInfo/Price";
import { Contact } from "./Contact/Contact";
import { Profile } from "./PersonProfile/Profile";
import { MobileBackTab } from "./Title/MobileTabBar";
import axios from "axios";
import { cookies } from "next/headers";
import { useOfferWorkStore } from "./OfferWorkStore";

interface Props {
  className?: string;
  userUuid: string;
  slug: string
}

const UserProfile = async (userUuid: string) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}api/v1/masters/user-profile/?user_uuid=${userUuid}`, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data.result;
  } catch (error) {
    console.error('Error fetching masters:', error);
  }
};

const Categories = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}api/v1/category/search/`, {
      headers: { "Content-Type": "application/json" }
    })
    return response.data.results
  }
  catch (error) {
    console.error("Kategoriyalarni olishda catolik", error)
  }
}

export default async function OfferWork({ slug, userUuid }: Props) {
  const cookieToken = (await cookies()).get('accessToken')?.value || null;
  const response = await UserProfile(userUuid);
  const categories = await Categories();

  const catalogNames = categories?.map((category: any) => category.name) || [];

  return (
    <div className=" bg-[#F8F9FA] mt-2 layout-width sm:px-2">
      <Title slug={slug} response={response} />
      <MobileBackTab />
      <div>
        <Profile catalogs={catalogNames} response={response} categories={categories}/>
        <Pictures />
        <Price />
        <Contact cookieToken={cookieToken} targetUserUuid={userUuid} slug={slug}/>
      </div>
    </div>
  );
}

