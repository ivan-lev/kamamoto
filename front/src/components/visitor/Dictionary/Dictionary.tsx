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

	function countTerms() {
		return dictionary.reduce((count, section) => count + section.terms.length, 0);
	}

	function scrollToFilters(behavior: ScrollBehavior = 'smooth') {
		document.querySelector('#dictionary')?.scrollIntoView({
			behavior,
			block: 'start',
		});
	}

	function filterDictionaryByQuery() {
		if (query === '') {
			resetFilters();
			return;
		}

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
		scrollToFilters();
	}

	function filterDictionaryByLetter(letter: string) {
		if (query !== '')
			setQuery('');

		const filteredDictionary = dictionary.filter(dictionarySection =>
			dictionarySection.letter === letter);

		setDictionaryFiltered(filteredDictionary);
		scrollToFilters();
	};

	function resetFilters() {
		setQuery('');
		setDictionaryFiltered(dictionary);
	}

	function onResetButton() {
		resetFilters();
		scrollToFilters('instant');
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
				subtitle="На этой странице собраны термины, которые могут встретиться в статьях о керамике и о чайной церемонии, а также всё релевантное этим темам. Здесь можно узнать об интересных нюансах, связанных с вашей вещью: как называются приёмы и эффекты, запечатлённые на вашей чаше, пиале, вазе и т.д. Для удобства каждый термин дополнен изображением, которое отражает его суть, но оно может визуально отличаться от того, как это выглядит конкретно на ващей вещи."
				backLink="/useful/"
			/>

			<section className="section dictionary" id="dictionary">
				<p className="text">
					{ `На данный момент терминов в словаре ${countTerms()}. Поиск работает на русском и английском языке, а также по иероглифам. P.S.: помните, что в написании японских слов используется ` }
					<a className="link link_usual" target="_blank" href="https://ru.wikipedia.org/wiki/%D0%A1%D0%B8%D1%81%D1%82%D0%B5%D0%BC%D0%B0_%D0%9F%D0%BE%D0%BB%D0%B8%D0%B2%D0%B0%D0%BD%D0%BE%D0%B2%D0%B0">система Поливанова</a>
					{ ' (например, используется буква "э", а не "е" и т.д.)' }
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

					<button className="button dictionary__reset-button" onClick={ onResetButton }>
						Сбросить
					</button>
				</div>

				<div className="dictionary__list">
					{ dictionaryFiltered.map(section => <DictionaryBlock section={ section } key={ section.letter } />) }
				</div>
			</section>
		</>
	);
}
