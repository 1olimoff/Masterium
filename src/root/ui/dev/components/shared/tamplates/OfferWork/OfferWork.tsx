import { Title } from "@/root/ui/dev/components/shared/tamplates/OfferWork/Title/Title";
import { Pictures } from "./Pictures/Pictures";
import { Price } from "./PriceandInfo/Price";
import { Contact } from "./Contact/Contact";
import { Profile } from "./PersonProfile/Profile";
import { MobileBackTab } from "./Title/MobileTabBar";
import axios from "axios";


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

export default async function OfferWork({ slug, userUuid }: Props) {
  const catalogs = ["Santexnik", "Elektrik", "Quruvchi"];
  const response = await UserProfile(userUuid)

  return (
    <div className=" bg-[#F8F9FA] mt-2 layout-width sm:px-2">
      <Title slug={slug} response={response}/>
      <MobileBackTab />
      <div>
        <Profile catalogs={catalogs} response={response}/>
        <Pictures />
        <Price />
        <Contact />

      </div>
    </div>
  );
}
