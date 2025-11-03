import type { ChangeEvent } from 'react';
import type { GlossarySection } from '@/variables/glossary';
import { useEffect, useLayoutEffect, useState } from 'react';
import PageTop from '@/components/PageTop/PageTop';
import Seo from '@/components/Seo/Seo';
import { glossary } from '@/variables/glossary';
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
			<Seo title="Камамото: глоссарий" />

			<PageTop title="Глоссарий" subtitle="В этом разделе собраны термины, которые могут встретиться в статьях о керамике и чайной церемонии, а также некоторые релевантные термины. Раздел находится в стадии разработки." />

			<section className="section glossary">
				<div className="glossary__filters">
					<div className="glossary__filter-query">
						<input
							className="input"
							type="text"
							name="title"
							placeholder="поиск: часть термина или описания"
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
				</div>

				<div className="glossary__list">
					{ glossaryFiltered.map((item) => {
						return (
							<div className="glossary__block" key={ item.letter }>
								<span className="glossary__letter">
									{ item.letter }
								</span>

								<div className="glossary__table">
									{ item.terms.map((term) => {
										return (
											<div className="glossary__row" key={ term.title }>
												<span className="glossary__cell glossary__cell--span-2 glossary__cell--title">{ term.title }</span>
												<span className="glossary__cell glossary__cell--span-2 glossary__cell--kanji">{ term.kanji }</span>
												<span className="glossary__cell glossary__cell--span-8 glossary__cell--definition">{ term.definition }</span>
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
