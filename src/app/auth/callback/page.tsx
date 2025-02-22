'use client';

import { useEffect } from 'react';
import { redirect } from 'next/navigation';

import { setUserSession } from './actions';

export default function OAuthCallback() {
	useEffect(() => {
		if (typeof window == 'undefined') return;

		const hashParams = new URLSearchParams(window.location.hash.substring(1));
		const accessToken: string = hashParams.get('access_token') || '';
		const refreshToken: string = hashParams.get('refresh_token') || '';
		const expiresIn = hashParams.get('expires_in') || '';
		if (!accessToken || !refreshToken) {
			throw new Error('토큰이 없습니다: access_token / refresh_token');
		}

		(async () => {
			await setUserSession(accessToken, refreshToken, Number(expiresIn));

			redirect('/main');
		})();
	}, []);

	return <p>OAuth 로그인 처리 중...</p>;
}
