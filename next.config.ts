import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	reactStrictMode: false,

	// 연결되어 있는 도메인이 확정되지 않은 관계로 모든 hostName에 대한 접근을 임시로 허용함
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},
		],
	},
	// 실 데이터가 들어간 이후 설정 필요
	// images: {
	//   domains: ["localhost", "*", "storage.googleapis.com", "picsum.photos"],
	// },
	experimental: {
		// nodeMiddleware: true,
	},
};

export default nextConfig;
