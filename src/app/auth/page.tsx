'use client';
import { GOOGLE, KAKAO } from './constants';
import OAuthButton from './_components/OAuthButton';
import supabase from '@/lib/supabase/client';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
	const router = useRouter();
	useEffect(() => {
		(async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			console.log('user', user);
			if (user) {
				router.push('/main');
			}
		})();
	}, []);

	return (
		<ul className="h-screen mx-auto flex flex-col items-center justify-center space-y-3">
			<li>
				<OAuthButton provider={GOOGLE} />
			</li>
			<li>
				<OAuthButton provider={KAKAO} />
			</li>
		</ul>
	);
}
