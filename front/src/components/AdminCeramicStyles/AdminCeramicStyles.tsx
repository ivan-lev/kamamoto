import type { RootState } from '@/slices/admin';
import AdminCeramicStylesForm from '@/components/AdminCeramicStyles/AdminCeramicStylesForm';
import Preloader from '@/components/Preloader/Preloader';
import Seo from '@/components/Seo/Seo';
import {
	setCeramicStyles,
} from '@/slices/admin/ceramicStyles';
import { api } from '@/utils/api/api';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function AdminCeramicStyles(): JSX.Element {
	const [showPreloader, setShowPreloader] = useState<boolean>(true);
	const dispatch = useDispatch();
	const ceramicStylesList = useSelector((state: RootState) => state.ceramicStyles.ceramicStylesList);
	// const ceramicStyleToEdit = useSelector((state: RootState) => state.ceramicStyles.ceramicStyleToEdit);
	// const isExistingStyleEdited = useSelector(
	// 	(state: RootState) => state.ceramicStyles.isExistingStyleEdited,
	// );

	// const { title, thumbnail } = ceramicStyleToEdit;

	useEffect(() => {
		const token = localStorage.getItem('kmmttkn');
		if (token) {
			api.ceramicStyles.getCeramicStyles()
				.then((styles) => {
					dispatch(setCeramicStyles(styles));
					setShowPreloader(false);
				})
				.catch(error => console.error(error));
		}
	}, []);

	return (
		<>
			<Seo title="Камамото: стили керамики" />

			{showPreloader
				? (
						<Preloader />
					)
				: (
						<div className="container container--background-transparent">
							<h2 className="title3">Стили керамики</h2>
							<div className="table">
								<div className="table__row">
									<span className="table__cell table__cell--span-4">Имя</span>
									<span className="table__cell table__cell--span-4">Заголовок</span>
									<span className="table__cell table__cell--span-3">Файл предпросмотра</span>
									<span className="table__cell table__cell--centered"></span>
								</div>
								{ceramicStylesList.map((style) => {
									return (
										<div
											key={style.name}
											className="table__row"
										>
											<span className="table__cell table__cell--span-4">{style.title}</span>
											<span className="table__cell table__cell--span-4">{style.name}</span>
											<span className="table__cell table__cell--span-3">{style.thumbnail}</span>
											<div className="table__cell table__cell--centered">
												<button
													className="table__button table__button--edit"
													// onClick={() => dispatch(setExhibitionToEdit(exhibition.id))}
												>
												</button>
											</div>
										</div>
									);
								})}
							</div>
							<AdminCeramicStylesForm />
							{/* {isExhibitionFormShowed
								? (
										<AdminExhibitionForm />
									)
								: (
										<button className="button" onClick={() => dispatch(openEmptyExhibitionForm())}>
											Создать
										</button>
									)} */}
						</div>
					)}
		</>
	);
}
