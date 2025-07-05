
// import { Content } from "./Content/InfoTab/InfoTab"
import { Navbar } from "./Navbar/Navbar"
import { MobileBackTab } from "./Title/MobileTabBar"
import { InfoTitle } from "./Title/Title"

export const FullInfoAds = () => {
    return(
        <div className=" bg-[#F8F9FA] mt-2 layout-width sm:px-4">
        <InfoTitle />
        <MobileBackTab />
        <div className="px-2">
            <Navbar />
        </div>
      </div>
    )
}