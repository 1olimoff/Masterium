"use client"

import React from 'react'
import InputArea from '../Aside/InputArea/InputArea'
import Image from 'next/image';
import { useTranslations } from 'next-intl';

function Catalogs() {
    const t = useTranslations("Aside");

    return (
        <div className='flex sm:hidden flex-col justify-center  bg-[#ffff] items-center w-full max-w-[1000px]'>
            <div className='sm:hidden w-full flex'>
                <InputArea />
            </div>

            <div className="flex  flex-col w-full gap-2 mt-4 bg-[#ffff]   sm:max-w-full  rounded-lg shadow-md overflow-hidden">
                {[...Array(10)].map((_, idx) => (
                    <div
                        key={idx}
                        className="flex items-center shadow  bg-[#ffff]  gap-4 rounded-[10px] py-2 px-3 hover:bg-gray-200 cursor-pointer transition-colors duration-150"
                    >
                        <Image
                            src="/svg/aside/tech.svg"
                            alt="Tech Icon"
                            width={18}
                            height={18}
                        />
                        <span className="text-lg   text-gray-900">Santehniklar</span>
                    </div>
                ))}
            </div>


        </div>
    )
}

export default Catalogs