'use client';

import { Button } from '@/components/ui/button';

import supabase from '@/lib/supabase/api/client/client';
import { extractFromEmail } from '@/utils/extractFromEmail';
import { User, UserMetadata } from '@supabase/supabase-js';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Container({ user }: { user: User | null }) {
	const [folderLists, setFolderLists] = useState<any[]>([]);
	const userMetaData = user?.user_metadata as UserMetadata;
	const { username = 1 } = extractFromEmail(user?.email);

	useEffect(() => {
		if (!user) return;

		supabase
			?.from('folder_d0')
			.select('*')
			.eq('user_id', user?.id)
			.then((res) => {
				const { data, count, error, status, statusText } = res;
				console.log('list', data);
				if (!data) return;
				const foldersSortedByIndex = data.sort((a, b) => a.index - b.index);
				setFolderLists(foldersSortedByIndex);
			});
	}, [user]);

	function sortFoldersByLatest() {
		if (!folderLists.length) return;
		const sorted = folderLists.sort((a, b) => a.created_at - b.created_at);
		setFolderLists(sorted);
	}

	return (
		<div>
			<div>
				<Button onClick={sortFoldersByLatest}>최신순 정렬</Button>
			</div>
			<p>count: {folderLists.length || 0}개</p>
			<ul>
				{folderLists.map((folder, index) => {
					console.log('folder,', folder);
					return (
						<Link key={folder.id} href={`/${username}/${folder.id}`}>
							<li className="">{folder.name}</li>
						</Link>
					);
				})}
			</ul>
		</div>
	);
}
