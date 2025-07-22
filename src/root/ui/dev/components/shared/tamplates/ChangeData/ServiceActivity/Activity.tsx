import React from 'react'
import { useTranslations } from 'next-intl';
import FilterBar from '../PersonalDetails/FilterBar/FilterBar';
import Link from 'next/link';
import ServerLink from '../../../elements/Links/ServerLink';

interface Props {
    catalogs: string[];
    experience: string[];
    tags: string[];
    countries: string[];
    regions: string[];
    districts: string[];
}


export default function ActivityPage({ catalogs,
    experience,
    tags,
    countries,
    regions,
    districts }: Props) {

    const t = useTranslations("")

    return (
        <div className=' mx-auto px-2 mb-6 space-y-4'>
            <div className="bg-white p-6 rounded-xl mt-8 shadow-sm">
                <h1 className="text-2xl font-bold">{t("ChangeData.ServiceActivity.title")}</h1>

                <div className='grid mt-4 grid-cols-1 md:grid-cols-3 gap-4'>

                    <FilterBar
                        label={t("ChangeData.ServiceActivity.Inputs.serviceType")}
                        options={catalogs}
                        placeholder={t("ChangeData.ServiceActivity.Inputs.serviceTypeplaceholder")}
                    />
                    <FilterBar
                        label={t("ChangeData.ServiceActivity.Inputs.workExperience")}
                        options={experience}
                        placeholder={t("ChangeData.ServiceActivity.Inputs.workExperienceplaceholder")}
                    />
                    <FilterBar
                        label={t("ChangeData.ServiceActivity.Inputs.Tags")}
                        options={tags}
                        placeholder={t("ChangeData.ServiceActivity.Inputs.Tagsplaceholder")}
                    />
                    <FilterBar
                        label={t("ChangeData.ServiceActivity.Inputs.Country")}
                        options={countries}
                        placeholder={t("ChangeData.ServiceActivity.Inputs.Countryplaceholder")}
                    />
                    <FilterBar
                        label={t("ChangeData.ServiceActivity.Inputs.region")}
                        options={regions}
                        placeholder={t("ChangeData.ServiceActivity.Inputs.regionplaceholder")}
                    />
                    <FilterBar
                        label={t("ChangeData.ServiceActivity.Inputs.District")}
                        options={districts}
                        placeholder={t("ChangeData.ServiceActivity.Inputs.Districtplaceholder")}
                    />
                </div>

                <div>
                    <div className="flex flex-col  sm:flex-row items-center rounded-xl bg-white sm:justify-end gap-4 py-4 px-6 mt-6">
                        <ServerLink path="" className="w-full sm:w-auto">
                            <button className="w-full sm:w-auto py-[12px] px-[42px] bg-[#F8F9FA] text-[#677294] rounded-[16px] cursor-pointer">
                                {t("ChangeData.ServiceActivity.Btn.cancelbtn")}
                            </button>
                        </ServerLink>
                        <ServerLink path={""} className="w-full sm:w-auto">
                            <button className="w-full sm:w-auto py-[12px] px-[52px] bg-[#001D55] text-white rounded-[16px] cursor-pointer">
                                {t("ChangeData.ServiceActivity.Btn.savebtn")}
                            </button>
                        </ServerLink>
                    </div>
                </div>
            </div>
        </div>
    )

}
