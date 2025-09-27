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
					<h1 className="title title--1">{ title }</h1>
				</div>
			) }
			{ data && parse(data, htmlParserOptions) }
		</section>
	);
}
