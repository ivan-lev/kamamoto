import type { Incense } from '@/variables/incences.types';
import { Link } from 'react-router';
import './CartRow.scss';

interface Props {
	item: Incense;
	count: number;
	countEdit: any;
	removeAction: any;
}

export default function CartRow({ item, count, countEdit, removeAction }: Props) {
	const base = import.meta.env.BASE_URL;

	const isInStock = item?.inStock && item.quantity > 0;

	return (
		<div className="cart-row">
			<div className="cart-row__item cart-row__item--picture">
				<Link target="_blank"className="link" to={ `/${item?.manufacturer.slug}/${item?.slug}` }>
					<picture className="cart-row__picture">
						<img
							className="cart-row__image"
							alt="Изабражение лота"
							src={ `${base}images/incenses/${item?.manufacturer.slug}/${item?.slug}/${item?.photos[0]}` }
						/>
					</picture>
				</Link>
			</div>

			<div className="cart-row__item cart-row__item--title">
				<Link target="_blank"className="link" to={ `/${item?.manufacturer.slug}/${item?.slug}` }>
					<span>{ `${item?.manufacturer.title} - ${item?.title}` }</span>
				</Link>
			</div>

			<div className="cart-row__item cart-row__item--counter">
				{ isInStock
					? (
						<div className="counter counter--cart">
							<div className="input counter__buttons">
								<button className="counter__button" onClick={ () => countEdit(item?.manufacturer.slug, item?.slug, count === 5 ? count : count - 5) }>-</button>
								<div className="counter__button">{ count }</div>
								<button className="counter__button" onClick={ () => count + 5 <= item.quantity ? countEdit(item?.manufacturer.slug, item?.slug, count + 5) : null }>+</button>
							</div>
						</div>
					)
					: <span>закончились</span> }
			</div>

			<div className="cart-row__item cart-row__item--price">
				{ isInStock ? <span>{ `${count * item?.pricePerStick} р` }</span> : <span>-</span> }
			</div>

			<div className="cart-row__item cart-row__item--delete">
				<button className="cart-row__delete-button" onClick={ removeAction }>
					<img src="/__spritemap#sprite-trash-view" className="cart-row__delete-button-img" />
				</button>
			</div>
		</div>
	);
}
