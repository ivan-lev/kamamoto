import type { RootState } from '@/slices/admin';
import type { ChangeEvent, FormEvent } from 'react';
import {
	clearCategoryForm,
	setCategories,
	setCategoryToEdit,
	setIsExistingCategoryEdited,
} from '@/slices/admin/categories';
import { api } from '@/utils/api/api';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface Props {
	closeModal: () => void;
}

export default function CategoryForm({ closeModal }: Props) {
	const dispatch = useDispatch();
	const [isFormDisabled, setIsFormDisabled] = useState<boolean>(false);
	const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
	const [saveMessage, setSaveMessage] = useState<string>('');

	const categories = useSelector((state: RootState) => state.categories.categories);
	const categoryToEdit = useSelector((state: RootState) => state.categories.categoryToEdit);
	const isExistingCategoryEdited = useSelector(
		(state: RootState) => state.categories.isExistingCategoryEdited,
	);

	const { category, title, thumbnail } = categoryToEdit;

	function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		const { name, value } = event.target;
		dispatch(setCategoryToEdit({ ...categoryToEdit, [name]: value }));
	}

	function handleCreateCategory() {
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
					setTimeout(() => closeModal(), 1000);
				})
				.catch((error) => {
					console.error(error);
					setIsFormDisabled(false);
					setSaveMessage('Что-то пошло не так :(');
				});
		}
	}

	function handleUpdateCategory() {
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
	}

	function handleDeleteCategory() {
		const token = localStorage.getItem('kmmttkn');
		if (token) {
			api.categories.deleteCategory(token, category)
				.then((response) => {
					const newCategoriesList = categories.filter(cat => cat.category !== response.category);
					dispatch(setCategories(newCategoriesList));
					dispatch(clearCategoryForm());
					dispatch(setIsExistingCategoryEdited(false));
					setSaveMessage('Категория удалена');
					setTimeout(() => closeModal(), 1000);
					setIsFormDisabled(false);
				})
				.catch((error) => {
					console.error(error);
					setIsFormDisabled(false);
				});
		}
	}

	useEffect(() => {
		if (saveMessage) {
			setTimeout(() => setSaveMessage(''), 3000);
		}
	}, [saveMessage]);

	return (
		<form className="form">
			<fieldset className="form__fieldset" disabled={isFormDisabled}>
				<legend className="form__legend">
					{!isExistingCategoryEdited ? 'Добавить категорию' : 'Редактировать категорию'}
				</legend>

				<div className="form__grid">
					<div className="form__row-4">
						<span>Заголовок</span>
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
						<span>Имя</span>
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

					<div className="form__row form__row-12 form__row-12--inline">
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
										{ showConfirmation && (
											<div className="form__confirmation">
												<span>Точно удалить запись?</span>
												<button className="button" type="button" onClick={handleDeleteCategory}>Да</button>
												<button className="button" type="button" onClick={() => setShowConfirmation(false)}>Нет</button>
											</div>
										)}
										{!showConfirmation && (
											<>
												<button
													className="button"
													type="button"
													onClick={handleUpdateCategory}
													disabled={isFormDisabled}
												>
													Сохранить
												</button>
												<button className="button" type="button" onClick={() => setShowConfirmation(true)}>
													Удалить
												</button>
											</>
										)}
									</>
								)}
					</div>
				</div>
			</fieldset>
			<span className="form__save-status">{saveMessage}</span>
		</form>
	);
}
