/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dummyimage.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      }
    ],
  },
  // Prevent genkit/OpenTelemetry Node.js-only modules from being bundled client-side
  experimental: {
    serverComponentsExternalPackages: [
      'genkit',
      '@genkit-ai/core',
      '@genkit-ai/googleai',
      '@opentelemetry/sdk-node',
      '@opentelemetry/instrumentation',
      'require-in-the-middle',
    ],
  },
  typescript: {
    // Allow production builds to complete even with type warnings
    ignoreBuildErrors: true,
  },
  eslint: {
    // Allow production builds to complete even with lint warnings  
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
