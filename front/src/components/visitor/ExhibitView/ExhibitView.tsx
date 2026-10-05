import type { RootState } from '@/slices/visitor';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Preloader from '@/components/shared/Preloader/Preloader';
import ExhibitCeramicStyle from '@/components/visitor/ExhibitView/ExhibitCeramicStyle';
import ExhibitDescription from '@/components/visitor/ExhibitView/ExhibitDescription';
import ExhibitPotterInfo from '@/components/visitor/ExhibitView/ExhibitPotterInfo';
import ExhibitSummary from '@/components/visitor/ExhibitView/ExhibitSummary';
import NotFound from '@/components/visitor/NotFound/NotFound';
import PageTop from '@/components/visitor/PageTop/PageTop';
import Seo from '@/components/visitor/Seo/Seo';
import Slider from '@/components/visitor/Slider/Slider';
import { resetExhibit, setExhibit } from '@/slices/visitor/exhibit';
import { api } from '@/utils/api/api';
import { isPageMissing } from '@/utils/api/api.common';
import { scrollToTop } from '@/utils/scrollToTop';
import { DESCRIPTION_DUMMY } from '@/variables/variables';

export default function ExhibitView() {
	const dispatch = useDispatch();
	const exhibit = useSelector((state: RootState) => state.exhibit);
	const exhibitId = useParams().exhibit;

	const [showPreloader, setShowPreloader] = useState<boolean>(true);
	// адрес, по которому лота не оказалось: при переходе на другой адрес страница снова грузится
	const [missingExhibit, setMissingExhibit] = useState<string>();
	const { additionalDescription, additionalImages, description, images, name, style, potter } = exhibit;

	useLayoutEffect(() => scrollToTop(), []);

	useEffect(() => {
		if (exhibitId) {
			api.exhibits.getExhibitById(exhibitId)
				.then((response) => {
					dispatch(setExhibit(response));
					setShowPreloader(false);
				})
				.catch((error) => {
					setShowPreloader(false);

					if (isPageMissing(error))
						setMissingExhibit(exhibitId);
				});
		}

		return () => {
			if (exhibitId)
				dispatch(resetExhibit());
		};
	}, [dispatch, exhibitId]);

	if (missingExhibit === exhibitId) {
		return <NotFound />;
	}

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
