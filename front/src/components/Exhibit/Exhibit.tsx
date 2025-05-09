import type { RootState } from '@/slices/visitor';
import ExhibitTechInfo from '@/components/ExhibitTechInfo/ExhibitTechInfo';
import Preloader from '@/components/Preloader/Preloader';
import Seo from '@/components/Seo/Seo';
import Slider from '@/components/Slider/Slider';
import { resetExhibit, setExhibit } from '@/slices/visitor/exhibit';
import { api } from '@/utils/api/api';
import { htmlParserOptions } from '@/variables/htmlParserOptions';
import parse from 'html-react-parser';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import './Exhibit.scss';

export default function Exhibit() {
	const exhibitId = useParams().exhibit;
	const exhibit = useSelector((state: RootState) => state.exhibit);
	const dispatch = useDispatch();
	const [showPreloader, setShowPreloader] = useState<boolean>(true);

	const { additionalDescription, additionalImages, description, images, name, potterInfo, potterPhoto, style } = exhibit;

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
						{images && <Slider slides={images} />}

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
								{potterPhoto && (
									<img
										className="exhibit__potter-photo"
										src={potterPhoto}
									>
									</img>
								)}

								{parse(potterInfo, htmlParserOptions)}
							</div>
						)}

						{/* Additional info */}
						{additionalDescription && (
							<div className="description">
								{parse(additionalDescription, htmlParserOptions)}
							</div>
						)}

						{/* Additional photo gallery */}
						{additionalImages && <Slider slides={additionalImages} />}

						{/* Ceramic style description section */}
						{style?.brief && (
							<div className="container">
								<div className="description">
									{parse(style.brief, htmlParserOptions)}
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
