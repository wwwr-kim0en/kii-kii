'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { extractFromEmail } from '@/utils/extractFromEmail';
import supabase from '@/lib/supabase/api/client/client';
import { Session, User } from '@supabase/supabase-js';

export default function OAuthCallback() {
	const router = useRouter();

	useEffect(() => {
		if (typeof window == 'undefined') return;
		// const hashParams = new URLSearchParams(window.location.hash.substring(1)); // `#` 제거 후 파싱
		supabase?.auth.getSession().then(({ data }) => {
			console.log('OAuthCallback - getSession:', data.session);
			const { access_token = '', refresh_token = '', user = {} } = data.session as Session;
			// supabase?.auth.setSession({ access_token, refresh_token });
			const { email = '' } = user as User;
			if (!email) return;
			const username = extractFromEmail(email)?.username;
			
			fetch('/api/auth/store-token', {
				// ✅ 서버로 토큰을 보내 HttpOnly 쿠키에 저장 요청
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ access_token, refresh_token }),
			})
				.then((res) => {
					console.log('토큰 저장 완료!:', res);
					router.push(`/${username}/main`);
				})
				.catch((err) => {
					throw new Error('OAuthCallback - 토큰 저장 실패 :', err);
				});
		});
	}, []);
	return <p>OAuth 로그인 처리 중...</p>;
}
