import { MyAdsPage } from "./AdsOpenCards/Card"
import { MobileBackTab } from "./Title/MobileBackTab"
import { Title } from "./Title/Title"

export const MyAds = () => {
    return(
        <div className=" bg-[#F8F9FA] mt-2 layout-width sm:px-4">
        <Title />
        <MobileBackTab />
        <div className="">
            <MyAdsPage />
        </div>
      </div>
    )
}