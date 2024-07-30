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

  const { name, email, message } = mailData;

  useEffect(() => {
    if (showAlert) {
      setTimeout(() => setShowAlert(false), 5000);
    }
  }, [showAlert]);

  const handleChange = (event: any) => {
    const { name, value } = event.currentTarget;
    setMailData({ ...mailData, [name]: value });
  };

  const sendEmail = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setIsMessageSending(true);
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
          className={`background-muted bordered contacts__input ${
            isMessageSending && 'contacts__input_disabled'
          }`}
          placeholder="Имя"
          name="name"
          value={name}
          type="text"
          required
          onChange={handleChange}
          disabled={isMessageSending}
        ></input>

        <input
          className={`background-muted bordered contacts__input ${
            isMessageSending && 'contacts__input_disabled'
          }`}
          placeholder="Почта"
          name="email"
          value={email}
          type="email"
          required
          onChange={handleChange}
          disabled={isMessageSending}
        ></input>

        <textarea
          className={`background-muted bordered contacts__textarea contacts__input ${
            isMessageSending && 'contacts__input_disabled'
          }`}
          placeholder="Сообщение"
          name="message"
          value={message}
          rows={5}
          required
          onChange={handleChange}
          disabled={isMessageSending}
        ></textarea>

        <button
          className={`muted-8 contacts__submit ${
            isMessageSending && 'muted contacts__submit_sending'
          }`}
          type="submit"
        >
          Отправить
        </button>

        {showAlert && isSuccessSended && (
          <span className=" contacts__submit-message contacts__submit-message_success ">
            Сообщение отправлено
          </span>
        )}
        {showAlert && !isSuccessSended && (
          <span className=" contacts__submit-message contacts__submit-message_error">
            Произошла ошибка
          </span>
        )}
      </form>
    </section>
  );
}
