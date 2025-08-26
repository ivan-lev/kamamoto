import type { ChangeEvent } from 'react';
import type { RootState } from '@/slices/admin';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@/components/shared/buttons/Button';
import ConfirmButton from '@/components/shared/buttons/ConfirmButton';
import DeleteButton from '@/components/shared/buttons/DeleteButton';
import { clearCategoryForm, setCategories, setCategoryToEdit, setIsExistingCategoryEdited } from '@/slices/admin/categories';
import { api } from '@/utils/api/api';

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

	const { name, title, thumbnail } = categoryToEdit;

	function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		const { name, value } = event.target;
		dispatch(setCategoryToEdit({ ...categoryToEdit, [name]: value }));
	}

	function handleCreateCategory() {
		setIsFormDisabled(true);
		const token = localStorage.getItem('kmmttkn');
		if (token) {
			api.categories.createCategory(token, name, title, thumbnail)
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
						return response.category !== category.name ? category : response;
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
			api.categories.deleteCategory(token, name)
				.then((response) => {
					const newCategoriesList = categories.filter(cat => cat.name !== response.category);
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
		<form className="form" inert={ isFormDisabled }>
			<fieldset className="form__fieldset">
				<legend className="form__legend">
					{ !isExistingCategoryEdited ? 'Добавить категорию' : 'Редактировать категорию' }
				</legend>

				<div className="form__grid">
					<div className="form__row-4">
						<span>Заголовок</span>
						<input
							className="input"
							type="text"
							name="title"
							placeholder="по-русски"
							value={ title }
							onChange={ handleChange }
						/>
					</div>

					<div className="form__row-4">
						<span>Имя</span>
						<input
							className="input"
							type="text"
							name="category"
							placeholder="по-английски"
							value={ name }
							onChange={ handleChange }
						/>
					</div>

					<div className="form__row-4">
						<span>файл картинки</span>
						<input
							className="input"
							type="text"
							name="thumbnail"
							placeholder="в галерею"
							value={ thumbnail }
							onChange={ handleChange }
						/>
					</div>

					<div className="form__row form__row-12 form__row-12--inline">
						{ !isExistingCategoryEdited
							? (
								<>
									<Button title="Очистить" action={ () => dispatch(clearCategoryForm()) } />
									<ConfirmButton title="Добавить" action={ handleCreateCategory } />
								</>
							)
							: (
								<>
									{ showConfirmation && (
										<div className="form__confirmation">
											<span>Точно удалить запись?</span>
											<DeleteButton title="Да" action={ handleDeleteCategory } />
											<Button title="Нет" action={ () => setShowConfirmation(false) } />
										</div>
									) }
									{ !showConfirmation && (
										<>
											<ConfirmButton title="Сохранить" action={ handleUpdateCategory } />
											<Button title="Удалить" action={ () => setShowConfirmation(true) } />
										</>
									) }
								</>
							) }
					</div>
				</div>
			</fieldset>
			<span className="form__save-status">{ saveMessage }</span>
		</form>
	);
}
