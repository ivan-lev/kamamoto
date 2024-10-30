import './SearchBar.scss';

export default function SearchBar(): JSX.Element {
	return (
		<section className="section">
			<div className="search-bar">
				<input
					type="text"
					className="background-muted bordered input search-bar__input"
					placeholder="введите слово для поиска"
				/>
				<button className="background-muted bordered search-bar__button"></button>
			</div>
		</section>
	);
}
