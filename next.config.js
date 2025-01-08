/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config,{ isServer }) => {
    config.externals.push({
      "utf-8-validate": "commonjs utf-8-validate",
      bufferutil: "commonjs bufferutil"
    });
    if (!isServer) {
      // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
      config.resolve.fallback = {
          fs: false
      };
  }
    return config;
  },
    images: {
      domains: [
        "googleusercontent.com",
        "oaidalleapiprodscus.blob.core.windows.net",
        "cdn.openai.com"
      ]
    },
  }
  
  module.exports = nextConfig