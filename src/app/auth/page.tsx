import { OAUTH_TYPES } from '@/types';
import OAuthButton from '../../components/OAuthButton';

import getServerClient from '@/lib/supabase/api/client/server';
import { extractFromEmail } from '@/utils/extractFromEmail';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
	const supabase = await getServerClient();

	const {
		data: { user },
	} = await supabase?.auth.getUser();
	console.log('loginPage >> user:', user);

	if (user) {
		const username = extractFromEmail(user.email as string)?.username || '';
		if (!username) {
			console.error('이동할 파라미터 username이 없습니다.');
			return;
		}

		redirect(`/${username}/main`);
	}

	return (
		<ul className="h-screen mx-auto flex flex-col items-center justify-center space-y-3">
			<li>
				<OAuthButton provider={OAUTH_TYPES.GOOGLE} />
			</li>
			<li>
				<OAuthButton provider={OAUTH_TYPES.KAKAO} />
			</li>
		</ul>
	);
}
