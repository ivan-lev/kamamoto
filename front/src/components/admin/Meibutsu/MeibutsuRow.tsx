import type { Dispatch, SetStateAction } from 'react';
import type { Meibutsu } from '@/types/meibutsu';
import { useDispatch } from 'react-redux';
import { setIsExistingMeibutsuEdited, setMeibutsuToEdit, updateMeibutsu } from '@/slices/admin/meibutsu';
import { api } from '@/utils/api/api';
import { storage } from '@/utils/storage';
import { PATHS, STORAGE_KEYS } from '@/variables/variables';

interface Props {
	meibutsu: Meibutsu;
	setShowModal: Dispatch<SetStateAction<boolean>>;
}

export default function MeibutsuRow({ meibutsu, setShowModal }: Props) {
	const dispatch = useDispatch();
	const link = `/${PATHS.MEIBUTSU}/${meibutsu.id}`;

	function handleSetMeibutsuToEdit(data: Meibutsu) {
		dispatch(setIsExistingMeibutsuEdited(true));
		dispatch(setMeibutsuToEdit(data));
		setShowModal(true);
	}

	async function toggleShowArticle() {
		const token = storage.get<string>(STORAGE_KEYS.TOKEN);
		if (token) {
			try {
				const response = await api.meibutsu.updateMeibutsu(token, { ...meibutsu, showArticle: !meibutsu.showArticle }, meibutsu.id);
				dispatch(updateMeibutsu(response));
			}
			catch (error) {
				console.error(error);
			}
		}
	}

	return (
		<div className="table__row">
			{ meibutsu.showArticle
				? <a className="link link_usual table__cell table__cell--span-4" href={ link } target="_blank">{ meibutsu.name }</a>
				: <span className="table__cell table__cell--span-4">{ meibutsu.name }</span> }
			<span className="table__cell table__cell--span-3">{ meibutsu.id }</span>

			<span className="table__cell table__cell--span-3">{ meibutsu.japaneseName }</span>
			<div className="table__cell table__cell--centered">
				<button
					className={ `checkbox-label checkbox-label--small ${meibutsu.showArticle ? 'checkbox-label--checked' : ''} ` }
					onClick={ toggleShowArticle }
				>
				</button>
			</div>
			<div className="table__cell table__cell--centered">
				<button
					className="table__button table__button--edit"
					onClick={ () => handleSetMeibutsuToEdit(meibutsu) }
				>
				</button>
			</div>
		</div>
	);
}
