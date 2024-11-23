// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Place your config options here
  swcMinify: true, // Use SWC minifier (optional)
  eslint: {
    ignoreDuringBuilds: true, // Disable ESLint during production builds (optional)
  },
};

export default nextConfig;
