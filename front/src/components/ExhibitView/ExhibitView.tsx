import type { RootState } from '@/slices/visitor';
import ExhibitDescription from '@/components/ExhibitDescription/ExhibitDescription';
import ExhibitPotterInfo from '@/components/ExhibitPotterInfo/ExhibitPotterInfo';
import ExhibitStyleDescription from '@/components/ExhibitStyleDescription/ExhibitStyleDescription';
import ExhibitTechInfo from '@/components/ExhibitTechInfo/ExhibitTechInfo';
import PageTop from '@/components/PageTop/PageTop';
import Preloader from '@/components/Preloader/Preloader';
import Seo from '@/components/Seo/Seo';
import Slider from '@/components/Slider/Slider';
import { resetExhibit, setExhibit } from '@/slices/visitor/exhibit';
import { api } from '@/utils/api/api';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function ExhibitView() {
	const exhibitId = useParams().exhibit;
	const exhibit = useSelector((state: RootState) => state.exhibit);
	const dispatch = useDispatch();
	const [showPreloader, setShowPreloader] = useState<boolean>(true);

	const { additionalDescription, additionalImages, description, images, name, style, potterInfo, potterPhoto } = exhibit;

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
				});
		}

		return () => {
			if (exhibitId)
				dispatch(resetExhibit());
		};
	}, [exhibitId]);

	return (
		<>
			<Seo title={`Камамото: ${name?.charAt(0).toLowerCase()}${name?.slice(1)}`} />

			{ showPreloader && <Preloader />}
			{!showPreloader
				&& (
					<>
						<PageTop title={name} />
						<Slider slides={images} />
						<ExhibitDescription data={description} />
						<ExhibitPotterInfo potterInfo={potterInfo} potterPhoto={potterPhoto} />
						<ExhibitDescription data={additionalDescription} />
						<Slider slides={additionalImages || []} />
						<ExhibitStyleDescription data={style} />
						<ExhibitTechInfo exhibit={exhibit} />
					</>
				)}
		</>
	);
}
