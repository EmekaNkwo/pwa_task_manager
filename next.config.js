const withPWA = require("next-pwa")({
  dest: "public",
  cacheOnFrontEndNav: true,
  reloadOnOnline: true,
  disable: false,
  register: true,
});

module.exports = withPWA({
  // next.js config
  images: {
    domains: ["www.w3schools.com"],
    formats: ["image/avif", "image/webp"],
  },
});
