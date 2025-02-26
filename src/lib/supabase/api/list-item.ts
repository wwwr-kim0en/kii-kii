import getServerClient from './client/server';

export async function fetchAllListItems() {
	const supabase = await getServerClient();
	const user = await supabase?.auth.getUser();
	if (!user) return;
	const { id, email, phone, user_metadata } = user;
	const { data, error } = await supabase?.from('list-item').select('*').eq('author_id', user?.id);
}
