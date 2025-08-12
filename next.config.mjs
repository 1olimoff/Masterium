    import createNextIntlPlugin from 'next-intl/plugin';

    const withNextIntl = createNextIntlPlugin();

    /** @type {import('next').NextConfig} */
    const nextConfig = {
        reactStrictMode: true,
        images: {
            // domains: [new URL(process.env.NEXT_PUBLIC_BASE_URL).hostname], // Tashqi domenni qo‘shing
            formats: ['image/webp'],
            domains: ['image-placeholder.com', 'cdn.masterium.uz'], // Rasml
          },
    };

    export default withNextIntl(nextConfig);
