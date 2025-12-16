import { Link } from 'react-router';
import Logo from '@/components/Logo/Logo';
import './Header.scss';

export default function Header() {
	return (
		<header className="section header">
			<div></div>

			<Logo />

			<Link to="/cart" className="header__cart-link">
				<img className="header__icon" src="/__spritemap#sprite-cart-view"></img>
			</Link>
		</header>
	);
}
