import Logo from '@/components/Logo/Logo';
import Menu from '@/components/Menu/Menu';
import './Header.scss';

export default function Header(): JSX.Element {
	return (
		<header className="header">
			<Logo />
			<Menu />
		</header>
	);
}
