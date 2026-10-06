import type { ChangeEvent } from 'react';
import type { RootState } from '@/slices/admin';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@/components/shared/Button';
import { clearCategoryForm, setCategories, setCategoryToEdit, setIsExistingCategoryEdited } from '@/slices/admin/categories';
import { api } from '@/utils/api/api';
import { getErrorMessage } from '@/utils/api/api.common';
import { storage } from '@/utils/storage';
import { STORAGE_KEYS } from '@/variables/variables';

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

	async function handleCreateCategory() {
		const token = storage.get<string>(STORAGE_KEYS.TOKEN);
		if (!token)
			return;

		setIsFormDisabled(true);
		try {
			const createdCategory = await api.categories.createCategory(token, { name, title, thumbnail });
			dispatch(setCategories([...categories, createdCategory]));
			dispatch(clearCategoryForm());
			dispatch(setIsExistingCategoryEdited(false));
			setSaveMessage('Новая категория в базе');
			setTimeout(closeModal, 1000);
		}
		catch (error) {
			setSaveMessage(getErrorMessage(error));
		}
		finally {
			setIsFormDisabled(false);
		}
	}

	async function handleUpdateCategory() {
		const token = storage.get<string>(STORAGE_KEYS.TOKEN);
		if (!token)
			return;

		setIsFormDisabled(true);
		try {
			const updatedCategory = await api.categories.updateCategory(token, { name, title, thumbnail });
			dispatch(setCategories(categories.map(category => category.name === updatedCategory.name ? updatedCategory : category)));
			setSaveMessage('Данные обновлены');
		}
		catch (error) {
			setSaveMessage(getErrorMessage(error));
		}
		finally {
			setIsFormDisabled(false);
		}
	}

	async function handleDeleteCategory() {
		const token = storage.get<string>(STORAGE_KEYS.TOKEN);
		if (!token)
			return;

		setIsFormDisabled(true);
		try {
			const deletedCategory = await api.categories.deleteCategory(token, name);
			dispatch(setCategories(categories.filter(category => category.name !== deletedCategory.name)));
			dispatch(clearCategoryForm());
			dispatch(setIsExistingCategoryEdited(false));
			setSaveMessage('Категория удалена');
			setTimeout(closeModal, 1000);
		}
		catch (error) {
			// например, 409: в категории есть лоты
			setSaveMessage(getErrorMessage(error));
		}
		finally {
			setShowConfirmation(false);
			setIsFormDisabled(false);
		}
	}

	useEffect(() => {
		if (saveMessage) {
			setTimeout(setSaveMessage, 3000, '');
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
							name="name"
							placeholder="по-английски"
							value={ name }
							onChange={ handleChange }
							// имя — это адрес страницы категории и папка с og-картинкой: при переименовании они бы разъехались
							readOnly={ isExistingCategoryEdited }
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
						<span className="form__request-status">{ saveMessage }</span>
						{ !isExistingCategoryEdited
							? (
								<>
									<Button title="Очистить" action={ () => dispatch(clearCategoryForm()) } />
									<Button title="Добавить" action={ handleCreateCategory } />
								</>
							)
							: (
								<>
									{ showConfirmation && (
										<div className="form__confirmation">
											<span>Точно удалить запись?</span>
											<Button title="Да" action={ handleDeleteCategory } />
											<Button title="Нет" action={ () => setShowConfirmation(false) } />
										</div>
									) }
									{ !showConfirmation && (
										<>
											<Button title="Сохранить" action={ handleUpdateCategory } />
											<Button title="Удалить" action={ () => setShowConfirmation(true) } />
										</>
									) }
								</>
							) }
					</div>
				</div>
			</fieldset>
		</form>
	);
}
