import axios from "axios";
import Catalogs from "./Catalogs"

const fetchCatalogsList = async () => {
    try {
        const response = await axios.get(`${process.env.BASE_URL}api/v1/category/search/`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response?.data?.results
    }
    catch (error) {
        console.error("Cataloglarni olishda xatolik!!!", error);

    }
}

export const CatalogsServer = async () => {
    const response = await fetchCatalogsList()
    console.log("CATTTTT", response);

    return (
        <div>
            <Catalogs response={response} />
        </div>
    )
}