    import createNextIntlPlugin from 'next-intl/plugin';

    const withNextIntl = createNextIntlPlugin();

    /** @type {import('next').NextConfig} */
    const nextConfig = {
        reactStrictMode: true,
        images: {
            domains: ["cdn.masterium.uz"], // Tashqi domenni qo‘shing
          },
    };

    export default withNextIntl(nextConfig);
