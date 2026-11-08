import { useState } from 'react';
import { useNavigate } from 'react-router';
import SearchInput from '@/components/shared/SearchInput/SearchInput';
import Logo from '@/components/visitor/Logo/Logo';
import Menu from '@/components/visitor/Menu/Menu';
// import YudingLink from '@/components/visitor/YudingLink/YudingLink';
import './Header.scss';

export default function Header() {
	const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
	const navigate = useNavigate();

	return (
		<header className="header">
			<Logo />
			<Menu
				isSearchOpen={ isSearchOpen }
				onSearchToggle={ () => setIsSearchOpen(open => !open) }
			/>
			{ /* <YudingLink /> */ }

			{ isSearchOpen && (
				<div className="header__search-panel">
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
