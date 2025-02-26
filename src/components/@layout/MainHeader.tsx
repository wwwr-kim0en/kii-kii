'use client';
import { signOut } from '@/lib/supabase/api/auth';

export default function MainHeader() {
	async function handleSignOut() {
		console.log('sign out');
		await signOut();
	}

	return (
		<header className="h-[100px] border-b-2">
			All
			<button onClick={handleSignOut}>logout</button>
		</header>
	);
}
