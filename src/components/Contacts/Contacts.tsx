import './Contacts.scss';

import { useState } from 'react';

import emailjs from '@emailjs/browser';

import { socialLinks } from '../../variables/socialLinks';

export default function Contacts() {
  const [mailData, setMailData] = useState({ name: '', email: '', message: '' });
  const [isMessageSending, setIsMessageSending] = useState(false);
  const [isSuccessSended, setIsSuccessSended] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const { name, email, message } = mailData;

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
      <p className="text muted">Для связи со мной можно использ одну из следующих ссылок:</p>

      <div className="links_social contacts__links">
        {socialLinks.map(socialLink => {
          return (
            <a
              className="link background-muted bordered link_social"
              href={socialLink.link}
              key={socialLink.id}
            >
              <img className="link_social-icon" src={socialLink.icon} />
              {socialLink.title}
            </a>
          );
        })}
      </div>

      <p className="text muted">Вы также можете заполнить форму ниже, и я свяжусь с вами:</p>

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
          className={`contacts__submit ${isMessageSending && 'contacts__submit_sending'}`}
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
