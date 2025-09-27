import parse from 'html-react-parser';
import { htmlParserOptions } from '@/variables/htmlParserOptions';

interface Props {
	data?: string;
	title?: string;
}

export default function ExhibitDescription({ data, title }: Props) {
	return data && (
		<section className="section description">
			{ title && (
				<div className="section__header">
					<h2 className="section__title">{ title }</h2>
				</div>
			) }
			{ data && parse(data, htmlParserOptions) }
		</section>
	);
}
