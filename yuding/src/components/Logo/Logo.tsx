import { NavLink } from 'react-router';
import './Logo.scss';

export default function Logo() {
	return (
		<NavLink className="logo" to="/">
			<img className="logo__img" src="/yuding/logo.svg" alt="Логотип" />
		</NavLink>
	);
}
