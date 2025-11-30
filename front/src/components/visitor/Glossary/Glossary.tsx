import type { ChangeEvent } from 'react';
import type { GlossarySection } from '@/variables/glossary';
import parse from 'html-react-parser';
import { useEffect, useLayoutEffect, useState } from 'react';
import PageTop from '@/components/visitor/PageTop/PageTop';
import Seo from '@/components/visitor/Seo/Seo';
import { glossary } from '@/variables/glossary';
import { htmlParserOptions } from '@/variables/htmlParserOptions';
import './Glossary.scss';

export default function Glossary() {
	const [query, setQuery] = useState<string>('');
	const [glossaryFiltered, setGlossaryFiltered] = useState<GlossarySection[]>(glossary);

	function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		const { value } = event.target;
		setQuery(value);
	};

	function filterGlossaryByQuery() {
		if (query === '')
			return;

		const filteredList: GlossarySection[] = [];

		glossary.forEach((glossarySection) => {
			const { letter, terms } = glossarySection;
			const filteredTerms = terms.filter(term =>
				term.title.toLowerCase().includes(query.toLowerCase()) || term.definition.toLowerCase().includes(query));
			if (filteredTerms.length > 0) {
				filteredList.push({ letter, terms: filteredTerms });
			}
			setGlossaryFiltered(filteredList);
		});
	}

	function filterGlossaryByLetter(letter: string) {
		if (query !== '')
			setQuery('');

		const filteredGlossary = glossary.filter(glossarySection => glossarySection.letter === letter);
		setGlossaryFiltered(filteredGlossary);
	};

	function resetFilters() {
		setQuery('');
		setGlossaryFiltered(glossary);
	}

	useEffect(() => {
		filterGlossaryByQuery();
	}, [query]);

	useLayoutEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'instant',
		});
	}, []);

	return (
		<>
			<Seo title="Камамото: глоссарий" description="Страница с терминами, связанными с японской керамикой и чайной церемонией, а также релевантные термины" />

			<PageTop title="Глоссарий" subtitle="В этом разделе собраны термины, которые могут встретиться в статьях о керамике и чайной церемонии, а также некоторые релевантные термины. Раздел находится в стадии разработки. P.S.: помните, что в написании японских слов используется 'э', а не 'е'" />

			<section className="section glossary">
				<div className="glossary__filters">
					<div className="glossary__filter-query">
						<input
							className="input"
							type="text"
							name="title"
							placeholder="поиск: термин или описание"
							value={ query }
							onChange={ handleChange }
						/>
					</div>

					<div className="glossary__filter-letters">
						{ glossary.map((section) => {
							return (
								<span
									key={ section.letter }
									onClick={ () => filterGlossaryByLetter(section.letter) }
								>
									{ section.letter }
								</span>
							);
						}) }
					</div>

					<button className="button glossary__reset-button" onClick={ resetFilters }>Сбросить</button>
				</div>

				<div className="glossary__list">
					{ glossaryFiltered.map((section) => {
						return (
							<div className="glossary__block" key={ section.letter }>
								<span className="glossary__letter">
									{ section.letter }
								</span>

								<div className="glossary__table text">
									{ section.terms.map((term) => {
										return (
											<div className="glossary__row" key={ term.title }>
												<div className="glossary__cell glossary__cell--span-2 glossary__cell--title">
													{ parse(term.title, htmlParserOptions) }
												</div>
												<span className="glossary__cell glossary__cell--span-2 glossary__cell--kanji">{ term.kanji }</span>
												<div className="glossary__cell glossary__cell--span-8 glossary__cell--definition">
													{ parse(term.definition, htmlParserOptions) }
												</div>
											</div>
										);
									}) }
								</div>
							</div>
						);
					}) }
				</div>
			</section>
		</>
	);
}
