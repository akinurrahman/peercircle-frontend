/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
        pathname: "/**", // Allow any path on this hostname
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**", // Allow any path on this hostname
      },
    ],
  },
};

export default nextConfig;
