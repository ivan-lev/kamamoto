import type { Dispatch, SetStateAction } from 'react';
import type { CeramicStyle } from '@/types/ceramicStyles';
import { useDispatch } from 'react-redux';
import { setCeramicStyleToEdit, setIsExistingStyleEdited, updateCeramicStyle } from '@/slices/admin/ceramicStyles';
import { api } from '@/utils/api/api';
import { PATHS } from '@/variables/variables';

interface Props {
	style: CeramicStyle;
	setShowModal: Dispatch<SetStateAction<boolean>>;
}

export default function CeramicStylesRow({ style, setShowModal }: Props) {
	const dispatch = useDispatch();
	const { CERAMIC_STYLES } = PATHS;
	const link = `/${CERAMIC_STYLES}/${style.name}`;

	function handleSetCeramicStyleToEdit(data: CeramicStyle) {
		dispatch(setIsExistingStyleEdited(true));
		dispatch(setCeramicStyleToEdit(data));
		setShowModal(true);
	}

	async function toggleActivateStyle() {
		const token = localStorage.getItem('kmmttkn');
		if (token) {
			try {
				const response = await api.ceramicStyles.updateCeramicStyle(token, { ...style, showArticle: !style.showArticle }, style.name);
				dispatch(updateCeramicStyle(response));
			}
			catch (error: any) {
				console.error(error);
			}
		}
	}

	return (
		<div className="table__row">
			{ style.showArticle
				? <a className="link link_usual table__cell table__cell--span-2" href={ link } target="_blank">{ style.title }</a>
				: <span className="table__cell table__cell--span-2">{ style.title }</span> }
			<span className="table__cell table__cell--span-3">{ style.name }</span>
			<span className="table__cell table__cell--span-3">{ style.mapImage }</span>
			<span className="table__cell table__cell--span-2">{ style.thumbnail }</span>
			<div className="table__cell table__cell--centered">
				<button
					className="table__button table__button--edit"
					onClick={ () => handleSetCeramicStyleToEdit(style) }
				>
				</button>
			</div>
			<div className="table__cell table__cell--centered">
				<button
					className={ `checkbox-label checkbox-label--small ${style.showArticle ? 'checkbox-label--checked' : ''} ` }
					onClick={ toggleActivateStyle }
				>
				</button>
			</div>
		</div>
	);
}
