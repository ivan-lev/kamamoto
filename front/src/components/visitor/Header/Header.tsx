import Logo from '@/components/visitor/Logo/Logo';
import Menu from '@/components/visitor/Menu/Menu';
import './Header.scss';

export default function Header() {
	return (
		<header className="header">
			<Logo />
			<Menu />
		</header>
	);
}
