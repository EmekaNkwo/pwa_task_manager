const withPWA = require("next-pwa")({
  dest: "public",
  cacheOnFrontEndNav: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = withPWA(nextConfig);
module.exports = {
  // next.js config
  images: {
    domains: ["www.w3schools.com"],
    formats: ["image/avif", "image/webp"],
  },
};
