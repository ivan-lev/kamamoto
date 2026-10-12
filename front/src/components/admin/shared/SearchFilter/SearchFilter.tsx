interface Props {
	value: string;
	placeholder: string;
	onChange: (value: string) => void;
}

export default function SearchFilter({ value, placeholder, onChange }: Props) {
	return (
		<input
			className="input"
			type="text"
			placeholder={ placeholder }
			value={ value }
			onChange={ event => onChange(event.target.value) }
		/>
	);
}
