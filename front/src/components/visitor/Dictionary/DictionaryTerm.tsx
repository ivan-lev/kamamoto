import type { Term } from '@/types/term';
import parse from 'html-react-parser';
import Picture from '@/components/visitor/Picture/Picture';
import { htmlParserOptions } from '@/variables/htmlParserOptions';

interface Props {
	term: Term;
}

export default function DictionaryTerm({ term }: Props) {
	return (
		<div className="dictionary__row" key={ term.title }>
			<p className="dictionary__title" id={ term.id }>
				{ term.title }
			</p>

			<span className="dictionary__kanji">{ term.kanji }</span>

			{ term.image && <Picture src={ term.image } alt={ `Изображение к ${term.title}"` } additionalClass="dictionary__image" /> }

			<div className="dictionary__definition">
				{ parse(term.definition, htmlParserOptions) }
			</div>
		</div>
	);
}
