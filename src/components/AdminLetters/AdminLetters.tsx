// Types
import type { ChangeEvent } from 'react';
import type { AdminRootState } from '../../slices/adminSlice';
import type { Partner } from '../../types/partnerType';

// React and Redux
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearPartnerForm, setIsExistingPartnerEdited, setPartners, setPartnerToDisplay,
} from '../../slices/adminSlice';

// Components
import Preloader from '../Preloader/Preloader';
import Seo from '../Seo/Seo';

// Utils
import { api } from '../../utils/api';

import './AdminLetters.scss';

export default function AdminLetters(): JSX.Element {
	const dispatch = useDispatch();

	const [showPreloader, setShowPreloader] = useState<boolean>(true);
	const [isFormDisabled, setIsFormDisabled] = useState<boolean>(false);
	const [saveMessage, setSaveMessage] = useState<string>('');

	const partners = useSelector((state: AdminRootState) => state.admin.partners);
	const partnerToDisplay = useSelector((state: AdminRootState) => state.admin.partnerToDisplay);
	const isExistingPartnerEdited = useSelector(
		(state: AdminRootState) => state.admin.isExistingPartnerEdited,
	);

	const { title, link, logo, isActive } = partnerToDisplay;

	useEffect(() => {
		dispatch(clearPartnerForm());
		api
			.getPartners()
			.then((partners) => {
				dispatch(setPartners(partners));
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
		dispatch(setPartnerToDisplay({ ...partnerToDisplay, [name]: value }));
	};

	const handleCheckBox = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = event.target;
		dispatch(setPartnerToDisplay({ ...partnerToDisplay, [name]: checked }));
	};

	const handleCreatePartner = () => {
		setIsFormDisabled(true);
		const token = localStorage.getItem('kmmttkn');
		if (token) {
			api
				.createPartner(token, title, link, logo, isActive)
				.then((response) => {
					dispatch(setPartners([...partners, response]));
					dispatch(clearPartnerForm());
					dispatch(setIsExistingPartnerEdited(false));
					setIsFormDisabled(false);
					setSaveMessage('Новый партнёр в базе');
				})
				.catch((error) => {
					console.error(error);
					setIsFormDisabled(false);
					setSaveMessage('Что-то пошло не так :(');
				});
		}
	};

	const handleEditPartner = (partner: Partner) => {
		dispatch(setPartnerToDisplay(partner));
		dispatch(setIsExistingPartnerEdited(true));
	};

	const handleUpdatePartner = () => {
		setIsFormDisabled(true);
		const token = localStorage.getItem('kmmttkn');
		if (token) {
			api
				.updatePartner(token, partnerToDisplay)
				.then((response) => {
					const newPartnersList = partners.map((partner) => {
						return response._id !== partner._id ? partner : response;
					});
					dispatch(setPartners(newPartnersList));
					dispatch(clearPartnerForm());
					dispatch(setIsExistingPartnerEdited(false));
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

	const handleDeletePartner = () => {
		const token = localStorage.getItem('kmmttkn');
		if (token) {
			api
				.deletePartner(token, partnerToDisplay._id)
				.then((response) => {
					const newPartnersList = partners.filter(partner => partner._id !== response._id);
					dispatch(setPartners(newPartnersList));
					dispatch(clearPartnerForm());
					dispatch(setIsExistingPartnerEdited(false));
					setIsFormDisabled(false);
				})
				.catch((error) => {
					console.error(error);
					setIsFormDisabled(false);
				});
		}
	};

	const handleCancelEditLetter = () => {
		dispatch(clearPartnerForm());
		dispatch(setIsExistingPartnerEdited(false));
	};

	return (
		<>
			<Seo title="Камамото: благодарственные письма" />

			{showPreloader
				? (
						<Preloader />
					)
				: (
						<section className="container admin-partners">
							<h2 className="title3">Благодарственные письма (в разработке - загружает партнеров)</h2>

							<div className="admin-section-list">
								<div className="admin-section-list__row admin-partners__row">
									<span>Название</span>
									<span>Акт-сть</span>
									<span></span>
								</div>
								{partners.map((partner) => {
									const { _id, title, isActive } = partner;
									return (
										<div key={_id} className="muted admin-section-list__row admin-partners__row">
											<span>{title}</span>
											<span>{isActive ? 'Да' : 'Нет'}</span>
											<span>
												<button
													className="admin-section-list__edit-button"
													onClick={() => handleEditPartner(partner)}
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
																	onClick={handleCreatePartner}
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
																	onClick={handleCancelEditLetter}
																	disabled={isFormDisabled}
																>
																	Отменить
																</button>
																<button
																	className="button"
																	type="button"
																	onClick={handleUpdatePartner}
																	disabled={isFormDisabled}
																>
																	Сохранить
																</button>
																<button
																	className="button"
																	type="button"
																	onClick={handleDeletePartner}
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
