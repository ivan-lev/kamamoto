import type { CeramicStyle } from '@/types/ceramicStyles';
import { PATHS } from '@/variables/variables';

interface Props {
	style: CeramicStyle;
	action: (data: CeramicStyle) => void;
}

export default function CeramicStylesRow({ style, action }: Props) {
	const { USEFUL, CERAMIC_STYLES } = PATHS;
	const link = `/${USEFUL}/${CERAMIC_STYLES}/${style.name}`;

	return (
		<div className="table__row">
			{ style.showArticle
				? <a className="link link_usual table__cell table__cell--span-2" href={ link }>{ style.title }</a>
				: <span className="table__cell table__cell--span-2">{ style.title }</span> }
			<span className="table__cell table__cell--span-3">{ style.name }</span>
			<span className="table__cell table__cell--span-3">{ style.mapImage }</span>
			<span className="table__cell table__cell--span-3">{ style.thumbnail }</span>
			<div className="table__cell table__cell--centered">
				<button
					className="table__button table__button--edit"
					onClick={ () => action(style) }
				>
				</button>
			</div>
		</div>
	);
}
