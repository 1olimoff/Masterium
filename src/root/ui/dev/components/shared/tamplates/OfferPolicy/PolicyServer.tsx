import axios from "axios";
import { OfferPolicy } from "./Policy"
import { cookies } from "next/headers";


const fetchOfferDetail = async (offerid: number) => {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;
    try {
        const response = await axios.get(
            `${process.env.BASE_URL}api/v1/masters/${offerid}/private-detail/`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token ? `Bearer ${token}` : undefined,
                },
            }
        );
        return response.data.result;
    } catch (error) {
        console.error('Error fetching offer details:', error);
        return null;
    }
};


interface Props {
    offerId: number
}

export const OfferPolicyServer =  async({ offerId }: Props) => {
    const offerData = await fetchOfferDetail(offerId);

    return (
        <div>
            <OfferPolicy offerData={offerData}/>
        </div>
    )
}