/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactStrictMode: false,

  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5001",
        pathname: "/uploads/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "api.internationalroboticscollege.com",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
