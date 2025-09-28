import parse from 'html-react-parser';
import Picture from '@/components/Picture/Picture';
import { htmlParserOptions } from '@/variables/htmlParserOptions';

interface Props {
	potterInfo?: string;
	potterPhoto?: string;
}

export default function PotterInfo({ potterInfo, potterPhoto }: Props) {
	return potterInfo
		&& (
			<section className="section description description--block">
				<div className="section__header">
					<h2 className="title title--2">О мастере</h2>
				</div>
				{ potterPhoto && (
					<Picture
						additionalClass="description__photo description__photo--left"
						src={ potterPhoto }
						loading="lazy"
						alt="Фотография мастера"
						fallback="/images/error-potter.webp"
					/>
				) }

				{ potterInfo && parse(potterInfo, htmlParserOptions) }
			</section>
		);
}
