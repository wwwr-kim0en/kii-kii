'use client';
import supabase from '@/lib/supabase/api/client/client';
import { Button } from '@/components/ui/button';
import { OAUTH_TYPES } from '@/types';
import { Provider } from '@supabase/supabase-js';

export default function OAuthButton({ provider }: { provider: Provider }) {
	async function handleOAuthButtonClick() {
		await supabase?.auth.signInWithOAuth({
			provider,
			options: {
				redirectTo: `http://localhost:3000/auth/callback`,
			},
		});
	}

	if (provider === OAUTH_TYPES.GOOGLE) {
		return (
			<button onClick={handleOAuthButtonClick}>
				<img height={45} alt="google" src="/images/google_login_light.svg" />
			</button>
		);
	}
	if (provider === OAUTH_TYPES.KAKAO) {
		return (
			<button onClick={handleOAuthButtonClick}>
				<img src="/images/kakao_login_medium_narrow.png" alt="kakao" />
			</button>
		);
	}
}
