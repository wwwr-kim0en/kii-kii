import { OAUTH_TYPES } from '@/types';
const OAuthButton = dynamic(() => import('@/components/OAuthButton'));
import getServerClient from '@/lib/supabase/api/client/server';
import { extractFromEmail } from '@/utils/extractFromEmail';
import { redirect } from 'next/navigation';
import { Dialog, DialogContent, DialogDescription, DialogHeader } from '@/components/ui/dialog';
import { DialogTrigger } from '@radix-ui/react-dialog';
import dynamic from 'next/dynamic';

export default async function LoginPage() {
	const supabase = await getServerClient();

	const {
		data: { user },
	} = await supabase?.auth.getUser();
	console.log('loginPage >> user:', user);
	const session = await supabase.auth.getSession();
	console.log('loginPage >> session:', session);
	
	if (user) {
		const username = extractFromEmail(user.email as string)?.username || '';
		if (!username) {
			console.error('이동할 파라미터 username이 없습니다.');
			return;
		}

		redirect(`/${username}/main`);
	}

	return (
		<div className="p-10 fixed left-[50%] top-[50%] h-[50%] w-[50%] mx-auto flex flex-col items-center justify-center space-y-10  translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg sm:rounded-lg h-fit">
			<h1 className="text-3xl font-semibold">Sign In</h1>
			<ul className="flex flex-col justify-center items-center space-y-6">
				<li>
					<OAuthButton provider={OAUTH_TYPES.KAKAO} />
				</li>
				<li>
					<OAuthButton provider={OAUTH_TYPES.GOOGLE} />
				</li>
			</ul>
		</div>
	);
}
