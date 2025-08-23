import React from 'react';
import { cn } from '@/root/business/lib/utils';
import { AdGrid } from "@/root/ui/dev/components/shared/elements/advertising/AdGrid";
import { Title } from "@/root/ui/dev/components/shared/tamplates/Services/Service/ServicePerson/Title/Title";
import { Header } from "@/root/ui/dev/components/shared/tamplates/Services/Service/ServicePerson/Header/Header";
import { Content } from "@/root/ui/dev/components/shared/tamplates/Services/Service/ServicePerson/Content/Content";
import axios from 'axios';
import { MobileBackTab } from './Title/MobileTabBar';

interface Props {
    className?: string;
    userUuid: string;
    slug: string
}

const UserProfile = async (userUuid: string) => { // userUuid qo'shish
    try {
        const response = await axios.get(`${process.env.BASE_URL}api/v1/masters/user-profile/?user_uuid=${userUuid}`, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data.results;
    } catch (error) {
        console.error('Error fetching masters:', error);
    }
};


const fetchFeedback = async (userUuid: string) => {
    try {
        const response = await axios.get(`${process.env.BASE_URL}api/v1/write_review/review/master/${userUuid}/summary`, {
            headers: { 'Content-Type': 'application/json' }
        })
        return response.data
    }
    catch (error) {
        console.error("Reklamalarni olishda hatolik ", error)
    }
}


const fetchImages = async (userUuid: string) => {
    try {
        const response = await axios.get(`${process.env.BASE_URL}api/v1/master/${userUuid}/images/`, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data.results;
    }
    catch (error) {
        console.error("RASMLARNI OLISHDA XATOLIK", error);
    }
}

const fetchVideos = async (userUuid: string) => {
    try {
        const response = await axios.get(`${process.env.BASE_URL}api/v1/get/${userUuid}/videos/`, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data.results
    }
    catch (error) {
        console.log("Videolarni olishda xatolik", error);
    }
}

const fetchReview = async (userUuid: string) => {
    try {
        const response = await axios.get(`${process.env.BASE_URL}api/v1/write_review/master/${userUuid}/reviews/`, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data.results
    }
    catch (error) {
        console.log("Reviewlarni olishda xatolik", error);
    }
}

const AdVisitka = async () => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}api/v1/ads/list/?type=visitka&limit/`, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data.results;
    } catch (error) {
        console.error('Error fetching masters:', error);
    }
}



export const ServicePerson = async ({ className, userUuid, slug }: Props) => {
    const response = await UserProfile(userUuid);
    const feedbackSummary = await fetchFeedback(userUuid)
    const fetchpics = await fetchImages(userUuid)
    const fetchvideos = await fetchVideos(userUuid)
    const feedBackReview = await fetchReview(userUuid)
    const advisitka = await AdVisitka()


    return (
        <div>
            <MobileBackTab slug={slug} response={response} />
            <div className={cn(className, "w-full flex flex-col gap-6 pt-4 pb-4 px-2")}>
                <AdGrid advisitka={advisitka}/>
                <Title slug={slug} response={response} />
                <Header response={response} slug={slug} userUuid={userUuid} />
                <Content response={response} feedbackSummary={feedbackSummary} slug={slug} userUuid={userUuid} fetchpics={fetchpics} feedBackReview={feedBackReview} VideoData={fetchvideos} />
            </div>
        </div>
    );
};