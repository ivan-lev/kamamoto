import type { DictionarySection } from '@/variables/useful/dictionary/dictionary.types';
import { useEffect, useLayoutEffect, useState } from 'react';
import DictionaryBlock from '@/components/visitor/Dictionary/DictionatyBlock';
import PageTop from '@/components/visitor/PageTop/PageTop';
import Seo from '@/components/visitor/Seo/Seo';
import { scrollToTop } from '@/utils/scrollToTop';
import { dictionary } from '@/variables/useful/dictionary/_index';
import './Dictionary.scss';

export default function Dictionary() {
	const [query, setQuery] = useState<string>('');
	const [dictionaryFiltered, setDictionaryFiltered] = useState<DictionarySection[]>(dictionary);

	useEffect(() => {
		document.querySelector('#dictionary')?.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});
	}, [dictionaryFiltered]);

	function filterDictionaryByQuery() {
		if (query === '')
			resetFilters();

		const filteredList: DictionarySection[] = [];

		dictionary.forEach((dictionarySection) => {
			const { letter, terms } = dictionarySection;
			const filteredTerms = terms.filter(term =>
				term.title.toLowerCase().includes(query.toLowerCase()) || term.definition.toLowerCase().includes(query));
			if (filteredTerms.length > 0) {
				filteredList.push({ letter, terms: filteredTerms });
			}
			setDictionaryFiltered(filteredList);
		});
	}

	function filterDictionaryByLetter(letter: string) {
		if (query !== '')
			setQuery('');

		const filteredDictionary = dictionary.filter(dictionarySection => dictionarySection.letter === letter);
		setDictionaryFiltered(filteredDictionary);
	};

	function resetFilters() {
		setQuery('');
		setDictionaryFiltered(dictionary);
	}

	useEffect(() => {
		filterDictionaryByQuery();
	}, [query]);

	useLayoutEffect(() => scrollToTop(), []);

	return (
		<>
			<Seo title="Камамото: глоссарий" description="Страница с терминами, связанными с японской керамикой и чайной церемонией, а также релевантные термины" />

			<PageTop
				title="Глоссарий"
				subtitle="На этой странице собраны термины, которые могут встретиться в статьях о керамике и чайной церемонии, а также некоторые релевантные термины. P.S.: помните, что в написании японских слов используется система Поливанова (например, используется буква 'э', а не 'е' и т.д.)"
				backLink="/useful/"
			/>

			<section className="section dictionary" id="dictionary">
				<div className="dictionary__filters">
					<div className="dictionary__filter-query">
						<input
							className="input"
							type="text"
							name="title"
							placeholder="поиск: термин или описание"
							value={ query }
							onChange={ event => setQuery(event.target.value) }
						/>
					</div>

					<div className="dictionary__filter-letters">
						{ dictionary.map((section) => {
							return (
								<span
									className="dictionary__filter-letter"
									key={ section.letter }
									onClick={ () => filterDictionaryByLetter(section.letter) }
								>
									{ section.letter }
								</span>
							);
						}) }
					</div>

					<button className="button dictionary__reset-button" onClick={ resetFilters }>Сбросить</button>
				</div>

				<div className="dictionary__list">
					{ dictionaryFiltered.map(section => <DictionaryBlock section={ section } key={ section.letter } />) }
				</div>
			</section>
		</>
	);
}
