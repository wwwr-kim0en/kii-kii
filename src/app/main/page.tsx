'use client';
import AddLink from '@/components/@main/AddLink';
import Container from '@/components/@main/Container';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { User } from '@supabase/supabase-js';
// import { redirect } from 'next/navigation';
// import { cookies } from 'next/headers';
import supabase from '@/lib/supabase/client';
import { Suspense, useEffect, useState } from 'react';

export default  function MainPage() {
	const [user, setUser] = useState<User | null>(null);
	useEffect(() => {
		// window.localStorage.getItem('')
		supabase.auth.getUser().then((res) => {
			console.log('res', res);
			const {
				data: { user },
				error,
			} = res;
			if (error) {
				throw new Error('Container Error');
			}
			if (!user) return;
			setUser(user);
		});
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
