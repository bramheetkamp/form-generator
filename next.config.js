/** @type {import('next').NextConfig} */

const baseConfigs = {
  output: 'export',
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_CROSS_SITE_COOKIES: process.env.NEXT_PUBLIC_CROSS_SITE_COOKIES,
    NEXT_PUBLIC_PROTO: process.env.NEXT_PUBLIC_PROTO,
  },
};

module.exports = baseConfigs;
