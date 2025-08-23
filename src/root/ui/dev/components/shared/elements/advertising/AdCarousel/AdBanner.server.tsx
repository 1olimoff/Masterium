import axios from "axios"
import { AdBanner } from "../AdBanner"

const fetchBanner = async () => {
    try {
        const response = await axios.get(`${process.env.BASE_URL}api/v1/ads/list/`, {
            headers: { 'Content-Type': 'application/json' }
        })
        return response.data.results
    }
    catch (error) {
        console.error("Reklamalarni olishda hatolik ", error)
    }
}
export const AdBannerServer = async () => {
    const response = await fetchBanner()
    
    return (
        <AdBanner response={response}/>
    )
}