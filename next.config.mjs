 /** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["cdn.sanity.io"],
    },
    env: {
        NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
        SANITY_API_TOKEN: process.env.SANITY_API_TOKEN, // ✅ Add this
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY, // ✅ Add this
        CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY, // ✅ Add this
    },
};

export default nextConfig;
