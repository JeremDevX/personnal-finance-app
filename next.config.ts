import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    silenceDeprecations: ["mixed-decls", "legacy-js-api"],
  },
};

export default nextConfig;
