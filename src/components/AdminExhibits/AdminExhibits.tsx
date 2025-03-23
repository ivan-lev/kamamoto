import type { RootState } from '@/slices/admin';
import type { Exhibit, Exhibits } from '@/types/exhibitType';
import AdminExhibitForm from '@/components/AdminExhibitForm/AdminExhibitForm';
import Preloader from '@/components/Preloader/Preloader';
import Seo from '@/components/Seo/Seo';
import { setExhibits, setExhibitToEdit } from '@/slices/admin/exibits';
import { api } from '@/utils/api';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './AdminExhibits.scss';

export default function AdminExhibits(): JSX.Element {
	const [showPreloader, setShowPreloader] = useState<boolean>(true);
	// const [exhibits, setExhibits] = useState<Exhibits>([]);
	const dispatch = useDispatch();
	const exhibits = useSelector((state: RootState) => state.exhibits.exhibits);

	useEffect(() => {
		const exhibitsList: Exhibits = [];
		const token = localStorage.getItem('kmmttkn');
		if (token) {
			api
				.getExhibits()
				.then((response) => {
					response.forEach((exhibit: any) => {
						const someExhibit: Exhibit = {
							...exhibit,
							category: exhibit.category.title,
						};
						exhibitsList.push(someExhibit);
					});
					dispatch(setExhibits(exhibitsList));
					setShowPreloader(false);
				})
				.catch(error => console.error(error));
		}
	}, []);

	// useEffect(() => { console.log(exhibits); }, [exhibits]);

	return (
		<>
			<Seo title="Камамото: лоты" />

			{showPreloader
				? (
						<Preloader />
					)
				: (
						<div className="container container--background-transparent">
							<h2 className="title3">Лоты</h2>
							<div className="admin-section-list">
								<div className="admin-exhibit__list">
									<span>ID</span>
									<span>Название</span>
									<span>Категория</span>
									<span>Стиль</span>
								</div>
								{exhibits.map(exhibit => (
									<div className="admin-exhibit__list" key={exhibit.id}>
										<span>{exhibit.id}</span>
										<span>{exhibit.name}</span>
										<span>{exhibit.category}</span>
										<span>{exhibit.style}</span>
										<span>
											<button
												className="admin-section-list__edit-button"
												onClick={() => dispatch(setExhibitToEdit(exhibit.id))}
											>
											</button>
										</span>
									</div>
								))}
							</div>

							<AdminExhibitForm />
						</div>
					)}
		</>
	);
}
