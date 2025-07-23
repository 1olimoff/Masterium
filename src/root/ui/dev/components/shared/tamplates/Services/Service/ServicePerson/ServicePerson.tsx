import React from 'react';
import { cn } from '@/root/business/lib/utils';
import { AdGrid } from "@/root/ui/dev/components/shared/elements/advertising/AdGrid";
import { Title } from "@/root/ui/dev/components/shared/tamplates/Services/Service/ServicePerson/Title/Title";
import { Header } from "@/root/ui/dev/components/shared/tamplates/Services/Service/ServicePerson/Header/Header";
import { Content } from "@/root/ui/dev/components/shared/tamplates/Services/Service/ServicePerson/Content/Content";
import axios from 'axios';

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
        return response.data.result;
    } catch (error) {
        console.error('Error fetching masters:', error);
    }
};


export const ServicePerson = async ({ className, userUuid, slug }: Props) => {
    const response = await UserProfile(userUuid);     

    return (
        <div className={cn(className, "w-full flex flex-col gap-6 pt-4 pb-4")}>
            <AdGrid />
            <Title slug={slug} response={response}/>
            <Header response={response}/>
            <Content response={response}/>
        </div>
    );
};