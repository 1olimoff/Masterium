import { Contact } from "./Contact/Contact";
import { Description } from "./Description/Description"
import { Pictures } from "./Pictures/Pictures";
import { Price } from "./PriceInfo/Price";
import { MobileBackTab } from "./Title/MobileTabBar";
import { Title } from "./Title/Title"

export const AdvertisePage = () => {
  const catalogs = ["Santexnik", "Elektrik", "Quruvchi"];
    return (
        <div className="bg-[#F8F9FA] mt-2 layout-width sm:px-2">
            <Title />
            <MobileBackTab />
            <div>
                <Description  catalogs={catalogs} />
                <Pictures />
                <Price />
                <Contact />  
            </div>
        </div>
    )
}