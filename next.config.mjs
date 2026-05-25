/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/start",
        destination: "https://proof.verifiedeffort.com/auth/register",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
