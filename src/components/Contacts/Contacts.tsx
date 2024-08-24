import './Contacts.scss';

// React
import { useEffect, useState } from 'react';

// Components
import SocialLinks from '../SocialLinks/SocialLinks';

// Other packages
import emailjs from '@emailjs/browser';

// Variables
import { socialLinks } from '../../variables/socialLinks';

export default function Contacts() {
  const [mailData, setMailData] = useState({ name: '', email: '', message: '' });
  const [isMessageSending, setIsMessageSending] = useState(false);
  const [isSuccessSended, setIsSuccessSended] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const { name, email, message } = mailData;

  useEffect(() => {
    if (showAlert) {
      setTimeout(() => setShowAlert(false), 5000);
    }
  }, [showAlert]);

  const handleAgree = () => {
    setIsButtonDisabled(!isButtonDisabled);
  };

  const handleChange = (event: any) => {
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
        publicKey: 'jtX7nvhSOFpKkSfnY'
      })
      .then(
        result => {
          console.log(result.text);
          setIsSuccessSended(true);
          setShowAlert(true);
          setIsMessageSending(false);
          setMailData({ name: '', email: '', message: '' });
        },
        error => {
          console.log(error.text);
          setIsSuccessSended(false);
          setShowAlert(true);
          setIsMessageSending(false);
        }
      );
  };

  return (
    <section className="section contacts">
      <h2 className="title title2">Контакты</h2>
      <p className="text muted">
        Для связи со мной можно использовать одну из следующих ссылок, ведущих на реурсы коллекции:
      </p>

      <SocialLinks links={socialLinks} additionalClassNames="contacts__links" />

      <p className="text muted">
        Также можно заполнить форму ниже, я получу оповещение и свяжусь с вами:
      </p>

      <form className="container background-muted bordered contacts__form" onSubmit={sendEmail}>
        <input
          className={`background-muted bordered input ${isMessageSending ? 'input_disabled' : ''}`}
          placeholder="Имя"
          name="name"
          value={name}
          type="text"
          required
          onChange={handleChange}
          disabled={isMessageSending}
          minLength={3}
          maxLength={40}
        ></input>
        <input
          className={`background-muted bordered input ${isMessageSending ? 'input_disabled' : ''}`}
          placeholder="Почта"
          name="email"
          value={email}
          type="email"
          required
          onChange={handleChange}
          disabled={isMessageSending}
        ></input>
        <textarea
          className={`background-muted bordered textarea input${
            isMessageSending ? ' input_disabled' : ''
          }`}
          placeholder="Сообщение"
          name="message"
          value={message}
          rows={5}
          required
          onChange={handleChange}
          disabled={isMessageSending}
        ></textarea>

        <p>
          <span className="muted contacts__agreement">
            Вместе с текстом сообщения вы передаёте ваши персональные данные. Я не собираю и не
            храню их, но прошу подтвердить своё согласие на их передачу&nbsp;&nbsp;&nbsp;
          </span>
          <input
            className="contacts__agreement"
            type="checkbox"
            checked={!isButtonDisabled}
            disabled={isMessageSending}
            onClick={handleAgree}
          ></input>
        </p>

        <button
          className={`button ${isMessageSending ? 'button_sending' : ''}
            ${isButtonDisabled ? 'muted' : ''}`}
          type="submit"
          disabled={isButtonDisabled}
        >
          Отправить
        </button>
        {showAlert && isSuccessSended && (
          <span className="contacts__submit-message contacts__submit-message_success ">
            Сообщение отправлено
          </span>
        )}
        {showAlert && !isSuccessSended && (
          <span className="contacts__submit-message contacts__submit-message_error">
            Произошла ошибка
          </span>
        )}
      </form>
    </section>
  );
}
