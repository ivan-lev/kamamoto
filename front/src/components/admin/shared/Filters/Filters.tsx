import SearchFilter from '@/components/admin/shared/SearchFilter/SearchFilter';
import './Filters.scss';

interface Props {
	query: string;
	searchPlaceholder: string;
	onQueryChange: (query: string) => void;
}

// Панель фильтров над таблицами админки; сюда же будут добавляться другие фильтры
export default function Filters({ query, searchPlaceholder, onQueryChange }: Props) {
	return (
		<div className="filters">
			<SearchFilter
				value={ query }
				placeholder={ searchPlaceholder }
				onChange={ onQueryChange }
			/>
		</div>
	);
}
