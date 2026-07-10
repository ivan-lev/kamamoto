import parse from 'html-react-parser';
import { htmlParserOptions } from '@/variables/htmlParserOptions';
import './TermsList.scss';

export interface Term {
	title: string;
	kanji: string;
	description: string;
	image?: string;
}

interface Props {
	items: Term[];
}

export default function TermsList({ items }: Props) {
	return (
		<div className="terms-list">
			{ items.map((item) => {
				return (
					<div className="terms-list__item" key={ item.title }>
						<div className="terms-list__title">{ parse(item.title, htmlParserOptions) }</div>
						<span className="terms-list__japanese-title">{ item.kanji }</span>
						{ item.image && <img src={ item.image } className="terms-list__image" /> }

						<div className="terms-list__description">
							{ parse(item.description, htmlParserOptions) }
						</div>
					</div>
				);
			}) }
		</div>
	);
}
