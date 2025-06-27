
// import { Content } from "./Content/InfoTab/InfoTab"
import { Navbar } from "./Navbar/Navbar"
import { InfoTitle } from "./Title/Title"

export const FullInfoAds = () => {
    return(
        <div className=" bg-[#F8F9FA] mt-2 layout-width px-2">
        <InfoTitle />
        <div>
            <Navbar />
        </div>
      </div>
    )
}