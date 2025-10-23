// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.hidental.com",
        port: "", // optional
        pathname: "/uploads/**", // allow all images under /uploads
      },
    ],
  },
};

export default nextConfig;
