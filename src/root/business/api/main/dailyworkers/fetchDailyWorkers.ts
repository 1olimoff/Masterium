import axios from "axios";

export const fetchDailyWorkers = async () => {
    const response = await axios.get(`${process.env.BASE_URL}api/v1/masters/daily/`, {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return response?.data?.results
}
