'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { extractFromEmail } from '@/utils/extractFromEmail';
import supabase from '@/lib/supabase/api/client/client';

export default function OAuthCallback() {
	const router = useRouter();

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const hashParams = new URLSearchParams(window.location.hash.substring(1)); // `#` 제거 후 파싱

			const accessToken = hashParams.get('access_token');
			const refreshToken = hashParams.get('refresh_token');
			// supabase?.auth.getSession().then(({ data }) => {
			// 	supabase?.auth.setSession(data);
			// });
			if (!accessToken) return;
			const res = jwtDecode(accessToken);
			console.log('res', res);
			localStorage.setItem('user', JSON.stringify(res));
			const { email = '' } = res;
			const username = extractFromEmail(email)?.username;
			if (!username) return;
			// ✅ 서버로 토큰을 보내 HttpOnly 쿠키에 저장 요청
			fetch('/api/auth/store-token', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ accessToken, refreshToken }),
			})
				.then((res) => {
					console.log('토큰 저장 완료!:', res);
					router.push(`/${username}/main`);
				})
				.catch((err) => {
					throw new Error('OAuthCallback - 토큰 저장 실패 :', err);
				});
		}
	}, []);
	return <p>OAuth 로그인 처리 중...</p>;
}
