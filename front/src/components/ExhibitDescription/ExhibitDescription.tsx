import parse from 'html-react-parser';
import { htmlParserOptions } from '@/variables/htmlParserOptions';

interface Props {
	data?: string;
}

export default function ExhibitDescription({ data }: Props) {
	return data && (
		<section className="section description">
			{ data && parse(data, htmlParserOptions) }
		</section>
	);
}
