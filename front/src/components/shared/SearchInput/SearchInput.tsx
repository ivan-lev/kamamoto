import type * as React from 'react';
import { useState } from 'react';
import './SearchInput.scss';

interface Props {
	initialValue?: string;
	placeholder?: string;
	onSubmit: (query: string) => void;
}

// Управляемое поле поиска: Enter или кнопка со стрелкой отправляют форму,
// пустой запрос (и запрос из пробелов) не отправляется.
// Сам не ходит в API и не трогает URL — только вызывает onSubmit.
export default function SearchInput({ initialValue = '', placeholder = 'Поиск', onSubmit }: Props) {
	const [value, setValue] = useState<string>(initialValue);

	function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
		event.preventDefault();

		const query = value.trim();
		if (query === '')
			return;

		onSubmit(query);
	}

	return (
		<form className="search-input" onSubmit={ handleSubmit } action="/search">
			<input
				className="input search-input__field"
				type="text"
				name="q"
				value={ value }
				placeholder={ placeholder }
				onChange={ event => setValue(event.target.value) }
				aria-label="Поисковый запрос"
			/>
			<button className="button button--xs search-input__submit" type="submit" aria-label="Искать">
				<img className="button__icon search-input__icon" src="/__spritemap#sprite-arrow-up-view" alt="Искать" />
			</button>
		</form>
	);
}
