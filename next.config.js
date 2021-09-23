/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) config.resolve.fallback.fs = false;
    return config;
  },
};

const withTM = require("next-transpile-modules")(["three"]);

module.exports = withTM();
module.exports = nextConfig;
