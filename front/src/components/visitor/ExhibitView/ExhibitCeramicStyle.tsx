import type { ExhibitVisitorStyle } from '@/types/exhibitType';
import parse from 'html-react-parser';
import Picture from '@/components/visitor/Picture/Picture';
import { htmlParserOptions } from '@/variables/htmlParserOptions';
import { PATHS } from '@/variables/variables';
import './ExhibitCeramicStyle.scss';

interface Props {
	data?: ExhibitVisitorStyle;
}

const style = { aspectRatio: 1, backgroundColor: 'transparent' };

export default function ExhibitCeramicStyle({ data }: Props) {
	const { CERAMIC_STYLES, USEFUL } = PATHS;
	return data?.description && (
		<section className="section exhibition-ceramic-style">
			<div className="container">

				<div className="description description--block">
					<Picture
						src={ `${data.mapImage || '/images/map-dummy.svg'}` }
						alt="Локация гончарного центра"
						additionalClass="description__photo description__photo--right"
						style={ style }
						fallback="/images/map-error.svg"
					/>

					{ parse(data.description, htmlParserOptions) }

					{ data.showArticle && <a href={ `/${USEFUL}/${CERAMIC_STYLES}/${data.name}` } target="_blank" className="button exhibition-ceramic-style__button">Читать большую статью</a> }
				</div>

			</div>
		</section>
	);
}
