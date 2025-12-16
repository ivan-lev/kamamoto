import { useCart } from '@/hooks/useCart';
import './Cart.scss';

export default function Cart() {
	const { cart, removeItem } = useCart();

	const manufacturers = Object.keys(cart);

	if (!manufacturers.length) {
		return <p>Корзина пуста</p>;
	}

	return (
		<div>
			<h2>Корзина</h2>

			<ul>
				{ manufacturers.map(manufacturer => (
					<li key={ manufacturer }>
						<strong>{ manufacturer }</strong>

						<ul>
							{ Object.entries(cart[manufacturer]).map(
								([incense, count]) => (
									<li key={ incense }>
										<span>
											{ incense }
											{ ' ' }
											—
											{ count }
											{ ' ' }
											шт
										</span>

										<button
											onClick={ () =>
												removeItem(manufacturer, incense) }
											style={{ marginLeft: 8 }}
										>
											Удалить
										</button>
									</li>
								),
							) }
						</ul>
					</li>
				)) }
			</ul>
		</div>
	);
}
