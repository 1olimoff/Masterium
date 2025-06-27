import { cn } from "@/root/business/lib/utils";
import { Input } from "@/root/ui/dev/shadcn/ui/input";
import { useTranslations } from "next-intl";
import { PhoneCheck } from "./Contact.component.tsx/component";
import { Link } from "@/i18n/routing";

interface Props {
    className?: string;
}

export const Contact = ({ className }: Props) => {
    const t = useTranslations("OfferWork");

    return (
        <div>
            <div className="p-5 bg-white m-3 flex flex-col lg:flex-row gap-6 rounded-[20px] px-4">
                {/* Chap qism */}
                <div className="w-full">
                    <div className="mt-3">
                        <h2 className="text-xl font-bold text-[#001D55]">
                            {t("Contacts.title")}
                        </h2>
                        <p className="text-[14px] mt-[6px] font-normal text-[#001D55]">
                            {t("Contacts.callPerson")}
                        </p>
                        <Input
                            placeholder={t("Contacts.callPersonPlaceholder")}
                            className="w-full sm:w-[75%] mt-[5px]"
                        />
                    </div>

                    <div className="mt-3 gap-2">
                        <p className="text-[14px] mt-[2px] font-normal text-[#001D55]">
                            {t("Contacts.phone")}
                        </p>
                        <PhoneCheck />
                    </div>

                    <div className="mt-3">
                        <p className="text-[14px] mt-[2px] font-normal text-[#001D55]">
                            {t("Contacts.location")}
                        </p>
                        <Input
                            placeholder={t("Contacts.locationPlaceholder")}
                            className="w-full sm:w-[75%] mt-[5px]"
                        />
                    </div>
                </div>

                {/* O'ng qism - Google map */}
                <div className={cn(className, "w-full flex max-w-full lg:max-w-[400px] flex-col gap-3")}>
                    <p className="text-xl uppercase font-semibold">
                        {t("Contacts.selectLocation")}
                    </p>

                    <div className="w-full" style={{ position: "relative", paddingBottom: "56.25%" }}>
                        <iframe
                            title="Google map location"
                            aria-label="Google map for the location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23968.123231574384!2d69.2518912!3d41.3302784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b2931f41f23%3A0x81095e06b654b845!2z0KHQutCy0LXRgCDQkNC80LjRgNCwINCi0LXQvNGD0YDQsA!5e0!3m2!1sru!2s!4v1738616772427!5m2!1sru!2s"
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                border: 0,
                                borderRadius: 15,
                            }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
            </div>

            {/* Tugmalar */}
            <div className="flex flex-col sm:flex-row justify-end gap-4 mt-6 p-5 bg-white m-3 rounded-[20px] px-4">
                <Link href="services/service">
                    <button className="w-full sm:w-auto py-[12px] px-[42px] bg-[#F8F9FA] text-[#677294] rounded-[16px] cursor-pointer">
                        {t("Contacts.buttons.cancelBtn")}
                    </button>
                </Link>
                <Link href="offer-works/privacy">
                    <button className="w-full sm:w-auto py-[12px] px-[52px] bg-[#001D55] text-white rounded-[16px] cursor-pointer">
                        {t("Contacts.buttons.submitBtn")}
                    </button>
                </Link>
            </div>
        </div>
    );
};
