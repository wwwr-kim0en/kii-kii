'use client';
import AddLink from '@/components/@main/AddLink';
import Container from '@/components/@main/Container';
import { User } from '@supabase/supabase-js';
import supabase from '@/lib/supabase/api/client/client';
import { Suspense, useEffect, useState } from 'react';

export default function MainPage() {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		supabase.auth.getUser().then((res) => {
			const {
				data: { user },
				error,
			} = res;
			console.log('main page - user:', user);
			console.log('error,', error);
			if (!user) return;
			setUser(user);
			// const { user_metadata, id } = user;
			// localStorage.setItem('user', JSON.stringify({ id, ...user_metadata }));
		});
	}, []);
	if (!user) return;
	return (
		<div>
			<Suspense fallback={<div>list loading...</div>}>
				<Container user={user} />
			</Suspense>
			<AddLink userId={user?.id} />
		</div>
	);
}
