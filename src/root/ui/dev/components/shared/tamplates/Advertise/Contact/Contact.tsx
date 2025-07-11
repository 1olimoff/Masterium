import { cn } from "@/root/business/lib/utils";
import { Input } from "@/root/ui/dev/shadcn/ui/input"
import { useTranslations } from "next-intl"
import { PhoneCheck } from "./ContactComponent/Component";
import { Link } from "@/i18n/routing";

interface Props {
    className?: string;
}

export const Contact = ({ className }: Props) => {
    const t = useTranslations("OfferWork");

    return (
        <div className="space-y-4">
            {/* Main Contact Form */}
            <div className="bg-white m-3 rounded-[20px] p-5 flex flex-col lg:flex-row gap-6">
                {/* Left Column */}
                <div className="w-full lg:w-1/2 space-y-4">
                    <div>
                        <h2 className="text-xl font-bold text-[#001D55]">{t("Contacts.title")}</h2>
                        <p className="text-sm mt-1 text-[#001D55]">{t("Contacts.callPerson")}</p>
                        <Input
                            placeholder={t("Contacts.callPersonPlaceholder")}
                            className="w-full mt-2"
                        />
                    </div>

                    <div>
                        <p className="text-sm mt-1 text-[#001D55]">{t("Contacts.phone")}</p>
                        <PhoneCheck />
                    </div>

                    <div>
                        <p className="text-sm mt-1 text-[#001D55]">{t("Contacts.location")}</p>
                        <Input
                            placeholder={t("Contacts.locationPlaceholder")}
                            className="w-full mt-2"
                        />
                    </div>
                </div>

                {/* Right Column */}
                <div className={cn(className, "w-full lg:w-1/2 flex flex-col gap-3")}>
                    <p className="text-sm sm:text-xl uppercase font-semibold">{t("Contacts.selectLocation")}</p>

                    <div className="w-full" style={{ position: 'relative', paddingBottom: '56.25%' }}>
                        <iframe
                            title="Google map location"
                            aria-label="Google map for the location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23968.123231574384!2d69.2518912!3d41.3302784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b2931f41f23%3A0x81095e06b654b845!2z0KHQutCy0LXRgCDQkNC80LjRgNCwINCi0LXQvNGD0YDQsA!5e0!3m2!1sru!2s!4v1738616772427!5m2!1sru!2s"
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                border: 0,
                                borderRadius: 15
                            }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex  sm:flex-row justify-end gap-4  p-5 bg-white m-3 rounded-[20px]">
                <Link href={"/"} className="py-3 px-6 bg-[#F8F9FA] text-[#677294] rounded-[16px]">{t("Contacts.buttons.cancelBtn")}</Link>
                <Link href={"myads"} className="py-3 px-6 bg-[#001D55] text-white rounded-[16px]">{t("Advertise.Buttons.GiveAdvertise")}</Link>
            </div>
        </div>
    );
};
