import type { CartDisplayItem } from '@/components/Cart/Cart';
import { useEffect, useState } from 'react';
import { buildCartText } from '@/utils/cartListToText';
import { copyToClipboard } from '@/utils/copyToClipboard';
import './CartCopy.scss';

interface Props {
	items: CartDisplayItem[];
	totalPrice: number;
	deliveryPrice: number;
};

export default function CartCopy({ items, totalPrice, deliveryPrice }: Props) {
	const [status, setStatus] = useState<string | null>(null);

	useEffect(() => {
		setTimeout(() => {
			setStatus('');
		}, 3500);
	}, [status]);

	const handleCopy = async () => {
		const text = buildCartText(items, totalPrice, deliveryPrice);
		const resultMessage = await copyToClipboard(text);
		setStatus(resultMessage);
	};

	return (
		<section className="section cart-copy">
			<div className="cart-copy__actions">
				<button className="button cart-copy__button" onClick={ handleCopy }>Копировать корзину</button>

				<a target="_blank" className="link" href="https://t.me/ivanlev">
					<button className="button">Написать мне</button>
				</a>
			</div>

			<span className="cart-copy__message">
				{ status || (
					<span>&nbsp;</span>) }
			</span>

		</section>
	);
}
