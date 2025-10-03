import type { RootState } from '@/slices/visitor';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CeramicStyle from '@/components/CeramicStyle/CeramicStyle';
import ExhibitDescription from '@/components/ExhibitDescription/ExhibitDescription';
import PageTop from '@/components/PageTop/PageTop';
import PotterInfo from '@/components/PotterInfo/PotterInfo';
import Preloader from '@/components/Preloader/Preloader';
import Seo from '@/components/Seo/Seo';
import Slider from '@/components/Slider/Slider';
import Summary from '@/components/Summary/Summary';
import { setComplectations } from '@/slices/admin/complectations';
import { resetExhibit, setExhibit } from '@/slices/visitor/exhibit';
import { api } from '@/utils/api/api';
import { DESCRIPTION_DUMMY } from '@/variables/variables';

export default function ExhibitView() {
	const dispatch = useDispatch();
	const complectations = useSelector((state: RootState) => state.complectations.complectations);
	const exhibit = useSelector((state: RootState) => state.exhibit);
	const exhibitId = useParams().exhibit;
	const navigate = useNavigate();

	const [showPreloader, setShowPreloader] = useState<boolean>(true);
	const { additionalDescription, additionalImages, description, images, name, style, potterInfo, potterPhoto } = exhibit;

	useEffect(() => {
		if (complectations.length === 0) {
			api.complectation.getComplections()
				.then((complectations) => {
					dispatch(setComplectations(complectations));
				})
				.catch(error => console.error(error));
		}
	}, []);

	useLayoutEffect(() => {
		window.scrollTo(0, 0);
	});

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
			<Seo title={ `Камамото: ${name?.charAt(0).toLowerCase()}${name?.slice(1)}` } />

			{ showPreloader && <Preloader /> }
			{ !showPreloader
				&& (
					<>
						<PageTop title={ name } />
						<Slider slides={ images } />
						<ExhibitDescription data={ description || DESCRIPTION_DUMMY } />
						<PotterInfo potterInfo={ potterInfo } potterPhoto={ potterPhoto } />
						<ExhibitDescription data={ additionalDescription } title="Дополнительная информация" />
						<Slider slides={ additionalImages || [] } />
						<CeramicStyle data={ style } />
						<Summary exhibit={ exhibit } />
					</>
				) }
		</>
	);
}
