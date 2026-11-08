import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import SearchInput from '@/components/shared/SearchInput/SearchInput';
import Logo from '@/components/visitor/Logo/Logo';
import Menu from '@/components/visitor/Menu/Menu';
// import YudingLink from '@/components/visitor/YudingLink/YudingLink';
import './Header.scss';

export default function Header() {
	const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
	const navigate = useNavigate();
	const searchPanelRef = useRef<HTMLDivElement>(null);

	// клик вне панели поиска (и вне кнопки-переключателя в Menu) закрывает панель
	useEffect(() => {
		if (!isSearchOpen)
			return;

		function handlePointerDown(event: PointerEvent) {
			const target = event.target as HTMLElement | null;
			if (target?.closest('.header__search-panel, .menu__search'))
				return;

			setIsSearchOpen(false);
		}

		document.addEventListener('pointerdown', handlePointerDown);
		return () => document.removeEventListener('pointerdown', handlePointerDown);
	}, [isSearchOpen]);

	return (
		<header className="header">
			<Logo />
			<Menu
				isSearchOpen={ isSearchOpen }
				onSearchToggle={ () => setIsSearchOpen(open => !open) }
			/>
			{ /* <YudingLink /> */ }

			{ isSearchOpen && (
				<div className="header__search-panel" ref={ searchPanelRef }>
					<SearchInput
						onSubmit={ (query) => {
							setIsSearchOpen(false);
							navigate(`/search?q=${encodeURIComponent(query)}`);
						} }
					/>
				</div>
			) }
		</header>
	);
}
