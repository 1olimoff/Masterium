import axios from "axios";
import { AdPoster } from "./Adposter";


const fetchPosters = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/v1/ads/list/?type=poster`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data.results;
  } catch (error) {
    console.error("Posterlarni olishda hatolik", error);
    return []; // xatolik bo‘lsa bo‘sh array qaytaramiz
  }
};

export const AdPosterServer = async () => {
  const response = await fetchPosters();

  return <AdPoster response={response} />; // ✅ endi to‘g‘ri component
};
