import { GOOGLE, KAKAO } from './constants';
import OAuthButton from './_components/OAuthButton';
import supabase from '@/lib/supabase/client';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
	const {
		data: { user },
	} = await supabase.auth.getUser();

	console.log('user', user);

	if (user) {
		redirect('/main');
	}

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
