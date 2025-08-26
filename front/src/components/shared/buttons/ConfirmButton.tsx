import type { Button as ButtonProps } from '@/components/shared/buttons/button.types';

export default function ConfirmButton({ title, action }: ButtonProps) {
	return (
		<button
			className="button button--type-confirm"
			type="button"
			onClick={ action }
		>
			{ title }
		</button>
	);
}
