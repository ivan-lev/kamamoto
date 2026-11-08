import type { SearchItem } from '@/types/search';
import SearchResultItem from './SearchResultItem';
import './SearchResults.scss';

interface Props {
	items: SearchItem[];
	query: string;
}

// результаты приходят единым списком по релевантности,
// для отображения делим его на статьи (стили керамики + мастера) и глоссарий
export default function SearchResults({ items, query }: Props) {
	if (items.length === 0) {
		return (
			<p className="search-results__empty">
				{ `По запросу «${query}» ничего не найдено` }
			</p>
		);
	}

	const articles = items.filter(item => item.type === 'article');
	const terms = items.filter(item => item.type === 'term');

	return (
		<div className="search-results">
			{ articles.length > 0 && (
				<section className="search-results__group">
					<h2 className="search-results__group-title">Статьи</h2>
					<ul className="search-results__list">
						{ articles.map(item => (
							<SearchResultItem key={ item.link } item={ item } />
						)) }
					</ul>
				</section>
			) }

			{ terms.length > 0 && (
				<section className="search-results__group">
					<h2 className="search-results__group-title">Глоссарий</h2>
					<ul className="search-results__list">
						{ terms.map(item => (
							<SearchResultItem key={ item.link } item={ item } />
						)) }
					</ul>
				</section>
			) }
		</div>
	);
}
