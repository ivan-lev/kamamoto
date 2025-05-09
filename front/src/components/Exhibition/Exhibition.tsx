import type { RootState } from '@/slices/visitor';
import Preloader from '@/components/Preloader/Preloader';
import Seo from '@/components/Seo/Seo';
import Slider from '@/components/Slider/Slider';
import { setExhibitionToDisplay } from '@/slices/visitor/exhibitions';
import { api } from '@/utils/api/api';
import { htmlParserOptions } from '@/variables/htmlParserOptions';
import parse from 'html-react-parser';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import './Exhibition.scss';

export default function Exhibition() {
	const [showPreloader, setShowPreloader] = useState<boolean>(true);
	const dispatch = useDispatch();
	const options = htmlParserOptions;
	const { exhId } = useParams();

	const exhibitions = useSelector((state: RootState) => state.exhibitions.exhibitionsList);
	const exhibitionToDisplay = useSelector(
		(state: RootState) => state.exhibitions.exhibitionToDisplay,
	);

	const { name, city, address, place, year, dates, link, organisators, curators, poster, description, photos } = exhibitionToDisplay;

	useLayoutEffect(() => {
		window.scrollTo(0, 0);
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
			});
	}, [exhId]);

	return (
		<>
			<Seo title={`Камамото: ${name}`} />

			{showPreloader
				? (
						<section className="section">
							<Preloader />
						</section>
					)
				: (
						<section className="section exhibition">
							<div className="exhibition__breadcrumbs">
								<Link to=".." className="link link_navigational" relative="path">
									<img
										className="link__icon"
										src="/icons/link-arrow-left.svg"
									/>
									Назад
								</Link>
							</div>
							<h3 className="title title3 exhibition__title">{`«${name}»`}</h3>

							<div className="exhibition__place">
								<p className="text text--muted">{`Место проведения: ${city}, ${address}, ${place}`}</p>
								<p className="text text--muted">{`Даты: ${year} год, ${dates}`}</p>
								{link && (
									<span className="text text--muted">
										Ссылка на
										{' '}
										<a className="link exhibition__link" href={link} target="_blank">
											мероприятие
										</a>
									</span>
								)}
							</div>

							<div className="container exhibition__participants">
								{organisators && (
									<div className="text text--muted">
										<span>Организаторы:</span>
										{parse(organisators, options)}
									</div>
								)}

								{curators && (
									<div className="text text--muted">
										<span>Кураторы:</span>
										{parse(curators, options)}
									</div>
								)}
							</div>

							{photos && (
								<div className="exhibition__photos">
									<Slider slides={photos} />
								</div>
							)}

							{poster && (
								<img
									className="exhibition__poster"
									src={poster}
								>
								</img>
							)}

							<div className="description exhibition__description">
								{parse(description, options)}
							</div>
						</section>
					)}
		</>
	);
}
