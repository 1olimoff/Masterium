import { Privacy } from '@/root/ui/dev/components/shared/tamplates/OfferWork/privacy/privacy'
import axios from 'axios';
import React from 'react'


const UserProfile = async (userUuid: string) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}api/v1/masters/user-profile/?user_uuid=${userUuid}`, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data.result;
  } catch (error) {
    console.error('Error fetching masters:', error);
  }
};

const PrivacyPolicy = async ({params}:any) => {
  const slug = await params.slug;
  const userLastName = await params.name; 
  const response = await UserProfile(userLastName)
  
  
  return (
    <div><Privacy slug={slug} userLastName={userLastName} response={response}/></div>
  )
}

export default PrivacyPolicy