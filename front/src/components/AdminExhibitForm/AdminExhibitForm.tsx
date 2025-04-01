import type { RootState } from '@/slices/admin';
import type { ChangeEvent } from 'react';
import { setExhibitToEdit } from '@/slices/admin/exibits';
import { useDispatch, useSelector } from 'react-redux';
import './AdminExhibitForm.scss';

export default function AdminExhibitForm(): JSX.Element {
	const dispatch = useDispatch();
	const isFormDisabled: boolean = false;
	const isExistingExhibitEdited = false;
	const handleUpdateExhibit = () => {};
	const handleDeleteExhibit = () => {};
	const handleCloseExhibitionForm = () => {};
	const saveMessage = 'Статусное сообщение';

	const exhibitToEdit = useSelector((state: RootState) => state.exhibits.exhibitToEdit);

	function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		const { name, value } = event.target;
		dispatch(setExhibitToEdit({ ...exhibitToEdit, [name]: value }));
	};

	return (
		<form className="form" onSubmit={() => {}}>
			<fieldset className="form__fieldset" disabled={isFormDisabled}>
				<legend className="form__legend">Добавить лот</legend>

				<div className="form__grid">
					<div className="form__row-2">
						<span>номер</span>
						<input
							className={`input ${
								isFormDisabled ? 'input_disabled' : ''
							}`}
							type="text"
							name="id"
							placeholder="id"
							value={exhibitToEdit.id}
							onChange={handleChange}
						/>
					</div>

					<div className="form__row-4">
						<span>стиль керамики</span>
						<input
							className={`input ${
								isFormDisabled ? 'input_disabled' : ''
							}`}
							type="text"
							name="style"
							placeholder="название стиля"
							value={exhibitToEdit.style}
							onChange={handleChange}
						/>
					</div>

					<div className="form__row-3">
						<span>дата создания</span>
						<input
							className={`input ${
								isFormDisabled ? 'input_disabled' : ''
							}`}
							type="text"
							name="age"
							placeholder="даты"
							value={exhibitToEdit.age}
							onChange={handleChange}
						/>
					</div>

					<div className="form__row-12">
						<span>название</span>
						<input
							className={`input ${
								isFormDisabled ? 'input_disabled' : ''
							}`}
							type="text"
							name="name"
							placeholder="название"
							value={exhibitToEdit.name}
							onChange={handleChange}
						/>
					</div>

					<div className="form__row-12">
						<span>фотографии</span>
						<input
							className={`input ${
								isFormDisabled ? 'input_disabled' : ''
							}`}
							type="text"
							name="images"
							placeholder="фотографии"
							value={exhibitToEdit.images}
							onChange={handleChange}
						/>
					</div>

					<div className="form__row-12">
						<span>описание лота</span>
						<textarea
							className="textarea"
							name="description"
							placeholder="организаторы"
							value={exhibitToEdit.description}
							onChange={handleChange}
						/>
					</div>

					<div className="form__row-8">
						<span>имя мастера</span>
						<input
							className={`input ${
								isFormDisabled ? 'input_disabled' : ''
							}`}
							type="text"
							name="potter-name"
							placeholder="имя мастера"
							value={exhibitToEdit.potterName}
							onChange={handleChange}
						/>
					</div>

					<div className="form__row-4">
						<span>годы жизни</span>
						<input
							className={`input ${
								isFormDisabled ? 'input_disabled' : ''
							}`}
							type="text"
							name="potter-life-dates"
							placeholder="годы жизни"
							value={exhibitToEdit.potterLifeDates}
							onChange={handleChange}
						/>
					</div>

					<div className="form__row-8">
						<span>имя мастера на японском</span>
						<input
							className={`input ${
								isFormDisabled ? 'input_disabled' : ''
							}`}
							type="text"
							name="potter-japanese-name"
							placeholder="имя мастера на японском"
							value={exhibitToEdit.potterJapaneseName}
							onChange={handleChange}
						/>
					</div>

					<div className="form__row-4">
						<span>фото мастера</span>
						<input
							className={`input ${
								isFormDisabled ? 'input_disabled' : ''
							}`}
							type="text"
							name="potter-photo"
							placeholder="фото  мастера"
							value={exhibitToEdit.potterPhoto}
							onChange={handleChange}
						/>
					</div>

					<div className="form__row-12">
						<span>информация о мастере</span>
						<textarea
							className="textarea"
							name="potter-info"
							placeholder="информация о мастере"
							value={exhibitToEdit.potterInfo}
							onChange={handleChange}
						/>
					</div>

					<div className="form__row-12">
						<span>дополнительная информация</span>
						<textarea
							className="textarea"
							name="additional-description"
							placeholder="дополнительная информация"
							value={exhibitToEdit.additionalDescription}
							onChange={handleChange}
						/>
					</div>

					<div className="form__row-12">
						<span>комплектность</span>
						<input
							className={`input ${
								isFormDisabled ? 'input_disabled' : ''
							}`}
							type="text"
							name="complectation"
							placeholder="комплектность"
							value={exhibitToEdit.complectation}
							onChange={handleChange}
						/>
					</div>

					<div className="form__row-12">
						<span>сохранность</span>
						<input
							className={`input ${
								isFormDisabled ? 'input_disabled' : ''
							}`}
							type="text"
							name="preservation"
							placeholder="сохранность"
							value={exhibitToEdit.preservation}
							onChange={handleChange}
						/>
					</div>

					<div className="form__row-12--inline">
						{!isExistingExhibitEdited
							? (
									<>
										<button
											className="button"
											type="button"
											onClick={() => {}}
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
											onClick={handleUpdateExhibit}
											disabled={isFormDisabled}
										>
											Сохранить
										</button>
										<button className="button" type="button" onClick={handleDeleteExhibit}>
											Удалить
										</button>
									</>
								)}

						<button
							className="button"
							type="button"
							onClick={handleCloseExhibitionForm}
						>
							Закрыть
						</button>
					</div>
				</div>
			</fieldset>
			<span className="form__submit-status">{saveMessage}</span>
		</form>

	);
}
