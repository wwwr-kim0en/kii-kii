'use client';

import useGetListItems from '@/hooks/api/useGetListItems';

export default function Container({ user }) {
	if (!user) return;
	const res = useGetListItems(user);
	return <div></div>;
}
