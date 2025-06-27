import { MyAdsPage } from "./AdsOpenCards/Card"
import { Title } from "./Title/Title"

export const MyAds = () => {
    return(
        <div className=" bg-[#F8F9FA] mt-2 layout-width px-2">
        <Title />
        <div>
            <MyAdsPage />
        </div>
      </div>
    )
}