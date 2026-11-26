/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
/** Prefer CI env; fall back to GITHUB_REPOSITORY (owner/name) or main repo name */
const repoFromGithub = process.env.GITHUB_REPOSITORY?.split("/")[1];
const repoName = repoFromGithub || "Tapsy-website";
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (isProd && !process.env.CUSTOM_DOMAIN ? `/${repoName}` : "");

const nextConfig = {
  output: "export",
  basePath: basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  reactStrictMode: true,
  images: {
    unoptimized: true,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
