import React from 'react'
import { Title } from './Title/Title'
import { DetailsPage } from './PersonalDetails/Details'
import ActivityPage from './ServiceActivity/Activity'

export const ChangeData = () => {
  return (
    <div>
      <Title />
      <DetailsPage />
      <ActivityPage catalogs={["Usta", "Tarjimon", "Dizayner"]}
        experience={["1 yil", "3 yil", "5+ yil"]}
        tags={["HTML", "CSS", "React"]}
        countries={["O'zbekiston", "Qozog'iston"]}
        regions={["Toshkent", "Samarqand"]}
        districts={["Chilonzor", "Yunusobod"]}
      />
    </div>
  )
}
