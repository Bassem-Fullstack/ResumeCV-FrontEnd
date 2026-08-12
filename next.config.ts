/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*", // أي طلب يبدأ بـ api/
        destination: "https://resume-cv-backend-nou7.vercel.app/:path*", // سيتحول لرابط الباك إند الحقيقي
      },
    ];
  },
};

export default nextConfig;
