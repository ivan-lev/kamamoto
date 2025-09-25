import type { CeramicStyle } from '@/types/ceramicStyles';
import parse from 'html-react-parser';
import { htmlParserOptions } from '@/variables/htmlParserOptions';
import './StyleDescription.scss';

interface Props {
	data?: CeramicStyle;
}

const style = { aspectRatio: 1 };

export default function StyleDescription({ data }: Props) {
	return data?.brief && (
		<section className="section ceramic-style">
			<div className="container container--grid">
				<div className="description ceramic-style__text">
					{ parse(data?.brief, htmlParserOptions) }
				</div>
				<div className="description ceramic-style__map">
					<img
						src={ `http://localhost:3000/static/maps/${data.mapImage ? data.mapImage : 'dummy.svg'}` }
						alt="Локация гончарного центра"
						className="ceramic-style__map"
						style={ style }
						onError={ e => (e.currentTarget.src = 'http://localhost:3000/static/maps/dummy.svg') }
					/>
				</div>
			</div>
		</section>
	);
}
