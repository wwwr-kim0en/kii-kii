'use client';

import YoutubePlayer from '@/components/@main/YoutubePlayer';
import supabase from '@/lib/supabase/api/client/client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function FolderPage() {
	const [folder, setFolder] = useState(undefined);
	const [songsArr, setSongsArr] = useState([]);
	const { username, folder_d0_id } = useParams();

	useEffect(() => {
		supabase
			.from('folder_d0')
			.select('*')
			.eq('id', folder_d0_id)
			.then(({ data }) => {
				if (!data) return;
				console.log('res', data[0]);
				setFolder(data[0]);
				setSongsArr(data[0].songs);
			});
	}, [folder_d0_id]);

	return (
		<section>
			<section style={{ height: '30vh', backgroundColor: 'red' }}></section>
			<h1>{folder?.name || ''}</h1>
			<ul>
				{songsArr.map((song, index) => {
					return (
						<li key={song.id}>
							<p>
								{index + 1}:{song.content}
							</p>
							{/* <YoutubeItem src={song.content} /> */}
						</li>
					);
				})}
			</ul>
		</section>
	);
}
