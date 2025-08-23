import React from 'react'
import InputArea from '../Aside/InputArea/InputArea'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import ServerLink from '../../elements/Links/ServerLink'


interface Category {
  name: string
  icon: string
  id: number
  slug: string
}

interface Props {
  response: Category[]
}

async function Catalogs({ response }: Props) {
  const t = useTranslations("Aside")

  return (
    <div className="flex sm:hidden flex-col justify-center bg-[#ffff] items-center px-2 w-full max-w-[1000px]">
      {/* Search/Input */}
      <div className="sm:hidden w-full flex">
        <InputArea />
      </div>

      <div className="flex flex-col w-full gap-2 mt-4 bg-[#ffff] sm:max-w-full rounded-lg shadow-md overflow-hidden">
        {response.map((category) => (
          <ServerLink
            key={category.id}
            path={`services/${category.slug}`}
            className="flex items-center shadow bg-[#ffff] gap-4 rounded-[10px] py-2 px-3 hover:bg-gray-200 cursor-pointer transition-colors duration-150"
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_URL}${category.icon}`}
              alt={"category.name"}
              width={22}
              height={22}
            />
            <span className="text-lg text-gray-900">{category.name}</span>
          </ServerLink>
        ))}
      </div>
    </div>
  )
}

export default Catalogs
