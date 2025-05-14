import type { CeramicStyle } from '@/types/ceramicStyles';
import { htmlParserOptions } from '@/variables/htmlParserOptions';
import parse from 'html-react-parser';

interface Props {
	data?: CeramicStyle;
}

export default function ExhibitStyleDescription({ data }: Props) {
	return data?.brief && (
		<section className="section ceramic-style">
			<div className="container">
				<div className="description">
					{parse(data?.brief, htmlParserOptions)}
				</div>
			</div>
		</section>
	);
}
