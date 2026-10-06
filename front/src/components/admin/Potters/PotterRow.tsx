import type { Dispatch, SetStateAction } from 'react';
import type { Potter } from '@/types/potter';
import { useDispatch } from 'react-redux';
import { setIsExistingPotterEdited, setPotterToEdit, updatePotter } from '@/slices/admin/potters';
import { api } from '@/utils/api/api';
import { storage } from '@/utils/storage';
import { STORAGE_KEYS } from '@/variables/variables';

interface Props {
	potter: Potter;
	setShowModal: Dispatch<SetStateAction<boolean>>;
}

export default function PotterRow({ potter, setShowModal }: Props) {
	const dispatch = useDispatch();
	// публичная страница гончара — /lnt-potters/:potter, отдельной константы в PATHS нет
	const link = `/lnt-potters/${potter.id}`;

	function handleSetPotterToEdit(data: Potter) {
		dispatch(setIsExistingPotterEdited(true));
		dispatch(setPotterToEdit(data));
		setShowModal(true);
	}

	async function toggleShowArticle() {
		const token = storage.get<string>(STORAGE_KEYS.TOKEN);
		if (token) {
			try {
				const response = await api.potters.updatePotter(token, { ...potter, showArticle: !potter.showArticle });
				dispatch(updatePotter(response));
			}
			catch (error) {
				console.error(error);
			}
		}
	}

	return (
		<div className="table__row">
			{ potter.showArticle
				? <a className="link link_usual table__cell table__cell--span-4" href={ link } target="_blank">{ potter.name }</a>
				: <span className="table__cell table__cell--span-4">{ potter.name }</span> }
			<span className="table__cell table__cell--span-3">{ potter.id }</span>

			<span className="table__cell table__cell--span-3">{ potter.japaneseName }</span>
			<div className="table__cell table__cell--centered">
				<button
					className={ `checkbox-label checkbox-label--small ${potter.showArticle ? 'checkbox-label--checked' : ''} ` }
					onClick={ toggleShowArticle }
				>
				</button>
			</div>
			<div className="table__cell table__cell--centered">
				<button
					className="table__button table__button--edit"
					onClick={ () => handleSetPotterToEdit(potter) }
				>
				</button>
			</div>
		</div>
	);
}
