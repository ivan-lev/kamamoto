import type { RootState } from '@/slices/visitor';
import type { File } from '@/types/file';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Preloader from '@/components/Preloader/Preloader';
import Seo from '@/components/Seo/Seo';
import { setLettersList } from '@/slices/visitor/letters';
import { api } from '@/utils/api/api';
import './ThanksLetters.scss';

export default function ThanksLetters() {
	const dispatch = useDispatch();
	const [showPreloader, setShowPreloader] = useState<boolean>(true);
	const letters = useSelector((state: RootState) => state.letters);

	useLayoutEffect(() => {
		window.scrollTo(0, 0);
	});

	useEffect(() => {
		if (letters.length === 0) {
			api.letters.getLetters()
				.then((letters) => {
					dispatch(setLettersList(letters));
					setShowPreloader(false);
				})
				.catch((error) => {
					console.error(error);

					setShowPreloader(false);
				});
		}
		else {
			setShowPreloader(false);
		}
	}, []);

	return (
		<>
			<Seo title="Камамото: благодарственные письма" />

			<section className="section page-top">
				<h2 className="title title2">Благодарственные письма</h2>
				<span className="subtitle">
					Письма от организаций и людей, с которыми мы совместно организовывали выставки и
					мероприятия.
				</span>
			</section>
			<section className="section thanks-letters">
				{showPreloader
					? (
							<Preloader />
						)
					: (
							<div className="container thanks-letters__list">
								{letters.map((letter: File) => {
									return (
										<div className="thanks-letters__element" key={letter.id}>
											<a className="thanks-letters__link" href={letter.name} target="_blank">
												<img className="thanks-letters__preview" src={letter.thumbnail}></img>
											</a>
											<p className="thanks-letters__description">{letter.description}</p>
										</div>
									);
								})}
							</div>
						)}
			</section>
		</>
	);
}
