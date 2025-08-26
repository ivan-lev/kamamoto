import type { Button as ButtonProps } from '@/components/shared/buttons/button.types';

export default function DeleteButton({ title, action }: ButtonProps) {
	return (
		<button
			className="button button--type-delete"
			type="button"
			onClick={ action }
		>
			{ title }
		</button>
	);
}
