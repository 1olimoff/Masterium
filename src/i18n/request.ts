import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

export default getRequestConfig(async ({locale}) => {
    // Валидация локали
    if (!routing.locales.includes(locale as never)) notFound();

    return {
        // Загружаем сообщения для текущей локали
        messages: (await import(`../root/business/data/messages/${locale}.json`)).default,
    };
});
