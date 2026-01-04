import { NavLink } from 'react-router';
import './Logo.scss';

export default function Logo() {
	return (
		<NavLink className="logo" to="/">
			<img className="logo__img" src="/logo.svg" alt="Логотип" width="146" height="20" />
		</NavLink>
	);
}
