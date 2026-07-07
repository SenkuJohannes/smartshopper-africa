import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // TEMPORARY: Allow deployment even if TypeScript has errors.
  // Remove this once the project has been fully cleaned up.
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;