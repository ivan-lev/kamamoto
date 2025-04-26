import type { RootState } from '@/slices/admin/index';
import type { Category } from '@/types/category';
import CategoryForm from '@/components/admin/Categories/CategoryForm';
import Modal from '@/components/Modal/Modal';
import Preloader from '@/components/Preloader/Preloader';
import Seo from '@/components/Seo/Seo';
import {
	clearCategoryForm,
	setCategories,
	setCategoryToEdit,
	setIsExistingCategoryEdited,
} from '@/slices/admin/categories';
import { api } from '@/utils/api/api';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Categories() {
	const dispatch = useDispatch();
	const [showPreloader, setShowPreloader] = useState<boolean>(true);
	const [showModal, setShowModal] = useState<boolean>(false);
	const categories = useSelector((state: RootState) => state.categories.categories);

	useEffect(() => {
		api.categories.getCategories(true)
			.then((response) => {
				dispatch(setCategories(response));
				setShowPreloader(false);
			})
			.catch(error => console.error(error));
	}, []);

	function openEmptyCategoryForm() {
		dispatch(clearCategoryForm());
		setShowModal(true);
	}

	function handleEditCategory(category: Category) {
		dispatch(setCategoryToEdit(category));
		dispatch(setIsExistingCategoryEdited(true));
		setShowModal(true);
	};

	return (
		<>
			<Seo title="Камамото: список партнёров" />

			{showPreloader
				? (
						<Preloader />
					)
				: (
						<div className="container container--background-transparent">
							<div className="admin-categories">
								<h2 className="title3">Категории</h2>
								<div className="table">
									<div className="table__row">
										<span className="table__cell table__cell--span-3">Заголовок</span>
										<span className="table__cell table__cell--span-4">Имя</span>
										<span className="table__cell table__cell--span-4">Файл предпросмотра</span>
										<span className="table__cell table__cell--centered"></span>
									</div>

									{categories.map((cat) => {
										const { category, title, thumbnail } = cat;
										return (
											<div key={category} className="table__row">
												<span className="table__cell table__cell--span-3">{title}</span>
												<span className="table__cell table__cell--span-4">{category}</span>
												<span className="table__cell table__cell--span-4">{thumbnail}</span>
												<span className="table__cell table__cell--centered">
													<button
														className="table__button table__button--edit"
														onClick={() => handleEditCategory(cat)}
													>
													</button>
												</span>
											</div>
										);
									})}
								</div>
							</div>

							<Modal
								showModal={showModal}
								closeModal={() => setShowModal(false)}
							>
								<CategoryForm closeModal={() => setShowModal(false)} />
							</Modal>

							<button className="button" onClick={openEmptyCategoryForm}>
								Создать
							</button>
						</div>
					)}
		</>
	);
}
