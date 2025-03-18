// Types
import type { AdminRootState } from '../../slices/adminSlice';
import type { Exhibit, Exhibits } from '../../types/exhibitType';

// React
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setExhibits, setExhibitToEdit } from '../../slices/adminSlice';

// Components
import AdminExhibitForm from '../AdminExhibitForm/AdminExhibitForm';
import Preloader from '../Preloader/Preloader';
import Seo from '../Seo/Seo';

// Utils
import { api } from '../../utils/api';

import './AdminExhibits.scss';

export default function AdminExhibits(): JSX.Element {
	const [showPreloader, setShowPreloader] = useState<boolean>(true);
	// const [exhibits, setExhibits] = useState<Exhibits>([]);
	const dispatch = useDispatch();
	const exhibits = useSelector((state: AdminRootState) => state.admin.exhibits);

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
						<div className="container">
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
