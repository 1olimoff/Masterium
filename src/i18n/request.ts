import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

export default getRequestConfig(async ({ locale }) => {
  if (!locale || !['ru', 'uz'].includes(locale)) {
    notFound();
  }

  return {
    messages: (await import(`../root/business/data/messages/${locale}.json`)).default,
  };
});