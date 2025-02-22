import { isServer } from '@tanstack/react-query';

export default function getBaseUrl() {
	if (isServer) {
		// ✅ 서버 환경 (Next.js API Route, SSR 등)
		if (process.env.NODE_ENV === 'production') {
			return process.env.NEXT_PUBLIC_PRODUCTION_URL || 'https://your-production-url.com';
		} else if (process.env.NODE_ENV === 'development') {
			return process.env.NEXT_PUBLIC_DEVELOPMENT_URL || 'http://localhost:3000';
		}

		// ✅ 기본값 (예외 처리)
		return 'http://localhost:3000';
	} else {
		if (typeof window !== 'undefined') {
			// ✅ 클라이언트 환경 (브라우저) → 현재 도메인 사용
			return window.location.origin;
		}
	}
}
