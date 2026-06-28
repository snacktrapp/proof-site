/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/rat",
        destination: "https://proof.verifiedeffort.com/rat",
      },
      {
        source: "/rat/:path*",
        destination: "https://proof.verifiedeffort.com/rat/:path*",
      },
      {
        source: "/_app/:path*",
        destination: "https://proof.verifiedeffort.com/_app/:path*",
      },
    ];
  },
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
