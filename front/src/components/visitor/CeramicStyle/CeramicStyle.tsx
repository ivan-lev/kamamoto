import type { CeramicStyle } from '@/types/ceramicStyles';
import parse from 'html-react-parser';
import Picture from '@/components/visitor/Picture/Picture';
import { htmlParserOptions } from '@/variables/htmlParserOptions';

const mode = import.meta.env.MODE;

const URL = mode !== 'production' ? 'http://localhost:3000/static/' : 'https://kamamoto.ru/static/';

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
						src={ `${URL}/maps/${data.mapImage ? data.mapImage : 'dummy.svg'}` }
						alt="Локация гончарного центра"
						additionalClass="description__photo description__photo--right"
						style={ style }
						fallback={ `${URL}/maps/error.svg` }
					/>
					{ parse(data?.brief, htmlParserOptions) }
				</div>

			</div>
		</section>
	);
}
