    import createNextIntlPlugin from 'next-intl/plugin';

    const withNextIntl = createNextIntlPlugin();

    /** @type {import('next').NextConfig} */
    const nextConfig = {
        reactStrictMode: true,
        images: {
            domains: [new URL(process.env.NEXT_PUBLIC_BASE_URL).hostname], // Tashqi domenni qo‘shing
            formats: ['image/webp'],
          },
    };

    export default withNextIntl(nextConfig);
