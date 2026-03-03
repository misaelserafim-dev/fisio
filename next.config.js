/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    serverActions: {
      bodySizeLimit: "200mb"
    }
  },
  sassOptions: {
    silenceDeprecations: ["legacy-js-api", "import", "global-builtin"],
    prependData: `
    @use "@/scss/base/typography.scss" as *;
    @use "@/scss/base/responsives.scss" as *;
    @use "@/scss/theme/colors.scss" as *;
    @use "@/scss/theme/spacing.scss" as *;
    @use "@/scss/theme/animations.scss" as *;
    @use "@/scss/mixin.scss" as *;`
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**"
      },
      {
        protocol: "http",
        hostname: "**"
      }
    ],
    deviceSizes: [768, 1366, 1920],
    qualities: [25, 50, 75, 100]
  },

  async headers() {
    return [
      {
        source: "/(.*)", // Apply these headers to all routes
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin"
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "cross-origin"
          },
          // Disable browser caching
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate, proxy-revalidate"
          },
          {
            key: "Pragma",
            value: "no-cache"
          },
          {
            key: "Expires",
            value: "0"
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;
