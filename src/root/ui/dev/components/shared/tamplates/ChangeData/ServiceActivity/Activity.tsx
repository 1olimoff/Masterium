import React from 'react'
import { useTranslations } from 'next-intl';
import FilterBar from '../PersonalDetails/FilterBar/FilterBar';

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

    const t = useTranslations("ChangeData.ServiceActivity")

    return (
        <div className=' mx-auto px-2 mb-6 space-y-4'>
            <div className="bg-white p-6 rounded-xl mt-8 shadow-sm">
                <h1 className="text-2xl font-bold">{t("title")}</h1>

                <div className='grid mt-4 grid-cols-1 md:grid-cols-3 gap-4'>

                    <FilterBar
                        label={t("Inputs.serviceType")}
                        options={catalogs}
                        placeholder={t("Inputs.serviceTypeplaceholder")}
                    />
                    <FilterBar
                        label={t("Inputs.workExperience")}
                        options={experience}
                        placeholder={t("Inputs.workExperienceplaceholder")}
                    />
                    <FilterBar
                        label={t("Inputs.Tags")}
                        options={tags}
                        placeholder={t("Inputs.Tagsplaceholder")}
                    />
                    <FilterBar
                        label={t("Inputs.Country")}
                        options={countries}
                        placeholder={t("Inputs.Countryplaceholder")}
                    />
                    <FilterBar
                        label={t("Inputs.region")}
                        options={regions}
                        placeholder={t("Inputs.regionplaceholder")}
                    />
                    <FilterBar
                        label={t("Inputs.District")}
                        options={districts}
                        placeholder={t("Inputs.Districtplaceholder")}
                    />
                </div>
            </div>
        </div>
    )

}
