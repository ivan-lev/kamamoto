import type { DictionarySection } from '@/variables/useful/dictionary/dictionary.types';
import DictionaryTerm from '@/components/visitor/Dictionary/DictionaryTerm';

interface Props {
	section: DictionarySection;
}

export default function DictionaryBlock({ section }: Props) {
	return (
		<div className="dictionary__block">
			<span className="dictionary__letter">
				{ section.letter }
			</span>

			<div className="dictionary__table text">
				{ section.terms.map(term => <DictionaryTerm term={ term } key={ term.title } />) }
			</div>
		</div>
	);
}
