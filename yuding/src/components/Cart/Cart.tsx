import type { Incense } from '@/variables/incences.types';
import { useEffect, useState } from 'react';
import CartCopy from '@/components/Cart/CartCopy';
import CartRow from '@/components/Cart/CartRow';
import { useCart } from '@/hooks/useCart';
import { countDeliveryPrice } from '@/utils/countDeliveryPrice';
import { incenses } from '@/variables/incenses/_incenses';
import './Cart.scss';

export interface CartDisplayItem {
	incense: Incense;
	count: number;
}

export default function Cart() {
	const { addItem, items, removeItem } = useCart();
	const [itemsToDisplay, setItemsToDisplay] = useState<CartDisplayItem[]>([]);
	const [totalPrice, setTotalPrice] = useState<number>(0);
	const [deliveryPrice, setDeliveryPrice] = useState<number>(countDeliveryPrice(0));

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
		setDeliveryPrice(countDeliveryPrice(newTotalPrice));
	}, [items]);

	return !items.length
		? (<p>Корзина пуста</p>)
		: (
			<>
				<section className="section cart">
					<h2>Корзина</h2>

					<p>Ниже находится список того, что вам понравилось. Можно докрутить список до идеального варианта, нажать "Копировать корзину", а затем "Написать мне" - вас перекинет в наш диалог в Телераме</p>

					<div className="container">
						<div className="cart__list">
							<div className="cart-row">
								<div className="cart-row__item"><span></span></div>
								<div className="cart-row__item"><span>название</span></div>
								<div className="cart-row__item"><span>кол-во, шт</span></div>
								<div className="cart-row__item"><span>ст-ть</span></div>
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

						<span className="cart__price-info">
							{ `Итого: благовония ${totalPrice}р, доставка: ${deliveryPrice ? `${deliveryPrice.toString()}р` : 'бесплатно'}` }
						</span>
					</div>

				</section>

				<CartCopy items={ itemsToDisplay } totalPrice={ totalPrice } deliveryPrice={ deliveryPrice } />
			</>
		);
}
