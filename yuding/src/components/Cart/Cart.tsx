import type { Incense } from '@/variables/incences.types';
import { useEffect, useState } from 'react';
import CartRow from '@/components/Cart/CartRow';
import { useCart } from '@/hooks/useCart';
import { incenses } from '@/variables/incenses/_incenses';
import './Cart.scss';

interface CartDisplayItem {
	incense: Incense;
	count: number;
}

export default function Cart() {
	const { addItem, items, removeItem } = useCart();
	const [itemsToDisplay, setItemsToDisplay] = useState<CartDisplayItem[]>([]);
	const [totalPrice, setTotalPrice] = useState<number>(0);

	useEffect(() => {
		let newTotalPrice = 0;
		const result: CartDisplayItem[] = [];

		items.forEach((cartItem) => {
			const incense = incenses.find(
				i =>
					i.manufacturer.slug === cartItem.manufacturer
					&& i.slug === cartItem.incense,
			);

			if (!incense)
				return;

			result.push({
				incense,
				count: cartItem.count,
			});

			newTotalPrice += cartItem.count * incense.pricePerStick;
		});

		setItemsToDisplay(result);
		setTotalPrice(newTotalPrice);
	}, [items]);

	return !items.length
		? (<p>Корзина пуста</p>)
		: (
			<>
				<h2>Корзина</h2>

				<div className="cart">
					<div className="cart__list">
						<div className="cart-row">
							<div className="cart-row__item"><span></span></div>
							<div className="cart-row__item"><span>название</span></div>
							<div className="cart-row__item"><span>кол-во, шт</span></div>
							<div className="cart-row__item"><span>стоим-ть</span></div>
							<div className="cart-row__item"><span></span></div>
						</div>

						{ itemsToDisplay.map(({ incense, count }) => (
							<CartRow
								key={ `${incense.manufacturer.slug}-${incense.slug}` }
								item={ incense }
								count={ count }
								countEdit={ addItem }
								removeAction={ () => removeItem(incense.manufacturer.slug, incense.slug) }
							/>
						)) }
					</div>

					<span>
						{ `Итого: ${totalPrice}` }
					</span>

				</div>
			</>
		);
}
