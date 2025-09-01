import React from 'react'
import { Title } from './Title/Title'
import { OfferWorkerCards } from './OfferCards/Card'
import { MobileBackTab } from './Title/MobileBackTab'
import axios from 'axios'
import { cookies } from 'next/headers'

const AppliedJobs = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}api/v1/masters/applied-jobs/`, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching jobs:', error);
  }
}


export const WorkerPage = async () => {
  const response = await AppliedJobs()
  return (
    <div className='layout-width sm:px-2'>
      <Title />
      <MobileBackTab />
      <OfferWorkerCards response={response}/>
    </div>
  )
}

