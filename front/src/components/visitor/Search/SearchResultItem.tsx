import type { SearchItem } from '@/types/search';
import { Link } from 'react-router';
import Picture from '@/components/visitor/Picture/Picture';
import './SearchResult.scss';

interface Props {
	item: SearchItem;
}

export default function SearchResultItem({ item }: Props) {
	const { title, link, snippet, thumbnail } = item;

	return (
		<li className="search-result">
			{ thumbnail
				? (
					<Picture src={ thumbnail } alt={ title } additionalClass="search-result__thumbnail" />
				)
				: <div className="search-result__thumbnail search-result__thumbnail--empty">Изображения нет</div> }
			<div className="search-result__body">
				<span className="title title--3 search-result__title">{ title }</span>
				{ snippet && <p className="search-result__snippet">{ snippet }</p> }
			</div>
			<Link className="link search-result__link" to={ link } target="_blank" />
		</li>
	);
}
