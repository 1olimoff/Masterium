"use client"
import { Button } from "@/root/ui/dev/shadcn/ui/button"
import { Calendar } from "@/root/ui/dev/shadcn/ui/calendar"
import { Input } from "@/root/ui/dev/shadcn/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/root/ui/dev/shadcn/ui/popover"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { format, parse } from "date-fns";
import { toast } from "@/root/business/hooks/use-toast"

export const DetailsPage = () => {
    const t = useTranslations("")
    const inputRef = useRef<HTMLInputElement>(null)
    const [preview, setPreview] = useState<string | null>(null)
    const [dateFrom, setDateFrom] = useState<Date | undefined>(undefined);
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [phone, setPhone] = useState("");




    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const url = URL.createObjectURL(file)
            setPreview(url)
        }
    }




    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Avtomatik bugungi sana bilan boshlanishi
    useEffect(() => {
        if (!dateFrom) {
            setDateFrom(today);
        }
    }, [dateFrom, setDateFrom]);


    return (
        <div className=" mx-auto px-2 space-y-4">
            <h1 className="text-2xl hidden sm:flex font-bold">{t("ChangeData.title")}</h1>

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
                        className="relative w-32 h-32 border-2 border-dashed rounded-full overflow-hidden cursor-pointer bg-gray-100 hover:bg-gray-200 transition"
                    >
                        <Image
                            src={preview || "/img/advertising/user.png"}
                            alt="Profile"
                            fill
                            className={`${preview ? "object-cover" : "object-contain p-6"} transition-all duration-300`}
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
                            {t("ChangeData.PersonalDetails.Inputs.phoneInp")}
                        </label>
                        <Input
                            type="text" // telefon raqami uchun text, keyin validatsiya qilamiz
                            placeholder={t("ChangeData.PersonalDetails.Inputs.phoneplaceholder")}
                            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-1 focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
                            value={phone}
                            onChange={async (e) => {
                                const inputValue = e.target.value;
                                const isOnlyNumbers = /^\d*$/.test(inputValue);

                                if (!isOnlyNumbers) {
                                    toast({
                                        description: t("OfferWork.PriceandInfo.Btn.Price.error.title"), // masalan: "Iltimos, faqat raqam kiriting"
                                    });
                                    return;
                                }

                                setPhone(inputValue);
                            }}
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
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full py-4 px-4 text-left text-md border border-[#CFD9FE] rounded-xl flex justify-between items-center text-[#6B7280]"
                                >
                                    {dateFrom ? format(dateFrom, "dd.MM.yyyy") : "kk.oo.yyyy"}
                                    <Image
                                        src="/svg/open-works/calendar.svg"
                                        alt="Calendar icon"
                                        width={20}
                                        height={20}
                                    />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="p-2 w-auto" align="start">
                                <Calendar
                                    mode="single"
                                    selected={dateFrom}
                                    onSelect={(day) => {
                                        if (day) {
                                            setDateFrom(day);
                                        }
                                    }}
                                    captionLayout="dropdown"
                                    fromYear={1900}
                                    toYear={new Date().getFullYear()}
                                    initialFocus
                                    onMonthChange={(newMonth) => {
                                        // newMonth bu Date (oy boshi)
                                        // avtomatik 1-kunni tanlaymiz
                                        const autoSelectDate = new Date(newMonth.getFullYear(), newMonth.getMonth(), 1);
                                        setDateFrom(autoSelectDate);
                                    }}
                                />


                            </PopoverContent>
                        </Popover>
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
                        className="w-full border rounded-lg p-2 bg-[#F8F9FA] focus:outline-none focus:ring-2 focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
                    />

                </div>
            </div>
        </div>
    )
}
