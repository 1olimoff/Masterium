import React from 'react';
import { cn } from '@/root/business/lib/utils';
import { useTranslations } from 'next-intl';

interface Props {
    className?: string;
}

export const Location = ({ className }: Props) => {
    const t = useTranslations();

    return (
        <div className={cn(className, "w-full max-w-[400px] flex flex-col gap-3")}>
            <p className="text-xl uppercase font-semibold">
                {t('WorksPage.content.location.title')}
            </p>

            {/* Responsive container */}
            <div className={"w-[330px]"} style={{ position: 'relative', paddingBottom: '56.25%'}}>
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
    );
};
