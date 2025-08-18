import axios from "axios";

export const fetchCategoryList = async () => {
    const response = await axios.get(`${process.env.BASE_URL}api/v1/category/search/`, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response?.data?.results
} 