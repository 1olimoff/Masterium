// src/i18n/request.ts
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

const locales = ['ru', 'uz'];

const requestConfig = async () => {
  const headersList = await import('next/headers').then(mod => mod.headers());
  const headerLocale =  headersList.get('X-NEXT-INTL-LOCALE');

  if (!headerLocale || !locales.includes(headerLocale)) {
    notFound();
  }

  return {
    messages: (await import(`../root/business/data/messages/${headerLocale}.json`)).default,
  };
};

export default getRequestConfig(requestConfig);
