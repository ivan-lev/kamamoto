import type { Button as ButtonProps } from '@/components/shared/buttons/button.types';

export default function Button({ title, action }: ButtonProps) {
	return (
		<button
			className="button"
			type="button"
			onClick={ action }
		>
			{ title }
		</button>
	);
}
