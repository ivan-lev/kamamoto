import type { RootState } from '@/slices/visitor';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import ExhibitCeramicStyle from '@/components/visitor/ExhibitView/ExhibitCeramicStyle';
import ExhibitDescription from '@/components/visitor/ExhibitView/ExhibitDescription';
import ExhibitPotterInfo from '@/components/visitor/ExhibitView/ExhibitPotterInfo';
import ExhibitSummary from '@/components/visitor/ExhibitView/ExhibitSummary';
import PageTop from '@/components/visitor/PageTop/PageTop';
import Preloader from '@/components/visitor/Preloader/Preloader';
import Seo from '@/components/visitor/Seo/Seo';
import Slider from '@/components/visitor/Slider/Slider';
import { setComplectations } from '@/slices/admin/complectations';
import { resetExhibit, setExhibit } from '@/slices/visitor/exhibit';
import { api } from '@/utils/api/api';
import { scrollToTop } from '@/utils/scrollToTop';
import { DESCRIPTION_DUMMY } from '@/variables/variables';

export default function ExhibitView() {
	const dispatch = useDispatch();
	const complectations = useSelector((state: RootState) => state.complectations.complectations);
	const exhibit = useSelector((state: RootState) => state.exhibit);
	const exhibitId = useParams().exhibit;
	const navigate = useNavigate();

	const [showPreloader, setShowPreloader] = useState<boolean>(true);
	const { additionalDescription, additionalImages, description, images, name, style, potter } = exhibit;

	useEffect(() => {
		if (complectations.length === 0) {
			api.complectation.getComplections()
				.then((complectations) => {
					dispatch(setComplectations(complectations));
				})
				.catch(error => console.error(error));
		}
	}, []);

	useLayoutEffect(() => scrollToTop(), []);

	useEffect(() => {
		if (exhibitId) {
			api.exhibits.getExhibitById(exhibitId)
				.then((response) => {
					dispatch(setExhibit(response));
					setShowPreloader(false);
				})
				.catch((error) => {
					console.error(error);
					setShowPreloader(false);

					if (error.status === 404) {
						navigate('/404', { replace: true });
					}
				});
		}

		return () => {
			if (exhibitId)
				dispatch(resetExhibit());
		};
	}, [exhibitId]);

	return (
		<>
			<Seo
				title={ `Камамото: ${name?.charAt(0).toLowerCase()}${name?.slice(1)}` }
				description={ `Страница на которой дана информация о предмете ${name?.charAt(0).toLowerCase()}${name?.slice(1)}, представлены фотографии и дана общая информация о виде данного ремесла` }
			/>

			{ showPreloader && <Preloader /> }
			{ !showPreloader
				&& (
					<>
						<PageTop title={ name } />
						<Slider slides={ images } />
						<ExhibitDescription data={ description || DESCRIPTION_DUMMY } />
						<ExhibitPotterInfo potter={ potter } />
						<ExhibitDescription data={ additionalDescription } title="Дополнительная информация" />
						<Slider slides={ additionalImages || [] } />
						<ExhibitCeramicStyle data={ style } />
						<ExhibitSummary exhibit={ exhibit } />
					</>
				) }
		</>
	);
}
