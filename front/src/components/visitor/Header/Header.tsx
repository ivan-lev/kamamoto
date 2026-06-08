import Logo from '@/components/visitor/Logo/Logo';
import Menu from '@/components/visitor/Menu/Menu';
import YudingLink from '@/components/visitor/YudingLink/YudingLink';
import './Header.scss';

export default function Header() {
	return (
		<header className="header">
			<Logo />
			<Menu />
			<YudingLink />
		</header>
	);
}
