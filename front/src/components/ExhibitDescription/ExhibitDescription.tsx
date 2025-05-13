import { htmlParserOptions } from '@/variables/htmlParserOptions';
import parse from 'html-react-parser';

interface Props {
	data?: string;
}

export default function ExhibitDescription({ data }: Props) {
	return data && (
		<div className="description">
			{data && parse(data, htmlParserOptions)}
		</div>
	);
}
