import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import { headers } from 'next/headers'; 

export default getRequestConfig(async () => {
  const header = await headers();
  const localeFromHeader = header.get('x-next-intl-locale');
  const currentLocale = localeFromHeader || routing.defaultLocale;

  try {
    const messages = (await import(`../root/business/data/messages/${currentLocale}.json`)).default;
    return {
      locale: currentLocale,
      messages,
    };
  } catch (error) {
    console.error('Error loading messages:', error);
    return {
      locale: routing.defaultLocale,
      messages: (await import(`../root/business/data/messages/${routing.defaultLocale}.json`)).default,
    };
  }
});