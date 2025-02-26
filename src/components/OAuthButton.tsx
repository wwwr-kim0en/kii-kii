'use client';
import supabase from '@/lib/supabase/api/client/client';
import { Button } from '@/components/ui/button';
import { GOOGLE, KAKAO } from '@/app/auth/constants';
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

	if (provider === GOOGLE) {
		return <Button onClick={handleOAuthButtonClick}>{GOOGLE}</Button>;
	}
	if (provider === KAKAO) {
		return (
			<Button onClick={handleOAuthButtonClick}>
				<img src="/images/kakao_login_medium_narrow.png" alt="kakao" />
			</Button>
		);
	}
}
