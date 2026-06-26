import type { DictionarySection, Term } from '@/variables/useful/dictionary/dictionary.types';
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

	function filterDictionaryByQuery() {
		if (query === '')
			resetFilters();

		const querySanitized = query.trim().toLowerCase();
		const filteredList: DictionarySection[] = [];

		const matches = (term: Term) =>
			term.title.toLowerCase().includes(querySanitized)
			|| term.definition.toLowerCase().includes(querySanitized)
			|| term.romaji?.toLowerCase().includes(querySanitized)
			|| term.kanji.includes(querySanitized);

		dictionary.forEach((dictionarySection) => {
			const { letter, terms } = dictionarySection;
			const filteredTerms = terms.filter(matches);

			if (filteredTerms.length > 0) {
				filteredList.push({ letter, terms: filteredTerms });
			}
		});

		setDictionaryFiltered(filteredList);
	}

	function filterDictionaryByLetter(letter: string) {
		if (query !== '')
			setQuery('');

		const filteredDictionary = dictionary.filter(dictionarySection =>
			dictionarySection.letter === letter);

		setDictionaryFiltered(filteredDictionary);
	};

	function resetFilters() {
		setQuery('');
		setDictionaryFiltered(dictionary);
	}

	useEffect(() => {
		filterDictionaryByQuery();
	}, [query]);

	useEffect(() => {
		document.querySelector('#dictionary')?.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});
	}, [dictionaryFiltered]);

	useLayoutEffect(() => scrollToTop(), []);

	return (
		<>
			<Seo title="Камамото: глоссарий" description="Страница с терминами, связанными с японской керамикой и чайной церемонией, а также релевантные термины" />

			<PageTop
				title="Глоссарий"
				subtitle="На этой странице собраны термины, которые могут встретиться в статьях о керамике и чайной церемонии, а также некоторые релевантные термины."
				backLink="/useful/"
			/>

			<section className="section dictionary" id="dictionary">
				<p>
					<span>Поиск работает на русском языке и по иероглифам. P.S.: помните, что в написании японских слов используется </span>
					<a className="link link_usual" target="_blank" href="https://ru.wikipedia.org/wiki/%D0%A1%D0%B8%D1%81%D1%82%D0%B5%D0%BC%D0%B0_%D0%9F%D0%BE%D0%BB%D0%B8%D0%B2%D0%B0%D0%BD%D0%BE%D0%B2%D0%B0">система Поливанова</a>
					<span> (например, используется буква 'э', а не 'е' и т.д.)</span>
				</p>
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
