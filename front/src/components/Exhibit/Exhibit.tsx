import type { RootState } from '@/slices/visitor';
import ExhibitTechInfo from '@/components/ExhibitTechInfo/ExhibitTechInfo';
import Preloader from '@/components/Preloader/Preloader';
import Seo from '@/components/Seo/Seo';
import { resetExhibit, setExhibit } from '@/slices/visitor/exhibit';
import { api } from '@/utils/api/api';
import { htmlParserOptions } from '@/variables/htmlParserOptions';
import parse from 'html-react-parser';
import { useEffect, useLayoutEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import './Exhibit.scss';

export default function Exhibit() {
	const exhibitId = useParams().exhibit;
	const exhibit = useSelector((state: RootState) => state.exhibit);
	const images = useSelector((state: RootState) => state.exhibit.images);
	const additionalImages = useSelector((state: RootState) => state.exhibit.additionalImages);
	const dispatch = useDispatch();
	const [showPreloader, setShowPreloader] = useState<boolean>(true);

	const { additionalDescription, description, name, potterInfo, style } = exhibit;

	interface GalleryImage {
		original: string;
		thumbnail: string;
	}
	const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
	const [galleryAdditionalImages, setGalleryAdditionalImages] = useState<GalleryImage[]>([]);

	useEffect(() => {
		if (galleryImages.length === 0) {
			const imagesToDisplay: GalleryImage[] = [];
			images?.forEach((image) => {
				imagesToDisplay[imagesToDisplay.length] = { original: image, thumbnail: image };
			});
			setGalleryImages(imagesToDisplay);
		}
	}, [images]);

	useEffect(() => {
		if (galleryAdditionalImages.length === 0) {
			const imagesToDisplay: GalleryImage[] = [];
			additionalImages?.forEach((image) => {
				imagesToDisplay[imagesToDisplay.length] = { original: image, thumbnail: image };
			});
			setGalleryAdditionalImages(imagesToDisplay);
		}
	}, [additionalImages]);

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
					<section className="section exhibit">
						<div className="exhibit__breadcrumbs">
							<Link to=".." className="link link_navigational" relative="path">
								<img
									className="link__icon"
									src="/icons/link-arrow-left.svg"
								/>
								Назад
							</Link>
						</div>

						<h3 className="title title3">{name}</h3>

						{/* Main image gallery */}
						{images && (
							<ImageGallery items={galleryImages || []} showFullscreenButton={false} showPlayButton={false} />
						)}

						{/* Exhibit description section */}
						<div className="description">
							{description
								? (
										parse(description || '', htmlParserOptions)
									)
								: (
										<p className="text">Описание в процессе подготовки</p>
									)}
						</div>

						{/* Potter description section */}
						{potterInfo && (
							<div className="description description--block">
								{exhibit?.potterPhoto && (
									<img
										className="exhibit__potter-photo"
										src={exhibit.potterPhoto}
									>
									</img>
								)}

								{exhibit?.potterInfo && parse(exhibit?.potterInfo || '', htmlParserOptions)}
							</div>
						)}

						{/* Additional info */}
						{additionalDescription && (
							<div className="description">
								{additionalDescription && parse(additionalDescription || '', htmlParserOptions)}
							</div>
						)}

						{/* Additional photo gallery */}
						{additionalImages?.length !== 0 && (
							<ImageGallery
								items={galleryAdditionalImages || []}
								showFullscreenButton={false}
								showPlayButton={false}
								showThumbnails={false}
								showBullets={true}
							/>
						)}

						{/* Ceramic style description section */}
						{style?.brief && (
							<div className="container">
								<div className="description">
									{parse(
										style.brief
										|| '',
										htmlParserOptions,
									)}
								</div>
							</div>
						)}

						{/* Technical info */}
						{exhibit && <ExhibitTechInfo exhibit={exhibit} />}
					</section>
				)}
		</>
	);
}
