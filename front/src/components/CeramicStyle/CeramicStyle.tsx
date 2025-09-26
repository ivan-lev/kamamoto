import type { CeramicStyle } from '@/types/ceramicStyles';
import parse from 'html-react-parser';
import Picture from '@/components/Picture/Picture';
import { htmlParserOptions } from '@/variables/htmlParserOptions';

interface Props {
	data?: CeramicStyle;
}

const style = { aspectRatio: 1, backgroundColor: 'transparent' };

export default function StyleDescription({ data }: Props) {
	return data?.brief && (
		<section className="section ceramic-style">
			<div className="container">

				<div className="description description--block">
					<Picture
						src={ `https://kamamoto.ru/static/maps/${data.mapImage ? data.mapImage : 'dummy.svg'}` }
						alt="Локация гончарного центра"
						additionalClass="description__photo description__photo--right"
						style={ style }
						fallback="https://kamamoto.ru/static/maps/dummy.svg"
					/>
					{ parse(data?.brief, htmlParserOptions) }
				</div>

			</div>
		</section>
	);
}
