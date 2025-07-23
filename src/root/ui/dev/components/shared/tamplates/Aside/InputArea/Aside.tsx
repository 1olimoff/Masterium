import { fetchCategoryList } from "@/root/business/api/main/category/fetchCategoryList"
import axios from "axios"
import Aside from "../AsideClient";

interface Props {
    className?: string;
    token: string | null;
}

export const  AsideServer = async ({token}:Props) => {

    const response = await fetchCategoryList()
    
    return(
            <Aside token={token}/>
    )
}