import { Item } from "@/root/ui/dev/components/shared/elements/OpenWorkCard/OpenWorkCard"
import axios from "axios"


export const openWorksList = async () => {
    try {
        const initialResponse = (await axios.get(
            `${process.env.BASE_URL}api/v1/masters/public-jobs/?lat=41.294183&lon=69.257762&limit=20&offset=0`
        )).data.results;


        const detailPromises = initialResponse.map((offer: Item) =>
            axios.get(`${process.env.BASE_URL}api/v1/offers/${offer.offer_id}/public-detail/`)
        );

        const detailedResponses = await Promise.all(detailPromises);

        const enrichedOffers = initialResponse.map((offer: Item, index: number) => {
            const images = detailedResponses[index].data.result.images;
            return {
                ...offer,
                images 
            };
        });
        return enrichedOffers;

    } catch (error: any) {
        console.error("Failed to fetch open works list:", error.message);
        return [];
    }
}