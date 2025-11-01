import PageTop from '@/components/PageTop/PageTop';
import Seo from '@/components/Seo/Seo';
import { glossary } from '@/variables/glossary';
import './Glossary.scss';

export default function Glossary() {
	return (
		<>
			<Seo title="Камамото: глоссарий" />

			<PageTop title="Глоссарий" subtitle="В этом разделе собраны термины, которые могут встретиться в статьях о керамике и чайной церемонии, а также некоторые релевантные термины. Раздел находится в стадии разработки." />
			<section className="section glossary">
				{ glossary.map((item) => {
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

			</section>
		</>
	);
}
