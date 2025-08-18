import { cookies } from "next/headers";
import { Navbar } from "./Navbar/Navbar";
import { MobileBackTab } from "./Title/MobileTabBar";
import { InfoTitle } from "./Title/Title";
import axios from "axios";

const OfferDetail = async (offerId: number) => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;
        if (!token) {
            console.error("Access token topilmadi");
            return null;
        }
        const response = await axios.get(
            `${process.env.BASE_URL}api/v1/offers/${offerId}/detail/`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data.result;
    } catch (error) {
        console.error(`Offer detail olishda xatolik (ID: ${offerId})`, error);
        return null;
    }
};

const OfferApplication = async (offerId: number) => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;
        if (!token) {
            console.error("Access token topilmadi");
            return null;
        }
        const response = await axios.get(
            `${process.env.BASE_URL}api/v1/offers/${offerId}/applications/`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data.results;
    } catch (error) {
        console.error(`Offer detail olishda xatolik (ID: ${offerId})`, error);
        return null;
    }
};

export const FullInfoAds = async ({ slug }: any) => {
    const detail = await OfferDetail(slug);
    const applications = await OfferApplication(slug);

    console.log("Tanlangan Offer Detail:", detail);
    console.log("Tanlangan ishga ariza qoldirganlar :", applications);

    return (
        <div className="bg-[#F8F9FA] mt-2 layout-width sm:px-4">
            <InfoTitle detail={detail}/>
            <MobileBackTab/>
            <div className="px-2">
                <Navbar detail={detail} applications={applications} />
            </div>
        </div>
    );
};