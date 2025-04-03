import type { RootState } from '@/slices/visitor';
import type { Images } from '@/types/imageType';
import Preloader from '@/components/Preloader/Preloader';
import Seo from '@/components/Seo/Seo';
import { setExhibitionToDisplay } from '@/slices/visitor/exhibitions';
import { api } from '@/utils/api/api';
import { generateImageLinks } from '@/utils/generateImageLinks';
import { htmlParserOptions } from '@/variables/htmlParserOptions';
import { PATHS } from '@/variables/variables';
import parse from 'html-react-parser';
import { useEffect, useLayoutEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import './Exhibition.scss';
import 'react-image-gallery/styles/scss/image-gallery.scss';

const { EXHIBITIONS, RESOURSES } = PATHS;

export default function Exhibit(): JSX.Element {
	const [showPreloader, setShowPreloader] = useState<boolean>(true);
	const dispatch = useDispatch();
	const options = htmlParserOptions;
	const { exhId } = useParams();

	const exhibitions = useSelector((state: RootState) => state.exhibitions.exhibitionsList);
	const exhibitionToDisplay = useSelector(
		(state: RootState) => state.exhibitions.exhibitionToDisplay,
	);

	const {
		id,
		name,
		city,
		address,
		place,
		year,
		dates,
		link,
		organisators,
		curators,
		poster,
		description,
		photos,
	} = exhibitionToDisplay;

	useLayoutEffect(() => {
		window.scrollTo(0, 0);
	});

	useEffect(() => {
		if (exhibitions.length !== 0) {
			const exhibition = exhibitions.find(exhibition => exhibition.id === Number.parseInt(exhId || '0'));
			dispatch(setExhibitionToDisplay(exhibition));
			setShowPreloader(false);
			return;
		}

		api
			.getExhibitionById(exhId || '0')
			.then((response) => {
				dispatch(setExhibitionToDisplay(response));
				setShowPreloader(false);
			})
			.catch((error) => {
				console.error(error);
				setShowPreloader(false);
			});
	}, [exhId]);

	const [photosToDisplay, setPhotosToDisplay] = useState<Images>([]);

	useEffect(() => {
		const path = `${RESOURSES}/${EXHIBITIONS}/${id}`;
		const newPhotosToDisplay = generateImageLinks(path, photos);
		setPhotosToDisplay(newPhotosToDisplay);
	}, [exhibitionToDisplay]);

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
								<span className="text text--muted">Место проведения: </span>
								<span className="text">
									{city}
									,
									{address}
									,
									{place}
								</span>
								<span className="text text--muted">Даты: </span>
								<span>
									{year}
									{' '}
									год,
									{dates}
								</span>
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
										{parse(organisators || '', options)}
									</div>
								)}
								{curators && (
									<div className="text text--muted">
										<span>Кураторы:</span>
										{parse(curators || '', options)}
									</div>
								)}
							</div>

							{photosToDisplay.length !== 0 && (
								<div className="exhibition__photos">
									<ImageGallery
										items={photosToDisplay}
										showFullscreenButton={false}
										showPlayButton={false}
										showBullets={true}
										showThumbnails={false}
									/>
								</div>
							)}
							{poster && (
								<img
									className="exhibition__poster"
									src={`${RESOURSES}/${EXHIBITIONS}/${id}/poster.jpg`}
								>
								</img>
							)}
							<div className="description exhibition__description">

								{parse(description || '', options)}
							</div>
						</section>
					)}
		</>
	);
}
