import { fetchCategoryList } from "@/root/business/api/main/category/fetchCategoryList";
import axios from "axios";
import Aside from "../AsideClient";

interface Props {
  className?: string;
  token: string | null;
}

export const AsideServer = async ({ token }: Props) => {
  const response = await fetchCategoryList();

  // masters/me API'dan foydalanuvchi statusini tekshirish
  let isMasterRegistered = false;
  if (token) {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}api/v1/masters/me/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = res.data.results;

      // Master statusini aniqlash (activity.category?.id mavjudligiga qarab)
      if (data.activity && data.activity.category?.id) {
        isMasterRegistered = true;
      }
    } catch (err) {
      console.error("❌ Error fetching master/me in AsideServer:", err);
      // Xatolik bo‘lsa, isMasterRegistered false bo‘lib qoladi
    }
  }

  return <Aside token={token} categories={response} isMasterRegistered={isMasterRegistered} />;
};