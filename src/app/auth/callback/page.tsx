'use client';
import supabase from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function OAuthCallback() {
	const router = useRouter();

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const hashParams = new URLSearchParams(window.location.hash.substring(1)); // `#` 제거 후 파싱
			const accessToken = hashParams.get('access_token');
			const refreshToken = hashParams.get('refresh_token');

			if (!accessToken) return;

			// ✅ 서버로 토큰을 보내 HttpOnly 쿠키에 저장 요청
			fetch('/api/auth/store-token', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ accessToken, refreshToken }),
			})
				.then(() => {
					console.log('토큰 저장 완료!');
					router.replace('/main');
				})
				.catch((err) => console.error('토큰 저장 실패:', err));
		}
	}, []);
	return <p>OAuth 로그인 처리 중...</p>;
}
