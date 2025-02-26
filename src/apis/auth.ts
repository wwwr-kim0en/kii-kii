'use server';
import getServerClient from '@/lib/supabase/api/client/server';
import { Provider } from '@supabase/supabase-js';

export async function SignIn(provider: Provider) {
	const supabase = await getServerClient();
	// user 검증
	try {
		let { data, error } = await supabase?.auth?.signInWithOAuth({
			provider: provider,
		});
		if (!data) return;
		console.log('signin: ', data);
		return data;
	} catch (error) {
		throw new Error('Sign In Fail!');
	}
}

export async function SignOut() {
	const supabase = await getServerClient();

	// user 검증
	try {
		await supabase?.auth.signOut();
	} catch (error) {
		throw new Error('Sign Out Fail!');
	}
}
