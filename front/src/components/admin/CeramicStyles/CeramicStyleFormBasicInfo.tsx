import type { ChangeEvent } from 'react';
import type { RootState } from '@/slices/admin';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCeramicStyleToEdit } from '@/slices/admin/ceramicStyles';

export default function CeramicStyleFormBasicInfo() {
	const dispatch = useDispatch();
	const isExistingStyleEdited = useSelector((state: RootState) => state.ceramicStyles.isExistingStyleEdited);
	const ceramicStyleToEdit = useSelector((state: RootState) => state.ceramicStyles.ceramicStyleToEdit);

	const [saveMessage, setSaveMessage] = useState<string>('');
	const [initialStyleName, setInitialStyleName] = useState<string>('');

	const {
		additionalImages,
		brief,
		description,
		images,
		name,
		title,
		thumbnail,
		mapImage,
	} = ceramicStyleToEdit;

	function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		const { name, value } = event.target;
		dispatch(setCeramicStyleToEdit({ ...ceramicStyleToEdit, [name]: value }));
	};

	function handleChangePhotos(event: ChangeEvent<HTMLInputElement>) {
		const { name, value } = event.target;
		dispatch(setCeramicStyleToEdit({ ...ceramicStyleToEdit, [name]: value.replace(/\s/g, '').split(',') }));
	};

	useEffect(() => {
		if (saveMessage) {
			setTimeout(() => setSaveMessage(''), 3000);
		}
	}, [saveMessage]);

	useEffect(() => {
		// set initial style name to pass it to backend
		// if it was changed on edit
		if (!initialStyleName)
			setInitialStyleName(ceramicStyleToEdit.name);
		return () => setInitialStyleName('');
	}, []);

	return (
		<fieldset className="form__fieldset">
			<legend className="form__legend">
				{ isExistingStyleEdited
					? 'Редактировать существующий стиль керамики'
					: 'Создать новый стиль керамики' }
			</legend>

			<div className="form__grid">
				<div className="form__row form__row-3">
					<span>имя</span>
					<input
						className="input"
						type="text"
						name="name"
						placeholder="на англ. языке"
						value={ name }
						onChange={ handleChange }
					/>
				</div>

				<div className="form__row form__row-3">
					<span>заголовок</span>
					<input
						className="input"
						type="text"
						name="title"
						placeholder="на русс. языке"
						value={ title }
						onChange={ handleChange }
					/>
				</div>

				<div className="form__row form__row-3">
					<span>тхумб</span>
					<input
						className="input"
						type="text"
						name="thumbnail"
						placeholder="тхумб"
						value={ thumbnail }
						onChange={ handleChange }
					/>
				</div>

				<div className="form__row form__row-3">
					<span>мини карта</span>
					<input
						className="input"
						type="text"
						name="mapImage"
						placeholder="мини карта"
						value={ mapImage }
						onChange={ handleChange }
					/>
				</div>

				<div className="form__row form__row-12">
					<span>изображения</span>
					<input
						className="input"
						type="text"
						name="images"
						placeholder="изображения"
						value={ images }
						onChange={ handleChangePhotos }
					/>
				</div>

				<div className="form__row form__row-12">
					<span>дополнительные изображения</span>
					<input
						className="input"
						type="text"
						name="additionalImages"
						placeholder="дополнительные изображения"
						value={ additionalImages }
						onChange={ handleChangePhotos }
					/>
				</div>

				<div className="form__row form__row-12">
					<span>краткое описание</span>
					<textarea
						className="textarea"
						name="brief"
						placeholder="краткое описание"
						value={ brief }
						onChange={ handleChange }
					/>
				</div>

				<div className="form__row form__row-12">
					<span>полное описание</span>
					<textarea
						className="textarea"
						name="description"
						placeholder="полное описание"
						value={ description }
						onChange={ handleChange }
					/>
				</div>

			</div>
		</fieldset>
	);
}
