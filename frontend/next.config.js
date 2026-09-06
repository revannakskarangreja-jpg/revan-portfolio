/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['your-project.supabase.co','images.supabase.co']
  }
}
module.exports = nextConfig;
