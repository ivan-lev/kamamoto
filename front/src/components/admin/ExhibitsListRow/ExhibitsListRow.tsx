import type { RootState } from '@/slices/admin';
import type { Exhibit } from '@/types/exhibitType';
import { useDispatch, useSelector } from 'react-redux';
import { setExhibits, setExhibitToEdit, setIsExistingExhibitEdited } from '@/slices/admin/exhibits';
import { api } from '@/utils/api/api';

interface Props {
	exhibit: Exhibit;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ExhibitsListRow({ exhibit, setShowModal }: Props) {
	const dispatch = useDispatch();

	const exhibits = useSelector((state: RootState) => state.exhibits.exhibits);

	function handleSetExhibitToEdit(data: Exhibit) {
		dispatch(setIsExistingExhibitEdited(true));
		dispatch(setExhibitToEdit(data));
		setShowModal(true);
	}

	async function toggleExhibitActiveState(exhibit: Exhibit) {
		const token = localStorage.getItem('kmmttkn');
		try {
			const response = await api.exhibits.toggleExhibitActiveState(token || '', { ...exhibit, isActive: !exhibit.isActive });

			const newExhibitsList = exhibits.map((exhibit) => {
				return response.id !== exhibit.id ? exhibit : response;
			});
			dispatch(setExhibits(newExhibitsList));
		}
		catch (error) {
			console.error(error);
		};
	}

	return (
		<div className="table__row" key={ exhibit.id }>
			<span className="table__cell">{ exhibit.id }</span>
			<span className="table__cell table__cell--span-5">{ exhibit.name }</span>
			<span className="table__cell table__cell--span-2">{ exhibit.category.title }</span>
			<span className="table__cell table__cell--span-2">{ exhibit.style?.title }</span>
			<div className="table__cell table__cell--centered">
				<button
					className="table__button table__button--edit"
					onClick={ () => handleSetExhibitToEdit(exhibit) }
				>
				</button>
			</div>
			<div className="form__row form__row-1">
				<label className={ `checkbox-label checkbox-label--small ${exhibit.isActive ? 'checkbox-label--checked' : ''} ` }>
					<input
						className="checkbox-input"
						type="checkbox"
						checked={ exhibit.isActive }
						name="isActive"
						onChange={ () => toggleExhibitActiveState(exhibit) }
					/>
				</label>
			</div>
		</div>
	);
}
