'use client';
import AddLink from '@/components/@main/AddLink';
import ServiceContentContainer from '@/components/@main/ServiceContentContainer';
import { User } from '@supabase/supabase-js';
import supabase from '@/lib/supabase/api/client/client';
import { Suspense, useEffect, useState } from 'react';
import BgContainer from '@/components/@main/BgContainer';

export default function MainPage() {
	const [user, setUser] = useState<User | null>(null);
	useEffect(() => {
		supabase.auth.getSession().then((res) => console.log('getSessopm', res));
		supabase.auth.getUser().then((res) => {
			const {
				data: { user },
				error,
			} = res;
			console.log('main page - user:', user);
			console.log('error,', error);
			if (!user) return;
			setUser(user);
			//	const { user_metadata, id } = user;
			// localStorage.setItem('user', JSON.stringify({ id, ...user_metadata }));
		});
	}, []);
	if (!user) return;
	return (
		<Suspense fallback={<div>list loading...</div>}>
			<BgContainer>
				<ServiceContentContainer user={user} />
				<AddLink userId={user?.id || ''} />
			</BgContainer>
		</Suspense>
	);
}
