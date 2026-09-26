import type { Dispatch, SetStateAction } from 'react';
import type { Potter } from '@/types/potter';
import { useDispatch } from 'react-redux';
import { setIsExistingPotterEdited, setPotterToEdit } from '@/slices/admin/potters';

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

	return (
		<div className="table__row">
			<span className="table__cell table__cell--span-3">{ potter.id }</span>
			{ potter.showArticle
				? <a className="link link_usual table__cell table__cell--span-4" href={ link } target="_blank">{ potter.name }</a>
				: <span className="table__cell table__cell--span-4">{ potter.name }</span> }
			<span className="table__cell table__cell--span-4">{ potter.japaneseName }</span>
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
