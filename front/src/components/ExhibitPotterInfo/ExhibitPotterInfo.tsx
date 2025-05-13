import { htmlParserOptions } from '@/variables/htmlParserOptions';
import parse from 'html-react-parser';

interface Props {
	potterInfo?: string;
	potterPhoto?: string;
}

export default function ExhibitPotterInfo({ potterInfo, potterPhoto }: Props) {
	return potterInfo
		&& (
			<div className="description description--block">
				{potterPhoto && (
					<img
						className="description__photo"
						src={potterPhoto}
					>
					</img>
				)}

				{potterInfo && parse(potterInfo, htmlParserOptions)}
			</div>
		);
}
