'use client';
import supabase from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { GOOGLE, KAKAO } from '@/app/auth/constants';
import { Provider } from '@supabase/supabase-js';

export default function OAuthButton({ provider }: { provider: Provider }) {
	async function handleOAuthButtonClick() {
		await supabase.auth.signInWithOAuth({
			provider,
			options: {
				// skipBrowserRedirect: true,
				//redirectTo: `https://lgwukecagnzzjaziapce.supabase.co/auth/v1/callback`,
				redirectTo: `http://localhost:3000/api/auth/callback`,
				//queryParams: {
				//	 access_type: 'offline',
				//	prompt: 'consent',
				//},
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
