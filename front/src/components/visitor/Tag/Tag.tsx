interface Props {
	title: string;
	action?: () => void;
}

export default function Tag({ title, action }: Props) {
	return (
		<div className="tag">
			{ /* полное название — в подсказке: в узком месте оно обрезается троеточием */ }
			<span className="tag__title" title={ title }>{ title }</span>
			{ action && <div className="tag__action" onClick={ action }></div> }
		</div>
	);
}
