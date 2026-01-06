import type { CartDisplayItem } from '@/components/Cart/Cart';
import { useEffect, useState } from 'react';
import { buildCartText } from '@/utils/cartListToText';
import { copyToClipboard } from '@/utils/copyToClipboard';
import './CartCopy.scss';

interface Props {
	items: CartDisplayItem[];
	total: number;
};

export default function CartCopy({ items, total }: Props) {
	const [status, setStatus] = useState<string | null>(null);

	useEffect(() => {
		setTimeout(() => {
			setStatus('');
		}, 5000);
	}, [status]);

	const handleCopy = async () => {
		const text = buildCartText(items, total);
		const resultMessage = await copyToClipboard(text);
		setStatus(resultMessage);
	};

	return (
		<>
			<button className="button cart-copy__button" onClick={ handleCopy }>Копировать корзину</button>
			<span>{ status }</span>
		</>
	);
}
