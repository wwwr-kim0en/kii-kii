import { HTMLAttributes } from 'react';

export default function BgContainer(props: HTMLAttributes<HTMLDivElement>) {
	return (
		<div className="bg-[yellow] mx-auto h-screen px-[16px] md:w-[80vw] " {...props}>
			{props.children}
		</div>
	);
}
