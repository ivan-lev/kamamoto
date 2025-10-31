import type { Potter } from '@/types/potter';
import parse from 'html-react-parser';
import Picture from '@/components/Picture/Picture';
import { htmlParserOptions } from '@/variables/htmlParserOptions';

interface Props {
	potter: Potter;
}

export default function PotterInfo({ potter }: Props) {
	return potter.info
		&& (
			<section className="section description description--block">
				<div className="section__header">
					<h2 className="title title--2">О мастере</h2>
				</div>
				{ potter.photo && (
					<Picture
						additionalClass="description__photo description__photo--left"
						src={ potter.photo }
						loading="lazy"
						alt="Фотография мастера"
						fallback="/images/error-potter.webp"
					/>
				) }

				{ potter.info && parse(potter.info, htmlParserOptions) }
			</section>
		);
}
