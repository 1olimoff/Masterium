import React from 'react'
import { Title } from './Title/Title'
import { DetailsPage } from './PersonalDetails/Details'
import ActivityPage from './ServiceActivity/Activity'
import { MobileBackTab } from './Title/MobileTabBar'

export const ChangeData = () => {
  return (
    <div >
      <Title />
      <MobileBackTab />
      <div className='px-2'>

        <DetailsPage />
        <ActivityPage catalogs={["Usta", "Tarjimon", "Dizayner"]}
          experience={["1 yil", "3 yil", "5+ yil"]}
          tags={["HTML", "CSS", "React"]}
          countries={["O'zbekiston", "Qozog'iston"]}
          regions={["Toshkent", "Samarqand"]}
          districts={["Chilonzor", "Yunusobod"]}
        />
      </div>
    </div>
  )
}
