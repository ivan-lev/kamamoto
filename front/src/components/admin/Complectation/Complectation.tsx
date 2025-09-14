import type { ChangeEvent } from 'react';
import type { Complectation } from '@/types/compleactation';
import { useEffect, useState } from 'react';
import Preloader from '@/components/Preloader/Preloader';
import Seo from '@/components/Seo/Seo';
import { api } from '@/utils/api/api';

export default function Compleactation() {
	const [showPreloader, setShowPreloader] = useState<boolean>(true);
	const [isFormDisabled, setIsFormDisabled] = useState<boolean>(false);
	const [saveMessage, setSaveMessage] = useState<string>('');
	const [complectations, setComplectations] = useState<Complectation[]>([]);
	const [isExistingComplectationEdited, _setIsExistingPartnerEdited] = useState<boolean>(false);
	const [newComplectation, setNewComplectation] = useState<Complectation>({ name: '', title: '' });

	useEffect(() => {
		api.complectation.getComplections()
			.then((complectations) => {
				setComplectations(complectations.toSorted((a, b) => a.title.localeCompare(b.title)));
				setShowPreloader(false);
			})
			.catch(error => console.error(error));
	}, []);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setNewComplectation({ ...newComplectation, [name]: value });
	};

	function handleCreateComplectation() {
		setIsFormDisabled(true);
		const token = localStorage.getItem('kmmttkn');
		if (token) {
			api.complectation.createComplectation(token, newComplectation)
				.then((response: Complectation) => {
					setComplectations([...complectations, response]);
					setIsFormDisabled(false);
					setSaveMessage('Новая комплектация в базе');
				})
				.catch((error) => {
					console.error(error);
					setIsFormDisabled(false);
					setSaveMessage('Что-то пошло не так :(');
				});
		}
	};

	function handleCancelEditComplectation() {};

	function handleUpdateComplectation() {};

	return (
		<>
			<Seo title="Камамото: список партнёров" />

			{ showPreloader
				? (
					<Preloader />
				)
				: (
					<div className="container container--background-transparent">
						<h2 className="title3">Комплектация</h2>
						<div className="table">
							<div className="table__row">
								<span className="table__cell table__cell--span-5">title</span>
								<span className="table__cell table__cell--span-6">name</span>
								<span className="table__cell table__cell--centered"></span>
							</div>
							{ complectations.map((complectation) => {
								const { name, title } = complectation;
								return (
									<div key={ name } className="table__row">
										<span className="table__cell table__cell--span-5">{ title }</span>
										<span className="table__cell table__cell--span-6">{ name }</span>
										<div className="table__cell table__cell--centered">
											<button
												className="table__button table__button--edit"
												// onClick={() => handleEditPartner(partner)}
											>
											</button>
										</div>
									</div>
								);
							}) }
						</div>

						<form className="form">
							<fieldset className="form__fieldset" disabled={ isFormDisabled }>
								<legend className="form__legend">
									{ !isExistingComplectationEdited ? 'Добавить комлектацию' : 'Редактировать данные партнёра' }
								</legend>

								<div className="form__grid">
									<div className="form__row form__row-6">
										<span>name</span>
										<input
											className={ `input ${
												isFormDisabled ? 'input_disabled' : ''
											}` }
											type="text"
											name="name"
											placeholder="поле name"
											value={ newComplectation.name }
											onChange={ handleChange }
										/>
									</div>

									<div className="form__row form__row-6">
										<span>title</span>
										<input
											className={ `input ${
												isFormDisabled ? 'input_disabled' : ''
											}` }
											type="text"
											name="title"
											placeholder="поле title"
											value={ newComplectation.title }
											onChange={ handleChange }
										/>
									</div>

									<div className="form__row form__row-12 form__row-12--inline">
										{ !isExistingComplectationEdited
											? (
												<>
													<button
														className="button"
														type="button"
														// onClick={ () => dispatch(clearPartnerForm()) }
													>
														Очистить
													</button>
													<button className="button" type="submit" onClick={ handleCreateComplectation }>
														Создать
													</button>
												</>
											)
											: (
												<>
													<button
														className="button"
														type="button"
														onClick={ handleCancelEditComplectation }
														disabled={ isFormDisabled }
													>
														Отменить
													</button>
													<button
														className="button"
														type="button"
														onClick={ handleUpdateComplectation }
														disabled={ isFormDisabled }
													>
														Сохранить
													</button>
													{ /* <button className="button" type="button" onClick={ handleDeletePartner }>
														Удалить
													</button> */ }
												</>
											) }
										<button
											className="button"
											type="button"
											// onClick={handleCloseExhibitionForm}
										>
											Закрыть
										</button>
									</div>
								</div>
							</fieldset>
							<span className="form__save-status">{ saveMessage }</span>
						</form>
					</div>
				) }
		</>
	);
}
