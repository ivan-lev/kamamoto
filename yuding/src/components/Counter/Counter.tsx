import type { Dispatch, SetStateAction } from 'react';
import { useEffect } from 'react';
import './Counter.scss';

interface Props {
	count: number;
	maxQuantity: number;
	action: Dispatch<SetStateAction<number>>;
}

export default function Counter({ count, maxQuantity, action }: Props) {
	function increaseCount() {
		if (count + 5 > maxQuantity)
			return;

		action(count + 5);
	};

	function decreaseCount() {
		if (count <= 5) {
			return;
		}
		action(count - 5);
	};

	useEffect(() => {
		action(count);
	}, [count]);

	return (
		<div className="counter">
			<div className="input counter__buttons">
				<button className="counter__button" onClick={ decreaseCount }>-</button>
				<div className="counter__button">{ count }</div>
				<button className="counter__button"onClick={ increaseCount }>+</button>
			</div>
			{ /* <button className="button counter__add-to-cart">Добавить в корзину</button> */ }
		</div>
	);
}
