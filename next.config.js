/** @type {import('next').NextConfig} */

const loadEnv = () => {
  const envWiseContent = require(`./env/env.production`);
  Object.entries({ ...envWiseContent }).forEach(([key, val]) => {
    process.env[key] = val;
    console.log(`[ENVIRONMENT VARIABLE LOAD] ${key}=${val}`);
  });
};

loadEnv();

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
