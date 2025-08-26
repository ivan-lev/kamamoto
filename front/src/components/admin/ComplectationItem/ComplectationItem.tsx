import type { RootState } from '@/slices/admin';
import { useDispatch, useSelector } from 'react-redux';
import { setExhibitToEdit } from '@/slices/admin/ehxibits';

interface Props {
	complectation: { name: string, title: string };
}

export default function ComplectationItem({ complectation }: Props) {
	const dispatch = useDispatch();
	const exhibitToEdit = useSelector((state: RootState) => state.exhibits.exhibitToEdit);

	function onClick() {
		const exhibitComplectationArray = exhibitToEdit.complectation;
		if (exhibitComplectationArray?.some(exhibitComplectation => exhibitComplectation === complectation.name)) {
			const newComplectation = exhibitComplectationArray?.filter(exhibitComplectation => exhibitComplectation !== complectation.name);
			dispatch(setExhibitToEdit({ ...exhibitToEdit, complectation: newComplectation }));
		}
		else {
			dispatch(setExhibitToEdit({ ...exhibitToEdit, complectation: [...exhibitComplectationArray, complectation.name] }));
		}
	};
	return (
		<span
			className={ `complectation ${exhibitToEdit.complectation?.some(exhibitComplectation => exhibitComplectation === complectation.name) && 'active'}` }
			onClick={ onClick }
		>
			{ complectation.title }
		</span>
	);
}
