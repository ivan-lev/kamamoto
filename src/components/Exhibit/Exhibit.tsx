// Types
import type { RootState } from '../../slices';

// React and redux
import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { resetExhibit, setExhibit } from '../../slices/exhibitSlice';

// Components
import ExhibitTechInfo from '../ExhibitTechInfo/ExhibitTechInfo';
import Preloader from '../Preloader/Preloader';
import Seo from '../Seo/Seo';

// Utils and variables
import { api } from '../../utils/api';

// Other packages
import parse from 'html-react-parser';
import ImageGallery from 'react-image-gallery';

// Utils and variables
import { ceramicStylesDescriptions } from '../../variables/ceramisStylesDescriptions';
import { htmlParserOptions } from '../../variables/htmlParserOptions';
import { PATHS } from '../../variables/variables';

import './Exhibit.scss';
import 'react-image-gallery/styles/scss/image-gallery.scss';

export default function Exhibit(): JSX.Element {
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
			api.getExhibitById(exhibitId)
				.then((response) => {
					dispatch(setExhibit(response));
					// dispatch(setDisplayList(response));
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
						<Link to=".." className="link link_navigational muted exhibit__link" relative="path">
							<img
								className="background-muted bordered link__icon"
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
					<div className="text-block">
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
						<div className="text-block">
							{exhibit?.potterPhoto && (
								<img
									className="exhibit__potter-photo"
									src={`${PATHS.EXHIBITS}${exhibit?.id}/${exhibit.potterPhoto}`}
								>
								</img>
							)}

							{exhibit?.potterInfo && parse(exhibit?.potterInfo || '', htmlParserOptions)}
						</div>
					)}

					{/* Additional info */}
					{additionalDescription && (
						<div className="text-block">
							{additionalDescription && parse(additionalDescription || '', htmlParserOptions)}
						</div>
					)}

					{/* Additional photo gallery */}
					{additionalImages && (
						<ImageGallery
							items={galleryAdditionalImages || []}
							showFullscreenButton={false}
							showPlayButton={false}
							showThumbnails={false}
							showBullets={true}
						/>
					)}

					{/* Ceramic style description section */}
					{style !== 'other' && (
						<div className="container bordered background-muted text-block">
							{parse(
								ceramicStylesDescriptions[style as keyof typeof ceramicStylesDescriptions]
								|| '',
								htmlParserOptions,
							)}
						</div>
					)}

					{/* Technical info */}
					{exhibit && <ExhibitTechInfo exhibit={exhibit} />}
				</section>
			)}
		</>
	);
}
