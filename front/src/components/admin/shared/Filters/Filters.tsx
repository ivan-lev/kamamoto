import type { ReactNode } from 'react';
import './Filters.scss';

interface Props {
	query: string;
	searchPlaceholder: string;
	onQueryChange: (query: string) => void;
	children?: ReactNode;
}

// Панель фильтров над таблицами админки; сюда же будут добавляться другие фильтры через children
export default function Filters({ query, searchPlaceholder, onQueryChange, children }: Props) {
	return (
		<div className="filters">
			<input
				className="input filters__search"
				type="text"
				placeholder={ searchPlaceholder }
				value={ query }
				onChange={ e => onQueryChange(e.target.value) }
			/>
			{ children }
		</div>
	);
}
