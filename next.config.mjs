/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/**", // allows all paths from Pexels
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**", // allows all paths from Cloudinary
      },
      {
        protocol: "https",
        hostname: "example.com",
        pathname: "/**", // allows all paths from example.com
      },
    ],
  },
};

export default nextConfig;
