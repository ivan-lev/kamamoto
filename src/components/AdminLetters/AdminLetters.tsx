import type { RootState } from '@/slices/admin/index';
import type { ChangeEvent } from 'react';
import Preloader from '@/components/Preloader/Preloader';
import Seo from '@/components/Seo/Seo';
import { setLetters } from '@/slices/admin/letters';
import { clearPartnerForm, setPartnerToEdit } from '@/slices/admin/partners';
import { api } from '@/utils/api';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './AdminLetters.scss';

export default function AdminLetters(): JSX.Element {
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

	// delete this. it is just for testing
	useEffect(() => {
		setIsFormDisabled(false);
	});

	useEffect(() => {
		// dispatch(clearPartnerForm());
		api
			.getLetters()
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

	// const handleCreatePartner = () => {
	// 	setIsFormDisabled(true);
	// 	const token = localStorage.getItem('kmmttkn');
	// 	if (token) {
	// 		api
	// 			.createPartner(token, title, link, logo, isActive)
	// 			.then((response) => {
	// 				dispatch(setLetters([...partners, response]));
	// 				dispatch(clearPartnerForm());
	// 				dispatch(setIsExistingPartnerEdited(false));
	// 				setIsFormDisabled(false);
	// 				setSaveMessage('Новый партнёр в базе');
	// 			})
	// 			.catch((error) => {
	// 				console.error(error);
	// 				setIsFormDisabled(false);
	// 				setSaveMessage('Что-то пошло не так :(');
	// 			});
	// 	}
	// };

	// const handleEditPartner = (partner: Partner) => {
	// 	dispatch(setpartnerToEdit(partner));
	// 	dispatch(setIsExistingPartnerEdited(true));
	// };

	// const handleUpdatePartner = () => {
	// 	setIsFormDisabled(true);
	// 	const token = localStorage.getItem('kmmttkn');
	// 	if (token) {
	// 		api
	// 			.updatePartner(token, partnerToEdit)
	// 			.then((response) => {
	// 				const newPartnersList = partners.map((partner) => {
	// 					return response._id !== partner._id ? partner : response;
	// 				});
	// 				dispatch(setLetters(newPartnersList));
	// 				dispatch(clearPartnerForm());
	// 				dispatch(setIsExistingPartnerEdited(false));
	// 				setIsFormDisabled(false);
	// 				setSaveMessage('Данные обновлены');
	// 			})
	// 			.catch((error) => {
	// 				console.error(error);
	// 				setIsFormDisabled(false);
	// 				setSaveMessage('Что-то пошло не так :(');
	// 			});
	// 	}
	// };

	// const handleDeletePartner = () => {
	// 	const token = localStorage.getItem('kmmttkn');
	// 	if (token) {
	// 		api
	// 			.deletePartner(token, partnerToEdit._id)
	// 			.then((response) => {
	// 				const newPartnersList = partners.filter(partner => partner._id !== response._id);
	// 				dispatch(setLetters(newPartnersList));
	// 				dispatch(clearPartnerForm());
	// 				dispatch(setIsExistingPartnerEdited(false));
	// 				setIsFormDisabled(false);
	// 			})
	// 			.catch((error) => {
	// 				console.error(error);
	// 				setIsFormDisabled(false);
	// 			});
	// 	}
	// };

	// const handleCancelEditLetter = () => {
	// 	dispatch(clearPartnerForm());
	// 	dispatch(setIsExistingPartnerEdited(false));
	// };

	return (
		<>
			<Seo title="Камамото: благодарственные письма" />

			{showPreloader
				? (
						<Preloader />
					)
				: (
						<section className="container admin-partners">
							<h2 className="title3">Благодарственные письма (в разработке)</h2>

							<div className="admin-section-list">
								<div className="admin-section-list__row admin-partners__row">
									<span>Описание</span>
									<span>Акт-сть</span>
									<span></span>
								</div>
								{letters.map((letter) => {
									const { id, description, isActive } = letter;
									return (
										<div key={id} className="muted admin-section-list__row admin-partners__row">
											<span>{description}</span>
											<span>{isActive ? 'Да' : 'Нет'}</span>
											<span>
												<button
													className="admin-section-list__edit-button"
													// onClick={() => handleEditPartner(partner)}
												>
												</button>
											</span>
										</div>
									);
								})}
							</div>

							<div className="admin-section-form">
								<form className="form">
									<fieldset className="form__fieldset" disabled={isFormDisabled}>
										<legend className="form__field-legend">
											{!isExistingPartnerEdited ? 'Добавить партнёра' : 'Редактировать данные партнёра'}
										</legend>
										<div className="form__grid">
											<div className="form__row-10">
												<span>наименование</span>
												<input
													className={`input ${
														isFormDisabled ? 'input_disabled' : ''
													}`}
													type="text"
													name="title"
													placeholder="название организации"
													value={title}
													onChange={handleChange}
												/>
											</div>

											<div className="form__row-2 form__row--centered">
												<span>на сайте</span>
												<label
													className={`input checkbox-label ${
														isActive ? 'checkbox-label--checked' : ''
													} ${
														isFormDisabled ? 'checkbox-label--disabled' : ''
													}`}
												>
													<input
														className="checkbox-input"
														type="checkbox"
														checked={isActive}
														name="isActive"
														onChange={handleCheckBox}
													/>
												</label>
											</div>

											<div className="form__row-6">
												<span>ссылка на ресурс партнёра</span>
												<input
													className={`input ${
														isFormDisabled ? 'input_disabled' : ''
													}`}
													type="text"
													name="link"
													placeholder="сайт, вк, канал в телеграме"
													value={link}
													onChange={handleChange}
												/>
											</div>

											<div className="form__row-6">
												<span>файл логотипа</span>
												<input
													className={`input ${
														isFormDisabled ? 'input_disabled' : ''
													}`}
													type="text"
													name="logo"
													placeholder="название файла"
													value={logo}
													onChange={handleChange}
												/>
											</div>

											<div className="form__row-12 form__row-12--inline">

												{!isExistingPartnerEdited
													? (
															<>
																<button
																	className="button"
																	type="button"
																	onClick={() => dispatch(clearPartnerForm())}
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
																	disabled={isFormDisabled}
																>
																	Отменить
																</button>
																<button
																	className="button"
																	type="button"
																	// onClick={handleUpdatePartner}
																	disabled={isFormDisabled}
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
														)}
												{/* <button
                      className="button"
                      type="button"
                      // onClick={handleCloseExhibitionForm}
                    >
                      Закрыть
                    </button> */}

											</div>
										</div>
									</fieldset>
									<span className="admin-section-form__save-status">{saveMessage}</span>
								</form>
							</div>
						</section>
					)}
		</>
	);
}
