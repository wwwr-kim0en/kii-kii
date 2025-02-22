'use server';
import supabase from '@/lib/supabase/client';
import { cookies } from 'next/headers';
export async function setUserSession(accessToken: string, refreshToken: string, expiresIn?: number) {
	if (!accessToken || !refreshToken) return;
	/** https://supabase.com/docs/reference/javascript/auth-setsession */

	try {
		cookies().then((res) => res.set('access_token', accessToken));
		cookies().then((res) => res.set('refresh_token', refreshToken));
		return await supabase.auth.setSession({
			access_token: accessToken,
			refresh_token: refreshToken,
		});
	} catch (error) {
		throw new Error('setUser fail');
	}
}
