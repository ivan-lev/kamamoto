import parse from 'html-react-parser';
import { htmlParserOptions } from '@/variables/htmlParserOptions';

interface Props {
	potterInfo?: string;
	potterPhoto?: string;
}

export default function PotterInfo({ potterInfo, potterPhoto }: Props) {
	return potterInfo
		&& (
			<section className="section description description--block">
				{ potterPhoto && (
					<img
						className="description__photo"
						src={ potterPhoto }
						loading="lazy"
						alt="Фотография мастера"
						onError={ e => (e.currentTarget.src = '/images/error-potter.webp') }
					>
					</img>
				) }

				{ potterInfo && parse(potterInfo, htmlParserOptions) }
			</section>
		);
}
