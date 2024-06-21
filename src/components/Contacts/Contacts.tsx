import './Contacts.scss';

export default function Contacts() {
  return (
    <section className="contacts">
      <h2 className="title title2">Контакты</h2>
      <form className="container background-muted bordered contacts__form">
        <input className="contacts__input background-muted bordered" placeholder="Имя"></input>
        <input className="contacts__input background-muted bordered" placeholder="Почта"></input>
        <textarea
          className="contacts__input background-muted bordered contacts__textarea"
          placeholder="Сообщение"
          rows={5}
        ></textarea>
        <button className="contacts__submit" type="submit">
          Отправить
        </button>
      </form>
    </section>
  );
}
