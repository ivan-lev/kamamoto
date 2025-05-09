interface Props {
	title: string;
	action?: () => void;
}

export default function Tag({ title, action }: Props) {
	return (
		<div className="tag">
			<span className="tag__title">{title}</span>
			{action && <div className="tag__action" onClick={action}></div>}
		</div>
	);
}
