/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['res.cloudinary.com'], // Add Cloudinary to allowed domains
	},
};

export default nextConfig;
