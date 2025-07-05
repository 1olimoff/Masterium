
import { Title } from "@/root/ui/dev/components/shared/tamplates/OfferWork/Title/Title";

import { Pictures } from "./Pictures/Pictures";
import { Price } from "./PriceandInfo/Price";
import { Contact } from "./Contact/Contact";
import { Profile } from "./PersonProfile/Profile";
import { MobileBackTab } from "./Title/MobileTabBar";


export default function OfferWork() {
  const catalogs = ["Santexnik", "Elektrik", "Quruvchi"];
  return (
    <div className=" bg-[#F8F9FA] mt-2 layout-width sm:px-2">
      <Title />
      <MobileBackTab />
      <div>
          <Profile catalogs={catalogs}/>
          <Pictures />
          <Price />
          <Contact />

      </div> 
    </div>
  );
}
