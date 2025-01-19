import React from 'react';
import {cn} from '@lib/utils';
import {useTranslations} from "next-intl";

//shadcn
import {Dialog, DialogContent, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";


interface Props {
    className?: string;
    children?: React.ReactNode;
}

export const LoginProviderDialog = ({className, children}: Props) => {
    const t = useTranslations("Account")
    return (
        <div className={cn(className)}>
            <Dialog>
                <DialogTrigger>
                    {children}
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle>
                        <h3 className={"text-2xl text-center"}>
                            {t('login.title')}
                        </h3>
                    </DialogTitle>
                    <div>
                        <div className={"flex flex-col gap-4"}>
                            <div className={"flex flex-col gap-1"}>
                                <p className={"text-sm"}>{t('login.inputs.phone.title')}</p>
                                <Input className={"border-[#CFD9FE] rounded-xl text-[#677294] placeholder-[#677294]"} placeholder={t('login.inputs.phone.placeholder')}/>
                            </div>
                            <div className={"flex flex-col gap-1"}>
                                <p className={"text-sm"}>{t('login.inputs.password.title')}</p>
                                <Input className={"border-[#CFD9FE] rounded-xl text-[#677294] placeholder-[#677294]"} placeholder={t('login.inputs.password.placeholder')}/>
                            </div>
                        </div>
                        <p className={"my-4 text-sm font-thin text-end"}>{t('login.forget')}</p>
                        <Button className={"w-full bg-maket-primary hover:bg-blue-900 text-lg rounded-xl py-6"}>
                            {t('login.button')}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};
