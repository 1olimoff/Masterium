
import { Title } from "@/root/ui/dev/components/shared/tamplates/OfferWork/Title/Title";

import { Pictures } from "./Pictures/Pictures";
import { Price } from "./PriceandInfo/Price";
import { Contact } from "./Contact/Contact";
import { Profile } from "./PersonProfile/Profile";


export default function OfferWork() {
  const catalogs = ["Santexnik", "Elektrik", "Quruvchi"];
  return (
    <div className=" bg-[#F8F9FA] mt-2 layout-width px-2">
      <Title />
      <div>
          <Profile catalogs={catalogs}/>
          <Pictures />
          <Price />
          <Contact />

      </div> 
    </div>
  );
}
