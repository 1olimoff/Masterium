import { Input } from '@/root/ui/dev/shadcn/ui/input'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React from 'react'

function InputArea() {
    const t = useTranslations("Aside")
  return (
    <div className="relative flex-1 min-w-0">
                        <Image
                            src="/svg/aside/search.svg"
                            alt="Search Icon"
                            width={20}
                            height={20}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        />
                        <Input
                            type="search"
                            placeholder={t('search.placeholder')}
                            className="pl-10 pr-4 rounded-lg border-[#CFD9FE]  border-2 w-full"
                        />
                    </div>
  )
}

export default InputArea