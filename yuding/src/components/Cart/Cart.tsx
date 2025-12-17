import { useCart } from '@/hooks/useCart';
import './Cart.scss';

export default function Cart() {
	const { items, removeItem } = useCart();

	if (!items.length) {
		return <p>Корзина пуста</p>;
	}

	return (
		<div>
			<h2>Корзина</h2>

			<div className="cart">
				{ items.map(item => (
					<div key={ `${item.manufacturer}-${item.incense}` }>
						<strong>{ item.manufacturer }</strong>
						{ ' ' }
						—
						{ ' ' }
						{ item.incense }
						{ ' ' }
						(
						{ item.count }
						{ ' ' }
						шт)

						<button
							onClick={ () =>
								removeItem(
									item.manufacturer,
									item.incense,
								) }
							style={{ marginLeft: 8 }}
						>
							Удалить
						</button>
					</div>
				)) }
			</div>
		</div>
	);
}
