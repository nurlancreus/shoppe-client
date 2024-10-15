/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["via.placeholder.com"], // Add any other domains if necessary
    remotePatterns: [
      {
        protocol: "https",
        hostname: `${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_S3_REGION}.amazonaws.com`,
        port: "",
        //pathname: `/${process.env.NEXT_PUBLIC_S3_IMAGE_PATH}`,
      },
    ],
  },
  
};

export default nextConfig;
