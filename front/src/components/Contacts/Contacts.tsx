import type { ChangeEvent } from 'react';
import emailjs from '@emailjs/browser';
import { useEffect, useLayoutEffect, useState } from 'react';
import Seo from '@/components/Seo/Seo';
import SocialLinks from '@/components/SocialLinks/SocialLinks';
import { links } from '@/variables/links';
import './Contacts.scss';

export default function Contacts() {
	const [mailData, setMailData] = useState({ name: '', email: '', message: '' });
	const [isMessageSending, setIsMessageSending] = useState(false);
	const [isSuccessSended, setIsSuccessSended] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const [isButtonDisabled, setIsButtonDisabled] = useState(true);

	const { name, email, message } = mailData;

	const handleAgree = () => {
		setIsButtonDisabled(!isButtonDisabled);
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = event.currentTarget;
		setMailData({ ...mailData, [name]: value });
	};

	const sendEmail = (event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault();

		if (isButtonDisabled) {
			return;
		}

		setIsMessageSending(true);
		setIsButtonDisabled(true);
		setShowAlert(false);
		emailjs
			.sendForm('service_j8t6eu8', 'template_f2efm3h', event.currentTarget, {
				publicKey: 'jtX7nvhSOFpKkSfnY',
			})
			.then(
				(result) => {
					console.warn(result.text);
					setIsSuccessSended(true);
					setShowAlert(true);
					setIsMessageSending(false);
					setMailData({ name: '', email: '', message: '' });
				},
				(error) => {
					console.error(error.text);
					setIsSuccessSended(false);
					setShowAlert(true);
					setIsMessageSending(false);
				},
			);
	};

	useEffect(() => {
		if (showAlert) {
			setTimeout(() => setShowAlert(false), 5000);
		}
	}, [showAlert]);

	useLayoutEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'instant',
		});
	});

	return (
		<>
			<Seo title="Камамото: кантакты и форма обратной связи" />

			<h1 className="title title--1">Контакты</h1>
			<p className="text text--muted">
				Для связи со мной можно использовать одну из следующих ссылок, ведущих на реурсы
				коллекции:
			</p>
			<section className="section contacts">

				<SocialLinks links={ links.social } additionalClassNames="contacts__links" />

				<p className="text text--muted">
					Также можно заполнить форму ниже, я получу оповещение и свяжусь с вами:
				</p>

				<form className="container contacts__form" onSubmit={ sendEmail }>
					<fieldset className="contacts__fieldset" disabled={ isMessageSending }>
						<input
							className={ `input ${
								isMessageSending ? 'input_disabled' : ''
							}` }
							placeholder="Имя"
							name="name"
							value={ name }
							type="text"
							required
							onChange={ handleChange }
							minLength={ 3 }
							maxLength={ 40 }
						>
						</input>
						<input
							className={ `input ${
								isMessageSending ? 'input_disabled' : ''
							}` }
							placeholder="Почта"
							name="email"
							value={ email }
							type="email"
							required
							onChange={ handleChange }
						>
						</input>
						<textarea
							className={ `textarea input${
								isMessageSending ? ' input_disabled' : ''
							}` }
							placeholder="Сообщение"
							name="message"
							value={ message }
							rows={ 5 }
							required
							onChange={ handleChange }
						>
						</textarea>

						<p>
							<span className="contacts__agreement">
								Вместе с текстом сообщения вы передаёте ваши персональные данные. Я не собираю и не
								храню их, но прошу подтвердить своё согласие на их передачу&nbsp;&nbsp;&nbsp;
							</span>
							<input
								className="contacts__agreement"
								type="checkbox"
								checked={ !isButtonDisabled }
								disabled={ isMessageSending }
								onChange={ handleAgree }
							>
							</input>
						</p>

						<button
							className={ `button ${isMessageSending ? 'button--sending' : ''}
            ${isButtonDisabled ? 'button--disabled' : ''}` }
							type="submit"
						>
							Отправить
						</button>

						{ showAlert && isSuccessSended && (
							<span className="contacts__submit-message contacts__submit-message_success ">
								Сообщение отправлено
							</span>
						) }
						{ showAlert && !isSuccessSended && (
							<span className="contacts__submit-message contacts__submit-message_error">
								Произошла ошибка
							</span>
						) }
					</fieldset>
				</form>
			</section>
		</>
	);
}
