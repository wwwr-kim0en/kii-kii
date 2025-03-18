export default function ListItem({
	children,
	description,
}: {
	children: React.ReactNode;
	description?: React.ReactNode;
}) {
	return (
		<li className="flex justify-between">
			<div>
				<h2>{children}</h2>
				<div>{description}</div>
			</div>
			<div>
				<button>play</button>
			</div>
		</li>
	);
}
