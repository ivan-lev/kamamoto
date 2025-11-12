import type { ChangeEvent } from 'react';

import type { RootState } from '@/slices/admin/index';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Preloader from '@/components/Preloader/Preloader';
import Seo from '@/components/Seo/Seo';
import { setLetters } from '@/slices/admin/letters';
import { clearPartnerForm, setPartnerToEdit } from '@/slices/admin/partners';
import { api } from '@/utils/api/api';

export default function Letters() {
	const dispatch = useDispatch();

	const [showPreloader, setShowPreloader] = useState<boolean>(true);
	const [isFormDisabled, setIsFormDisabled] = useState<boolean>(false);
	const [saveMessage, setSaveMessage] = useState<string>('');

	const letters = useSelector((state: RootState) => state.letters.letters);

	const isExistingPartnerEdited = useSelector(
		(state: RootState) => state.partners.isExistingPartnerEdited,
	);

	const partnerToEdit = useSelector((state: RootState) => state.partners.partnerToEdit);
	const { title, link, logo, isActive } = partnerToEdit;

	useLayoutEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'instant',
		});
	});

	// delete this. it is just for testing
	useEffect(() => {
		setIsFormDisabled(false);
	});

	useEffect(() => {
		// dispatch(clearPartnerForm());
		api.letters.getLetters()
			.then((letters) => {
				dispatch(setLetters(letters));
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
		dispatch(setPartnerToEdit({ ...partnerToEdit, [name]: value }));
	};

	const handleCheckBox = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = event.target;
		dispatch(setPartnerToEdit({ ...partnerToEdit, [name]: checked }));
	};

	return (
		<>
			<Seo title="Камамото: благодарственные письма" description="Благодарственные письма от организаций и специалистов, сотрудничающих с коллекционером" />

			{ showPreloader
				? (
					<Preloader />
				)
				: (
					<section className="container container--background-transparent admin-partners">
						<h1 className="title title--1">Благодарственные письма (в разработке)</h1>

						<div className="table">
							<div className="table__row">
								<span className="table__cell table__cell--span-10">Описание</span>
								<span className="table__cell table__cell--centered">Акт-сть</span>
								<span className="table__cell table__cell--centered"></span>
							</div>
							{ letters.map((letter) => {
								const { id, description, isActive } = letter;
								return (
									<div key={ id } className="table__row">
										<span className="table__cell table__cell--span-10">{ description }</span>
										<span className="table__cell table__cell--centered">{ isActive ? 'Да' : 'Нет' }</span>
										<span className="table__cell table__cell--centered">
											<button
												className="table__button table__button--edit"
												// onClick={() => handleEditPartner(partner)}
											>
											</button>
										</span>
									</div>
								);
							}) }
						</div>

						<form className="form">
							<fieldset className="form__fieldset" disabled={ isFormDisabled }>
								<legend className="form__field-legend">
									{ !isExistingPartnerEdited ? 'Добавить партнёра' : 'Редактировать данные партнёра' }
								</legend>
								<div className="form__grid">
									<div className="form__row-10">
										<span>наименование</span>
										<input
											className={ `input ${
												isFormDisabled ? 'input_disabled' : ''
											}` }
											type="text"
											name="title"
											placeholder="название организации"
											value={ title }
											onChange={ handleChange }
										/>
									</div>

									<div className="form__row-2 form__row--centered">
										<span>на сайте</span>
										<label
											className={ `input checkbox-label ${
												isActive ? 'checkbox-label--checked' : ''
											} ${
												isFormDisabled ? 'checkbox-label--disabled' : ''
											}` }
										>
											<input
												className="checkbox-input"
												type="checkbox"
												checked={ isActive }
												name="isActive"
												onChange={ handleCheckBox }
											/>
										</label>
									</div>

									<div className="form__row-6">
										<span>ссылка на ресурс партнёра</span>
										<input
											className={ `input ${
												isFormDisabled ? 'input_disabled' : ''
											}` }
											type="text"
											name="link"
											placeholder="сайт, вк, канал в телеграме"
											value={ link }
											onChange={ handleChange }
										/>
									</div>

									<div className="form__row-6">
										<span>файл логотипа</span>
										<input
											className={ `input ${
												isFormDisabled ? 'input_disabled' : ''
											}` }
											type="text"
											name="logo"
											placeholder="название файла"
											value={ logo }
											onChange={ handleChange }
										/>
									</div>

									<div className="form__row form__row-12 form__row-12--inline">
										<span className="form__request-status">{ saveMessage }</span>
										{ !isExistingPartnerEdited
											? (
												<>
													<button
														className="button"
														type="button"
														onClick={ () => dispatch(clearPartnerForm()) }
													>
														Очистить
													</button>
													<button
														className="button"
														type="submit"
														// onClick={handleCreatePartner}
													>
														Создать
													</button>
												</>
											)
											: (
												<>
													<button
														className="button"
														type="button"
														// onClick={handleCancelEditLetter}
														disabled={ isFormDisabled }
													>
														Отменить
													</button>
													<button
														className="button"
														type="button"
														// onClick={handleUpdatePartner}
														disabled={ isFormDisabled }
													>
														Сохранить
													</button>
													<button
														className="button"
														type="button"
														// onClick={handleDeletePartner}
													>
														Удалить
													</button>
												</>
											) }
										{ /* <button
                      className="button"
                      type="button"
                      // onClick={handleCloseExhibitionForm}
                    >
                      Закрыть
                    </button> */ }

									</div>
								</div>
							</fieldset>
						</form>
					</section>
				) }
		</>
	);
}
