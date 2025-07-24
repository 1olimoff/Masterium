import { fetchAds } from "../AdDataFetch"
import { AdCarousel } from "./AdCarousel"

export const AdCarouselServer = async () => {
    const response = await fetchAds();
    return (
        <AdCarousel response={response}/>
    )
}