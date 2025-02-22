'use client';
import AddLink from '@/components/@main/AddLink';
import Container from '@/components/@main/Container';
import useGetListItems from '@/hooks/api/useGetListItems';
import { getUser } from '@/lib/supabase/api/auth';
import { fetchAllListItems } from '@/lib/supabase/api/list-item';
import supabase from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
// import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

export default function MainPage() {
	const [user, setUser] = useState<User | null>(null);
	useEffect(() => {
		// getUser().then((user) => {
		// 	console.log('user from mainPage', user);
		// 	if (!user) {
		// 		// redirect('/auth');
		// 	}
		// 	setUser(user);
		// });
		(async () => {
			const { data } = await supabase.auth.getSession();
			console.log(data);
			// console.log('getUser', session);
		})();
	}, []);

	return (
		<div>
			<Suspense fallback={<div>list loading...</div>}>
				<Container user={user} />
			</Suspense>
			<AddLink />
		</div>
	);
}
