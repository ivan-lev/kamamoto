import type { RootState } from '@/slices/visitor';
import parse from 'html-react-parser';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import PageTop from '@/components/PageTop/PageTop';
import Preloader from '@/components/Preloader/Preloader';
import Seo from '@/components/Seo/Seo';
import Slider from '@/components/Slider/Slider';
import { setExhibitionToDisplay } from '@/slices/visitor/exhibitions';
import { api } from '@/utils/api/api';
import { htmlParserOptions } from '@/variables/htmlParserOptions';
import { PATHS } from '@/variables/variables';

import './Exhibition.scss';

export default function Exhibition() {
	const dispatch = useDispatch();
	const exhibitions = useSelector((state: RootState) => state.exhibitions.exhibitionsList);
	const exhId = useParams().exhId;
	const navigate = useNavigate();
	const options = htmlParserOptions;

	const [showPreloader, setShowPreloader] = useState<boolean>(true);
	const exhibitionToDisplay = useSelector(
		(state: RootState) => state.exhibitions.exhibitionToDisplay,
	);
	const { name, city, address, place, year, dates, link, organisators, curators, poster, description, photos } = exhibitionToDisplay;

	useLayoutEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'instant',
		});
	});

	useEffect(() => {
		// if some data stored in exhibitions state, get data from there
		if (exhibitions.length !== 0) {
			const exhibition = exhibitions.find(exhibition => exhibition.id === Number.parseInt(exhId || '0'));
			dispatch(setExhibitionToDisplay(exhibition));
			setShowPreloader(false);
			return;
		}

		// if no data about exhibitions in the store
		// get data first
		api.exhibitions.getExhibitionById(exhId || '0')
			.then((response) => {
				dispatch(setExhibitionToDisplay(response));
				setShowPreloader(false);
			})
			.catch((error) => {
				console.error(error);
				setShowPreloader(false);

				if (error.status === 404) {
					navigate('/404', { replace: true });
				}
			});
	}, [exhId]);

	return (
		<>
			<Seo
				title={ `Камамото: выставка ${name}` }
				description={ `Страница о выставке "${name}" с описанием и фотографиями` }
				canonicalUrl={ `${PATHS.EXHIBITIONS}/${exhId}` }
			/>

			{ showPreloader
				? (
					<section className="section">
						<Preloader />
					</section>
				)
				: (
					<>
						<PageTop title={ `Выставка «${name}»` } />

						<section className="section exhibition">
							<div className="exhibition__place">
								<p className="text text--muted">{ `Место проведения: ${city}, ${address}, ${place}` }</p>
								<time className="text text--muted">{ `Даты: ${year} год, ${dates}` }</time>
								{ link && (
									<span className="text text--muted">
										Ссылка на&nbsp;
										<a className="link exhibition__link" href={ link } target="_blank">
											мероприятие
										</a>
									</span>
								) }
							</div>

							<div className="container exhibition__participants">
								{ organisators && (
									<div className="text text--muted">
										<span>Организаторы:</span>
										{ parse(organisators, options) }
									</div>
								) }

								{ curators && (
									<div className="text text--muted">
										<span>Кураторы:</span>
										{ parse(curators, options) }
									</div>
								) }
							</div>

							{ poster && (
								<img
									className="exhibition__poster"
									src={ poster }
									loading="lazy"
									alt="Афиша выставки"
								/>
							) }

							<div className="description exhibition__description">
								{ parse(description, options) }
							</div>
						</section>

						{ photos && (
							<Slider slides={ photos } />
						) }
					</>
				) }
		</>
	);
}
