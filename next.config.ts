import type { NextConfig } from "next";

const strapiHostname = (() => {
  try {
    const url = process.env.NEXT_PUBLIC_STRAPI_URL || "";
    return url ? new URL(url).hostname : undefined;
  } catch {
    return undefined;
  }
})();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: strapiHostname
      ? [
          {
            protocol: "https",
            hostname: strapiHostname,
          },
        ]
      : [],
  },
};

export default nextConfig;
