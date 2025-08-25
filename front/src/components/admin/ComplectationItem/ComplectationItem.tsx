import type { RootState } from '@/slices/admin';
import { useSelector } from 'react-redux';

interface Props {
	name: string;
}

export default function ComplectationItem({ name }: Props) {
	const complectations = useSelector((state: RootState) => state.complectations.complectations);
	const item = complectations.find(complectation => complectation.name === name);
	return (
		<span
			className={ `complectation ${complectations.some(complectation => complectation.name === name) && 'active'}` }
		>
			{ item?.title || name }
		</span>
	);
}
