/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ytvgqifeoemzwknioxpv.supabase.co",
        port: "", // Leave empty as no specific port is used
        pathname: "/storage/v1/object/public/cabin-images/**", // Matches your bucket path'
        search: "",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      }
    ],
  },
};

export default nextConfig;
