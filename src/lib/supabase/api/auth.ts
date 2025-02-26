'use server';
import { User } from '@supabase/supabase-js';
import supabase from './client/server';
import { cookies } from 'next/headers';

export async function getUser(): Promise<User | null> {
	try {
		const {
			data: { user },
		} = await supabase?.auth.getUser();

		await cookies().then((res) => res.set('user', JSON.stringify(user)));
		return user;
	} catch (error) {
		throw new Error('getUser fail');
	}
}

export async function signOut() {
	try {
		await supabase?.auth.signOut();
	} catch (error) {
		throw new Error('signOut fail');
	}
}
