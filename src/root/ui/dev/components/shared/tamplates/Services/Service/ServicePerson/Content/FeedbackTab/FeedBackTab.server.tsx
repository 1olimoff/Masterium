import { GetServerSideProps } from "next";
import axios from "axios";
import { FeedBackTab } from "./FeedBackTab";

interface ReviewData {
    averageRating: number;
    totalReviews: number;
    ratings: Record<string, number>;
    reviews: {
        name: string;
        date: string;
        rating: number;
        comment: string;
        profile_pic: string;
    }[];
}

interface Props {
    userUuid: string;
}

const fetchFeedback = async ({ userUuid }: Props) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}api/v1/write_review/review/master/${userUuid}/summary/`);
    return response.data
}

export default async function FeedBackServer({ userUuid }: Props) {
    // const response = await fetchFeedback({ userUuid })
    // console.log(response, "RESPONSEEEEE");
    
    return <FeedBackTab userUuid={userUuid} />;
}