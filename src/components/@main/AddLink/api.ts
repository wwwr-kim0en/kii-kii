'use server';

import getServerClient from '@/lib/supabase/api/client/server';
export type LinkData = {
	id: string;
	user_id: string;
	container_id: string; // folder_id
	content: string;
	created_at?: string;
	updated_at?: string | null;
};

export type PostLinkData = Omit<LinkData, 'id'>;

export async function addNewLink(linkData: PostLinkData) {
	const supabase = await getServerClient();
	const res = await supabase?.from('list-item').insert([linkData]);
	console.log('addNewLink >> data:', res);
}
