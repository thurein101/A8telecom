import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com", // 🌟 FIX: Unsplash Image Links များအတွက် ခွင့်ပြုချက်ပေးရန်
      },
      
    ],
    
  },
 
};

export default nextConfig;
