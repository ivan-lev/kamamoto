import './AdminExhibitForm.scss';

export default function AdminExhibitForm(): JSX.Element {
	const isFormDisabled: boolean = false;
	const handleChange = () => {};
	const handleChangePhotos = () => {};
	const isExistingExhibitEdited = false;
	const handleUpdateExhibit = () => {};
	const handleDeleteExhibit = () => {};
	const handleCloseExhibitionForm = () => {};
	const saveMessage = 'Статусное сообщение';

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
							value="id"
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
							name="link"
							placeholder="ссылка"
							value="ссылка"
							onChange={handleChange}
						/>
					</div>

					<div className="form__row-3">
						<span>возраст предмета</span>
						<input
							className={`input ${
								isFormDisabled ? 'input_disabled' : ''
							}`}
							type="text"
							name="dates"
							placeholder="даты"
							value="даты"
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
							name="year"
							placeholder="год"
							value="год"
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
							name="photos"
							placeholder="фотографии"
							value="фотографии"
							onChange={handleChangePhotos}
						/>
					</div>

					<div className="form__row-12">
						<span>описание лота</span>
						<textarea
							className="textarea"
							name="organisators"
							placeholder="организаторы"
							value="организаторы"
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
							name="place"
							placeholder="место проведения"
							value="место проведения"
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
							name="place"
							placeholder="место проведения"
							value="место проведения"
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
							name="place"
							placeholder="место проведения"
							value="место проведения"
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
							name="dates"
							placeholder="даты"
							value="даты"
							onChange={handleChange}
						/>
					</div>

					<div className="form__row-12">
						<span>информация о мастере</span>
						<textarea
							className="textarea"
							name="organisators"
							placeholder="организаторы"
							value="организаторы"
							onChange={handleChange}
						/>
					</div>

					<div className="form__row-12">
						<span>дополнительная информация</span>
						<textarea
							className="textarea"
							name="organisators"
							placeholder="организаторы"
							value="организаторы"
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
							name="link"
							placeholder="ссылка"
							value="ссылка"
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
							name="link"
							placeholder="ссылка"
							value="ссылка"
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
