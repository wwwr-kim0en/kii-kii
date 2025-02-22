'use client';
import supabase from '@/lib/supabase/client';
import { useSuspenseQuery } from '@tanstack/react-query';

export default function useGetListItems(user) {
	if (!user) return;
	const query = useSuspenseQuery({
		queryKey: ['list-items'],
		queryFn: async () => {
			// const response = await fetch('/api/list-items');
			// return response.json();
			return await supabase.from('list-item').select('*').eq('author_id', user?.id);
		},
	});
	return query;
}
