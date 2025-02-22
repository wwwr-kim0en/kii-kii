'use client';
import { Button } from '@/components/ui/button';
import { InputHTMLAttributes, useState } from 'react';

export default function AddLink() {
	const [inputValue, setInputValue] = useState('');

	function handleAddLinkInput(e) {
		setInputValue(e.target.value);
	}
	function handleAddButton() {
		console.log(inputValue);
		// Validate Link
		// Add Link to DB
		setInputValue('');
	}

	return (
		<div className="fixed bottom-0 left-0 right-0 flex items-center space-x-5 pb-3 pt-4 px-4  border-2 rounded-t-lg">
			<InputAddLink onChange={handleAddLinkInput} />
			<ButtonAddLink onClick={handleAddButton} />
		</div>
	);
}

function InputAddLink({ onChange, ...props }: InputHTMLAttributes<HTMLInputElement>) {
	return <input onChange={onChange} {...props} className="border-b-2 w-full overflow-auto text-[20px]" />;
}

function ButtonAddLink({ onClick }) {
	return <Button onClick={onClick}>ADD</Button>;
}
