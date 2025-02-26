'use client';
import { Button } from '@/components/ui/button';
import { ChangeEvent, EventHandler, FormEvent, HTMLAttributes, InputHTMLAttributes, useState } from 'react';
import { addNewLink, LinkData, PostLinkData } from './api';
import { User } from '@supabase/supabase-js';

export default function AddLink({ userId }: { userId: string }) {
	const [inputValue, setInputValue] = useState('');

	function handleAddLinkInput(e: ChangeEvent<HTMLInputElement>) {
		setInputValue(e.target.value.trim());
		console.log('change');
	}

	async function handleLinkSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		console.log(inputValue);
		// Validate Link
		// Add Link to DB
		const newLinkData: PostLinkData = {
			user_id: userId,
			container_id: 'b027210a-6ac2-4359-9f30-ead1296836aa',
			content: inputValue,
		};
		await addNewLink(newLinkData);
		console.log('submit success');
	}

	return (
		<form onSubmit={handleLinkSubmit}>
			<div className="fixed bottom-0 left-0 right-0 flex items-center space-x-5 pb-3 pt-4 px-4  border-2 rounded-t-lg">
				<InputAddLink onChange={handleAddLinkInput} />
				<ButtonAddLink typeof="submit" />
			</div>
		</form>
	);
}

function InputAddLink({ onChange, ...props }: InputHTMLAttributes<HTMLInputElement>) {
	return <input onChange={onChange} {...props} className="border-b-2 w-full overflow-auto text-[20px]" />;
}

function ButtonAddLink({ onClick, ...props }: HTMLAttributes<HTMLButtonElement>) {
	return (
		<Button onClick={onClick} {...props}>
			ADD
		</Button>
	);
}
