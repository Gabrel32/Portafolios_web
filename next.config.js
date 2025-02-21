module.exports = {
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false, // Evitar conflictos con Node.js
    };
    return config;
  },
};