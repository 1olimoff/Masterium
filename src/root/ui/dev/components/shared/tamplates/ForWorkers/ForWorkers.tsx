import React from 'react'
import { Content } from './Content/Content';
import { cn } from '@/root/business/lib/utils';
import { Title } from './Title/Title';
import { MobileBackTab } from './Title/MobileTabBar';
import axios from 'axios';
import { cookies } from 'next/headers';


interface Props {
    className?: string;
}

export interface Profile {
    user_uuid: string;
    profile_photo: string;
    first_name: string;
    last_name: string;
    about: string;
    father_name: string;
    phone_number: string;
    birth_date: string;
    passport_number: string;
    avg_rating: number;
    comments_count: number;
    activity: { 
        category: { id: number; name: string; }, 
        experience: { id: number; name: string; }, 
        price: number 
    }
}

const AboutMe = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}api/v1/masters/me/`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data.results; 
    } catch (error) {
        console.error('Error fetching masters:', error);
    }
};


const fetchImages = async (user_uuid: string) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}api/v1/master/${user_uuid}/images/`, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data.results;
    }
    catch (error) {
        console.error("RASMLARNI OLISHDA XATOLIK", error);
    }
}

const fetchVideos = async (user_uuid: string) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}api/v1/get/${user_uuid}/videos/`, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data.results;
    }
    catch (error) {
        console.log("Videolarni olishda xatolik", error);
    }
}

const fetchReview = async (user_uuid: string) => {
    try {
        const response = await axios.get(`${process.env.BASE_URL}api/v1/write_review/master/${user_uuid}/reviews/`, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data.results
    }
    catch (error) {
        console.log("Reviewlarni olishda xatolik", error);
    }
}


export const ForWorkers = async ({ className, }: Props) => {
    const profile: Profile = await AboutMe();

    if (!profile) return <div>Xatolik yuz berdi</div>;

    const images = await fetchImages(profile.user_uuid);
    const videos = await fetchVideos(profile.user_uuid);
    const reviews = await fetchReview(profile.user_uuid)

    console.log("ME:", profile);
    console.log("Reviewwww:", reviews);

    return (
        <div className={cn(className, "w-full flex flex-col gap-3 sm:px-4 sm:py-2 pb-4")}>
            <Title />
            <MobileBackTab />
            <div className="px-2">
                <Content 
                    response={profile} 
                    images={images} 
                    videos={videos} 
                    reviews={reviews}
                />
            </div>
        </div>
    );
};

export default ForWorkers;
