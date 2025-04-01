import { NavLink } from 'react-router-dom';
import './Logo.scss';

export default function Logo(): JSX.Element {
	return (
		<NavLink className="logo" to="/">
			<img className="logo__img" src="/logo.png" alt="logo"></img>
		</NavLink>
	);
}
