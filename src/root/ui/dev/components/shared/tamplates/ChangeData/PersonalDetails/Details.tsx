"use client"
import { Input } from "@/root/ui/dev/shadcn/ui/input"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { useRef, useState } from "react"

export const DetailsPage = () => {
    const t = useTranslations("")
    const inputRef = useRef<HTMLInputElement>(null)
    const [preview, setPreview] = useState<string | null>(null)


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const url = URL.createObjectURL(file)
            setPreview(url)
        }
    }


    return (
        <div className=" mx-auto px-2 space-y-4">
            <h1 className="text-2xl font-bold">{t("ChangeData.title")}</h1>

            <div className="bg-white rounded-xl py-6 px-6 shadow-sm space-y-4">
                {/* Section Title */}
                <div>
                    <h3 className="text-xl font-semibold">
                        {t("ChangeData.PersonalDetails.title")}
                    </h3>
                </div>

                {/* Profile Photo Upload */}
                <div className="flex gap-6 items-start">
                    <div
                        onClick={() => inputRef.current?.click()}
                        className="relative w-32 h-32 border-2 border-dashed rounded-full overflow-hidden cursor-pointer bg-gray-50 flex items-center justify-center"
                    >
                        <Image
                            src={preview || "/img/advertising/user.png"}
                            alt="Profile"
                            fill
                            className="object-cover p-6"
                        />
                        <Input
                            ref={inputRef}
                            type="file"
                            accept="image/png, image/jpeg, image/jpg"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </div>
                    <div>
                        <h4 className="text-base font-semibold">
                            {t("ChangeData.PersonalDetails.uploadphototitle")}
                        </h4>
                        <p className="text-sm max-w-[350px] text-muted-foreground">
                            {t("ChangeData.PersonalDetails.uploadphotodescription")}
                        </p>
                    </div>
                {/* </div> */}

                </div>

                {/* Form Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            {t("ChangeData.PersonalDetails.Inputs.nameInp")}
                        </label>
                        <Input
                            type="text"
                            placeholder={t("ChangeData.PersonalDetails.Inputs.nameplaceholder")}
                            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-1 transition  focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            {t("ChangeData.PersonalDetails.Inputs.surnameInp")}
                        </label>
                        <Input
                            type="text"
                            placeholder={t("ChangeData.PersonalDetails.Inputs.surnameplaceholder")}
                            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-1 focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"

                        />
                    </div>

                    <div>
                         <label className="block text-sm font-medium mb-1">
                            {t("ChangeData.PersonalDetails.Inputs.fatherNameInpt")}
                        </label>
                        <Input
                            type="text"
                            placeholder={t("ChangeData.PersonalDetails.Inputs.fathernameplaceholder")}
                            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-1 focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"

                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            {t("ChangeData.PersonalDetails.Inputs.phoneplaceholder")}
                        </label>
                        <Input
                            type="tel"
                            placeholder={t("ChangeData.PersonalDetails.Inputs.phoneplaceholder")}
                            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-1 focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"

                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            {t("ChangeData.PersonalDetails.Inputs.additionalPhone")}
                        </label>
                        <Input
                            type="tel"
                            placeholder={t("ChangeData.PersonalDetails.Inputs.additionalPhoneplaceholder")}
                            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            {t("ChangeData.PersonalDetails.Inputs.emailInp")}
                        </label>
                        <Input
                            type="email"
                            placeholder={t("ChangeData.PersonalDetails.Inputs.emailplaceholder")}
                            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            {t("ChangeData.PersonalDetails.Inputs.passport")}
                        </label>
                        <Input
                            type="text"
                            placeholder="AA 1234567"
                            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            {t("ChangeData.PersonalDetails.Inputs.BirthInpt")}
                        </label>
                        <Input
                            type="date"
                            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
                        />
                    </div>
                </div>

                {/* About Yourself */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        {t("ChangeData.PersonalDetails.Inputs.AboutYourself")}
                    </label>
                    <textarea
                        rows={4}
                        placeholder={t("ChangeData.PersonalDetails.Inputs.AboutYourselfDesc")}
                        className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
                    />
                </div>
            </div>
        </div>
    )
}
