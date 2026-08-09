import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'ik.imagekit.io' }],
    // How long Next keeps an optimized image in its own on-disk cache before
    // re-encoding it. Default 60s is needlessly short for assets that only
    // change on redeploy. (Note: for images under /public this does not change
    // the browser's Cache-Control, which stays max-age=60, must-revalidate --
    // repeat views revalidate and get a 304, so no bytes are re-downloaded.)
    minimumCacheTTL: 60 * 60 * 24,
  },
};

export default nextConfig;
