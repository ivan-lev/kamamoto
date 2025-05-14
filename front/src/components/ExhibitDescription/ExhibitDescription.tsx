import { htmlParserOptions } from '@/variables/htmlParserOptions';
import parse from 'html-react-parser';

interface Props {
	data?: string;
}

export default function ExhibitDescription({ data }: Props) {
	return data && (
		<section className="section description">
			{data && parse(data, htmlParserOptions)}
		</section>
	);
}
