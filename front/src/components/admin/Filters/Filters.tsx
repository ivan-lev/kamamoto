import type { ChangeEvent } from 'react';
import type { RootState } from '@/slices/admin';
import type { Exhibit } from '@/types/exhibitType';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setExhibitsFiltered } from '@/slices/admin/ehxibits';
import './Filters.scss';

export default function Filters() {
	const dispatch = useDispatch();
	const exhibits = useSelector((state: RootState) => state.exhibits.exhibits);
	const [query, setQuery] = useState<string>('');

	function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		const { value } = event.target;
		setQuery(value);
	};

	function filterExhibits() {
		if (query === '') {
			dispatch(setExhibitsFiltered(exhibits));
			return;
		}

		const filteredList: Exhibit[] = exhibits.filter(exhibit => exhibit.name.includes(query) || exhibit.id.toString().includes(query));
		dispatch(setExhibitsFiltered(filteredList));
	}

	useEffect(() => {
		filterExhibits();
	}, [query, exhibits]);

	return (
		<div className="filters">
			<input
				className="input"
				type="text"
				name="title"
				placeholder="поиск: часть названия или номер лота"
				value={ query }
				onChange={ handleChange }
			/>
		</div>
	);
}
