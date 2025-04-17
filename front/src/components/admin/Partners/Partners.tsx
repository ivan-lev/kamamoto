import type { RootState } from '@/slices/admin/index';
import type { Partner } from '@/types/partnerType';
import type { ChangeEvent } from 'react';
import Preloader from '@/components/Preloader/Preloader';
import Seo from '@/components/Seo/Seo';
import {
	clearPartnerForm,
	setIsExistingPartnerEdited,
	setPartners,
	setPartnerToEdit,
} from '@/slices/admin/partners';
import { api } from '@/utils/api/api';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Partners() {
	const dispatch = useDispatch();

	const [showPreloader, setShowPreloader] = useState<boolean>(true);
	const [isFormDisabled, setIsFormDisabled] = useState<boolean>(false);
	const [saveMessage, setSaveMessage] = useState<string>('');

	const partners = useSelector((state: RootState) => state.partners.partners);
	const partnerToEdit = useSelector((state: RootState) => state.partners.partnerToEdit);
	const isExistingPartnerEdited = useSelector(
		(state: RootState) => state.partners.isExistingPartnerEdited,
	);

	const { title, link, logo, isActive } = partnerToEdit;

	useEffect(() => {
		dispatch(clearPartnerForm());
		api.partners.getPartners()
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
		dispatch(setPartnerToEdit({ ...partnerToEdit, [name]: value }));
	};

	const handleCheckBox = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = event.target;
		dispatch(setPartnerToEdit({ ...partnerToEdit, [name]: checked }));
	};

	const handleCreatePartner = () => {
		setIsFormDisabled(true);
		const token = localStorage.getItem('kmmttkn');
		if (token) {
			api.partners.createPartner(token, title, link, logo, isActive)
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
		dispatch(setPartnerToEdit(partner));
		dispatch(setIsExistingPartnerEdited(true));
	};

	const handleUpdatePartner = () => {
		setIsFormDisabled(true);
		const token = localStorage.getItem('kmmttkn');
		if (token) {
			api.partners.updatePartner(token, partnerToEdit)
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
			api.partners.deletePartner(token, partnerToEdit._id)
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

	const handleCancelEditPartner = () => {
		dispatch(clearPartnerForm());
		dispatch(setIsExistingPartnerEdited(false));
	};

	return (
		<>
			<Seo title="Камамото: список партнёров" />

			{showPreloader
				? (
						<Preloader />
					)
				: (
						<div className="container container--background-transparent">
							<h2 className="title3">Партнёры</h2>
							<div className="table">
								<div className="table__row">
									<span className="table__cell table__cell--span-10">Название</span>
									<span className="table__cell table__cell--centered">Акт-сть</span>
									<span className="table__cell table__cell--centered"></span>
								</div>
								{partners.map((partner) => {
									const { _id, title, isActive } = partner;
									return (
										<div key={_id} className="table__row">
											<span className="table__cell table__cell--span-10">{title}</span>
											<span className="table__cell table__cell--centered">{isActive ? 'Да' : 'Нет'}</span>
											<div className="table__cell table__cell--centered">
												<button
													className="table__button table__button--edit"
													onClick={() => handleEditPartner(partner)}
												>
												</button>
											</div>
										</div>
									);
								})}
							</div>

							<form className="form">
								<fieldset className="form__fieldset" disabled={isFormDisabled}>
									<legend className="form__legend">
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
												className={`checkbox-label ${
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

										<div className="form__row-8">
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

										<div className="form__row-4">
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

										<div className="form__row-12--inline">
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
															<button className="button" type="submit" onClick={handleCreatePartner}>
																Создать
															</button>
														</>
													)
												: (
														<>
															<button
																className="button"
																type="button"
																onClick={handleCancelEditPartner}
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
															<button className="button" type="button" onClick={handleDeletePartner}>
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
								<span className="form__save-status">{saveMessage}</span>
							</form>
						</div>
					)}
		</>
	);
}
