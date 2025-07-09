import React from 'react'
import { Title } from './Title/Title'
import { OfferWorkerCards } from './OfferCards/Card'
import { MobileBackTab } from './Title/MobileBackTab'

export const WorkerPage = () => {
  return (
    <div className='layout-width sm:px-2'>
        <Title />
        <MobileBackTab />
        <OfferWorkerCards />
    </div>
  )
}

