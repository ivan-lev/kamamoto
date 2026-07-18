import type { RootState } from '@/slices/admin';
import type { CeramicStyle } from '@/types/ceramicStyles';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CeramicStyleFormBasicInfo from '@/components/admin/CeramicStyles/CeramicStyleFormBasicInfo';
import ArticleForm from '@/components/admin/shared/ArticleForm/ArticleForm';
import { clearCeramicStyleForm, setCeramicStyles, setCeramicStyleToEdit } from '@/slices/admin/ceramicStyles';
import { api } from '@/utils/api/api';
import { storage } from '@/utils/storage';
import { STORAGE_KEYS } from '@/variables/variables';

export default function CeramicStyleFormView() {
	const dispatch = useDispatch();
	const ceramicStylesList = useSelector((state: RootState) => state.ceramicStyles.ceramicStylesList);
	const isExistingStyleEdited = useSelector((state: RootState) => state.ceramicStyles.isExistingStyleEdited);
	const ceramicStyleToEdit = useSelector((state: RootState) => state.ceramicStyles.ceramicStyleToEdit);

	const [isFormDisabled, setIsFormDisabled] = useState<boolean>(false);
	const [saveMessage, setSaveMessage] = useState<string>('');
	const initialStyleName = useRef<string>('');

	async function handleCreateCeramicStyle(event: React.SyntheticEvent<HTMLFormElement>) {
		event.preventDefault();
		setIsFormDisabled(true);
		const token = storage.get<string>(STORAGE_KEYS.TOKEN);
		if (token) {
			try {
				const response = await api.ceramicStyles.createCeramicStyle(token, ceramicStyleToEdit);

				const newCeramicStylesListData: CeramicStyle[] = [...ceramicStylesList, response];
				newCeramicStylesListData.sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));

				dispatch(setCeramicStyles(newCeramicStylesListData));
				dispatch(clearCeramicStyleForm());
				setIsFormDisabled(false);
				setSaveMessage('Стиль керамики создан');
			}
			catch (error: any) {
				setIsFormDisabled(false);
				setSaveMessage(error.message || 'Что-то пошло не так :(');
			}
		}
	};

	async function handleUpdateCeramicStyle() {
		setIsFormDisabled(true);
		const token = storage.get<string>(STORAGE_KEYS.TOKEN);
		if (token) {
			try {
				const response = await api.ceramicStyles.updateCeramicStyle(token, ceramicStyleToEdit, initialStyleName.current);
				const updatedStylesList = ceramicStylesList.map(style => style.name !== initialStyleName.current ? style : response);

				dispatch(setCeramicStyles(updatedStylesList));
				setIsFormDisabled(false);
				setSaveMessage('Данные обновлены');
			}
			catch (error: any) {
				setIsFormDisabled(false);
				setSaveMessage(error.message || 'Что-то пошло не так :(');
			};
		}
	};

	function handleDeleteCeramicStyle() {
		setIsFormDisabled(true);
		const token = storage.get<string>(STORAGE_KEYS.TOKEN);
		if (token) {
			api.ceramicStyles.deleteCeramicStyle(token, ceramicStyleToEdit.name)
				.then((response) => {
					const updatedStylesList = ceramicStylesList.filter(style => style.name !== response.name);
					dispatch(setCeramicStyles(updatedStylesList));
					dispatch(clearCeramicStyleForm());
					setIsFormDisabled(false);
				})
				.catch((error) => {
					setIsFormDisabled(false);
					setSaveMessage(error.message || 'Что-то пошло не так :(');
				});
		}
	};

	useEffect(() => {
		if (saveMessage) {
			setTimeout(setSaveMessage, 3000, '');
		}
	}, [saveMessage]);

	useEffect(() => {
		// set initial style name to pass it to backend
		// if it was changed on edit
		if (!initialStyleName.current)
			initialStyleName.current = ceramicStyleToEdit.name;
		return () => {
			initialStyleName.current = '';
		};
	}, [ceramicStyleToEdit.name]);

	return (
		<form
			className="form"
			onSubmit={ handleCreateCeramicStyle }
			inert={ isFormDisabled }
		>

			<CeramicStyleFormBasicInfo />

			<ArticleForm
				entity={ ceramicStyleToEdit }
				onChange={ updatedStyle => dispatch(setCeramicStyleToEdit(updatedStyle)) }
			/>

			<div className="form__row form__row-12 form__row-12--inline">
				<span className="form__request-status">{ saveMessage }</span>
				{ !isExistingStyleEdited
					? (
						<>
							<button
								className="button"
								type="button"
								onClick={ () => dispatch(clearCeramicStyleForm()) }
							>
								Очистить
							</button>
							<button className="button" type="submit">
								Создать
							</button>
						</>
					)
					: (
						<>
							<button
								className="button"
								type="button"
								onClick={ handleUpdateCeramicStyle }
								disabled={ isFormDisabled }
							>
								Сохранить
							</button>
							<button
								className="button"
								type="button"
								onClick={ handleDeleteCeramicStyle }
							>
								Удалить
							</button>
						</>
					) }
			</div>
		</form>
	);
}
