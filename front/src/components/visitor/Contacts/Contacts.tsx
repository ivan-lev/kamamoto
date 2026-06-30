import emailjs from '@emailjs/browser';
import { useEffect, useLayoutEffect, useState } from 'react';
import Seo from '@/components/visitor/Seo/Seo';
import SocialLinks from '@/components/visitor/SocialLinks/SocialLinks';
import { scrollToTop } from '@/utils/scrollToTop';
import { links } from '@/variables/links';
import './Contacts.scss';

export default function Contacts() {
	const [mailData, setMailData] = useState({ name: '', email: '', message: '' });
	const [isMessageSending, setIsMessageSending] = useState(false);
	const [isSuccessSended, setIsSuccessSended] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const [isButtonDisabled, setIsButtonDisabled] = useState(true);

	const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
	const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
	const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

	const { name, email, message } = mailData;

	const handleAgree = () => {
		setIsButtonDisabled(!isButtonDisabled);
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = event.currentTarget;
		setMailData({ ...mailData, [name]: value });
	};

	const sendEmail = (event: React.SyntheticEvent<HTMLFormElement>): void => {
		event.preventDefault();

		if (isButtonDisabled) {
			return;
		}

		setIsMessageSending(true);
		setIsButtonDisabled(true);
		setShowAlert(false);
		emailjs
			.sendForm(serviceId, templateId, event.currentTarget, {
				publicKey,
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
			setTimeout(setShowAlert, 5000, false);
		}
	}, [showAlert]);

	useLayoutEffect(() => scrollToTop(), []);

	return (
		<>
			<Seo
				title="Камамото: контакты и форма обратной связи"
				description="Список ресурсов и контактов, по которым можно со мной связаться"
			/>

			<h1 className="title title--1">Контакты</h1>
			<p className="text text--muted">
				Для связи со мной можно использовать одну из следующих ссылок, ведущих на реурсы коллекции:
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
								Вместе с текстом сообщения вы передаёте ваши персональные данные.
								<br />
								Я не собираю и не
								храню их, но прошу подтвердить своё согласие на их передачу, чтобы я смог вам ответить&nbsp;&nbsp;&nbsp;
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
