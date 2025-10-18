/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // allow Cloudinary host so next/image accepts res.cloudinary.com URLs
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
