import './SearchBar.scss';

export default function SearchBar(): JSX.Element {
	return (
		<section className="section">
			<div className="search-bar">
				<input
					type="text"
					className="input search-bar__input"
					placeholder="введите слово для поиска"
				/>
				<button className="search-bar__button"></button>
			</div>
		</section>
	);
}
