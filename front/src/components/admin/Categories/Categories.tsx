import type { RootState } from '@/slices/admin/index';
import type { Category } from '@/types/category';
import type { ChangeEvent } from 'react';
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
	const [isFormDisabled, setIsFormDisabled] = useState<boolean>(false);
	const [saveMessage, setSaveMessage] = useState<string>('');

	const categories = useSelector((state: RootState) => state.categories.categories);
	const categoryToEdit = useSelector((state: RootState) => state.categories.categoryToEdit);
	const isExistingCategoryEdited = useSelector(
		(state: RootState) => state.categories.isExistingCategoryEdited,
	);

	const { category, title, thumbnail } = categoryToEdit;

	useEffect(() => {
		api.categories.getCategories(true)
			.then((response) => {
				dispatch(setCategories(response));
				setShowPreloader(false);
			})
			.catch(error => console.error(error));
	}, []);

	useEffect(() => {
		if (saveMessage) {
			setTimeout(() => setSaveMessage(''), 3000);
		}
	}, [saveMessage]);

	const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = event.target;
		dispatch(setCategoryToEdit({ ...categoryToEdit, [name]: value }));
	};

	const handleCreateCategory = () => {
		setIsFormDisabled(true);
		const token = localStorage.getItem('kmmttkn');
		if (token) {
			api.categories.createCategory(token, category, title, thumbnail)
				.then((response) => {
					dispatch(setCategories([...categories, response]));
					dispatch(clearCategoryForm());
					dispatch(setIsExistingCategoryEdited(false));
					setIsFormDisabled(false);
					setSaveMessage('Новая категория в базе');
				})
				.catch((error) => {
					console.error(error);
					setIsFormDisabled(false);
					setSaveMessage('Что-то пошло не так :(');
				});
		}
	};

	const handleEditCategory = (category: Category) => {
		dispatch(setCategoryToEdit(category));
		dispatch(setIsExistingCategoryEdited(true));
	};

	const handleUpdateCategory = () => {
		setIsFormDisabled(true);
		const token = localStorage.getItem('kmmttkn');
		if (token) {
			api.categories.updateCategory(token, { ...categoryToEdit })
				.then((response) => {
					const newCategoriesList = categories.map((category) => {
						return response.category !== category.category ? category : response;
					});
					dispatch(setCategories(newCategoriesList));
					dispatch(clearCategoryForm());
					dispatch(setIsExistingCategoryEdited(false));
					setIsFormDisabled(false);
					setSaveMessage('Данные обновлены');
				})
				.catch((error) => {
					console.error(error);
					setIsFormDisabled(false);
					setSaveMessage('Что-то пошло не так :(');
				});
		}
	};

	const handleDeleteCategory = () => {
		const token = localStorage.getItem('kmmttkn');
		if (token) {
			api.categories.deleteCategory(token, category)
				.then((response) => {
					const newCategoriesList = categories.filter(cat => cat.category !== response.category);
					dispatch(setCategories(newCategoriesList));
					dispatch(clearCategoryForm());
					dispatch(setIsExistingCategoryEdited(false));
					setIsFormDisabled(false);
				})
				.catch((error) => {
					console.error(error);
					setIsFormDisabled(false);
				});
		}
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
										<span className="table__cell table__cell--span-3">Название</span>
										<span className="table__cell table__cell--span-4">Ссылка</span>
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
							<form className="form">
								<fieldset className="form__fieldset" disabled={isFormDisabled}>
									<legend className="form__legend">
										{!isExistingCategoryEdited ? 'Добавить категорию' : 'Редактировать категорию'}
									</legend>

									<div className="form__grid">
										<div className="form__row-4">
											<span>Название</span>
											<input
												className={`input ${
													isFormDisabled ? 'input_disabled' : ''
												}`}
												type="text"
												name="title"
												placeholder="по-русски"
												value={title}
												onChange={handleChange}
											/>
										</div>

										<div className="form__row-4">
											<span>путь</span>
											<input
												className={`input ${
													isFormDisabled ? 'input_disabled' : ''
												}`}
												type="text"
												name="category"
												placeholder="по-английски"
												value={category}
												onChange={handleChange}
											/>
										</div>

										<div className="form__row-4">
											<span>файл картинки</span>
											<input
												className={`input ${
													isFormDisabled ? 'input_disabled' : ''
												}`}
												type="text"
												name="thumbnail"
												placeholder="в галерею"
												value={thumbnail}
												onChange={handleChange}
											/>
										</div>

										<div className="form__row-12--inline">
											{!isExistingCategoryEdited
												? (
														<>
															<button
																className="button"
																type="button"
																onClick={() => dispatch(clearCategoryForm())}
															>
																Очистить
															</button>
															<button className="button" type="submit" onClick={handleCreateCategory}>
																Создать
															</button>
														</>
													)
												: (
														<>
															<button
																className="button"
																type="button"
																onClick={handleUpdateCategory}
																disabled={isFormDisabled}
															>
																Сохранить
															</button>
															<button className="button" type="button" onClick={handleDeleteCategory}>
																Удалить
															</button>
														</>
													)}
										</div>
									</div>
								</fieldset>
								<span className="form__save-status">{saveMessage}</span>
							</form>
						</div>
					)}
		</>
	);
}
