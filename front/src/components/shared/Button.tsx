interface Props {
	title: string;
	action: () => void;
	additionalClass?: string;
}

export default function Button({ title, action, additionalClass }: Props) {
	return (
		<button
			className={ `button ${additionalClass || ''}` }
			type="button"
			onClick={ action }
		>
			{ title }
		</button>
	);
}
