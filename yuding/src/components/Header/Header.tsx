import { Link } from 'react-router';
import Logo from '@/components/Logo/Logo';
import { useCartContext } from '@/contexts/CartContext';
import './Header.scss';

export default function Header() {
	const { items } = useCartContext();
	return (
		<header className="section header">
			<div></div>

			<Logo />

			<Link to="/cart" className="header__cart-link">
				<img className="header__icon" src="/__spritemap#sprite-cart-view"></img>
				{ items.length > 0 && (<span className="header__cart-counter">{ items.length }</span>) }
			</Link>
		</header>
	);
}
