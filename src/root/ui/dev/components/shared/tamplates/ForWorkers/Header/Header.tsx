import React, { useState, ChangeEvent, FormEvent } from 'react';
import { cn } from '@/root/business/lib/utils';
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from '@/root/business/locales/i18n/routing';

interface Props {
    className?: string;
    activeTab?: string;
}

export const Header = ({ className, activeTab }: Props) => {
    const t = useTranslations('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [modalType, setModalType] = useState<'story' | 'video' | 'image' | null>(null);

    const handleOpenModal = (type: 'story' | 'video' | 'image') => {
        setModalType(type);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedFile(null);
        setModalType(null);
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log("Uploading file:", selectedFile);
        handleCloseModal();
    };

    const renderActionButton = () => {
        const buttons = {
            videolar: {
                icon: "/svg/aside/video.svg",
                iconActive: "/svg/aside/videoactive.svg",
                label: t("MyProfile.editButtons.addvideo"),
            },
            rasmlar: {
                icon: "/svg/aside/gallery.svg",
                iconActive: "/svg/aside/galleryactive.svg",
                label: t("MyProfile.editButtons.addpic"),
            },
        };

        const key = activeTab as keyof typeof buttons;
        if (!buttons[key]) return null;

        const { icon, iconActive, label } = buttons[key];

        return (
            <Link
                href="#"
                onClick={(e) => e.preventDefault()} // Modal ochilmasligi uchun
                className="group bg-maket-primary h-[42px] px-6 py-2 flex items-center gap-2 rounded-[16px] text-white border border-maket-primary hover:bg-white hover:text-maket-primary transition-colors"
            >
                <Image src={icon} alt="icon" width={20} height={20} className="group-hover:hidden" />
                <Image src={iconActive} alt="icon" width={20} height={20} className="hidden group-hover:block" />
                <span>{label}</span>
            </Link>
        );
    };

    return (
        <>
            <section className={cn(className, "w-full flex justify-between px-2 gap-4")}>
                <div className="flex gap-3">
                    <div className="rounded-full max-h-[84px] border-2 border-maket-green">
                        <div className="h-20 w-20 rounded-full relative border-2 border-white overflow-hidden">
                            <Image
                                src="/img/advertising/gas.png"
                                alt="Eshonov Baxodir"
                                fill
                                style={{ objectFit: "cover" }}
                                className="rounded-full"
                            />
                            <div className="absolute bottom-0 right-0 h-5 w-5 border-2 border-white rounded-full bg-maket-green" />
                        </div>
                    </div>
                    <div className="flex flex-col justify-between">
                        <h1 className="text-3xl font-semibold">Eshonov Baxodir</h1>
                        <p className="text-maket-gray">Santexnik</p>
                        <div className="flex items-center gap-1">
                            <div className="relative h-4 w-4">
                                <Image
                                    src="/svg/main/dailyWorkersCard/star-fill.svg"
                                    alt="Star"
                                    fill
                                    style={{ objectFit: "contain" }}
                                />
                            </div>
                            <p className="text-maket-primary">4.5</p>
                            <p className="text-sm text-maket-gray">
                                (30 {t("Main.sections.DailyWorkers.Card.comments")})
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4">
                    <Link
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handleOpenModal("story");
                        }}
                        className="group bg-white h-[42px] px-6 py-2 flex items-center gap-2 rounded-[16px] text-maket-primary border border-maket-primary hover:bg-maket-primary hover:text-white transition-colors"
                    >
                        <Image src="/svg/aside/add.svg" alt="Add" width={20} height={20} className="group-hover:hidden" />
                        <Image src="/svg/aside/add-white.svg" alt="Add" width={20} height={20} className="hidden group-hover:block" />
                        <span>{t('MyProfile.editButtons.addstory')}</span>
                    </Link>

                    {activeTab === "malumot" && (
                        <Link
                            href="myprofile/sss"
                            className="group bg-maket-primary h-[42px] px-6 py-2 flex items-center gap-2 rounded-[16px] text-white border border-maket-primary hover:bg-white hover:text-maket-primary transition-colors"
                        >
                            <Image src="/svg/tabbar/edit.svg" alt="Edit" width={20} height={20} className="group-hover:hidden" />
                            <Image src="/svg/tabbar/editactive.svg" alt="Edit" width={20} height={20} className="hidden group-hover:block" />
                            <span>{t('MyProfile.editButtons.changedata')}</span>
                        </Link>
                    )}

                    {renderActionButton()}
                </div>
            </section>

            {isModalOpen && modalType === 'story' && (
                <div
                    onClick={handleCloseModal}
                    className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white rounded-[20px] p-6 w-[50%] max-w-md"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">{t('MyProfile.editButtons.addstory')}</h2>
                            <button onClick={handleCloseModal} className="text-maket-gray hover:text-maket-primary">
                                ✕
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="cursor-pointer flex flex-col gap-2 items-center justify-center border border-dashed border-[#A1A1AA] rounded-xl py-6 text-gray-400 text-center">
                                    <Image src={"/svg/aside/icondesc.svg"} width={24} height={24} alt="logo" />
                                    {t('MyProfile.editButtons.storydescription')}
                                    <input
                                        id="file-upload"
                                        type="file"
                                        accept="video/*,image/*"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="px-4 py-2 text-maket-gray hover:text-maket-primary"
                                >
                                    {t('MyProfile.editButtons.back')}
                                </button>
                                <button
                                    type="submit"
                                    disabled={!selectedFile}
                                    className="px-4 py-2 bg-maket-primary text-white rounded-lg disabled:bg-maket-gray hover:bg-maket-primary-dark transition-colors"
                                >
                                    {t('MyProfile.editButtons.add')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};
