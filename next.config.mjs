import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['ak-d.tripcdn.com', 'another-domain.com'],
    },
    sassOptions: {
        includePaths: [path.resolve("styles")], 
    }
};

export default nextConfig;
