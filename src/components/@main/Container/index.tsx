'use client';

import { Button } from '@/components/ui/button';

import supabase from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

export default function Container({ user }: { user: User | null }) {
	const [folderLists, setFolderLists] = useState<any[]>([]);
	function sortFoldersByLatest() {
		if (!folderLists.length) return;
		const sorted = folderLists.sort((a, b) => a.created_at - b.created_at);
		setFolderLists(sorted);
	}
	useEffect(() => {
		supabase
			.from('folder_d0')
			.select('*')
			.eq('author_id', user?.id)
			.then((res) => {
				const { data, count, error, status, statusText } = res;
				console.log('list', data);
				if (!data) return;
				const foldersSortedByIndex = data.sort((a, b) => a.index - b.index);
				setFolderLists(foldersSortedByIndex);
			});
	}, []);
	return (
		<div>
			<div>
				<Button onClick={sortFoldersByLatest}>최신순 정렬</Button>
			</div>
			<p>count: {folderLists.length}개</p>
			<ul>
				{folderLists.map((folder, index) => (
					<li key={folder.id}>{folder.name}</li>
				))}
			</ul>
		</div>
	);
}
