import './About.scss';

import avatar from '/avatar.jpg';

import { socialLinks } from '../../variables/socialLinks';

export default function About() {
  return (
    <section className="section about">
      <img className="about__avatar" src={avatar}></img>
      <div className="about__heading">
        <h2 className="title title2 about__title">Иван Лев</h2>
        <ul className="list about__list">
          <li>Коллекционер японской керамики</li>
          <li>Ценитель китайского чая</li>
          <li>Веб-разработчик</li>
        </ul>
        <a className="link about__anchor-link" href="#about-author">
          <img className="background-muted bordered link__icon" src="/icons/link-arrow-down.svg" />
          Обо мне
        </a>
      </div>

      <div id="about-author" className="about__content container background-muted bordered">
        <h3 className="title title3">Созерцая красоту</h3>
        <p className="text text_muted">
          Меня зовут Иван. Я коллекционирую вещи, созданные японскими мастерами.
        </p>
        <p className="text text_muted">
          Культура и искусство Востока всегда привлекали меня своей глубиной и разнообразием, а
          непосредственный контакт и погружение начался примерно в 2008 году, когда я всерьёз
          увлёкся китайским чаем. У меня появились первые атрибуты для приготовления напитка, и я
          стал активно изучать эту сферу. Информации в то время было мало, и приходилось искать всё
          самому: так я научился находить и собирать знания, использовать их крупицы, чтобы сложить
          более полную картину изучаемого.
        </p>
        <p className="text text_muted">
          В результате у меня появился небольшой проект, посвященный китайскому чаю, который
          благополучно существовал до 2015 года, когда я, изучая чай других стран, открыл для себя
          мир японской керамики (которая имеет к истории чая непосредственное отношение). Я
          загорелся этим видом искусства, таким многогранным и разнообразным, что не хватит и целой
          жизни, чтобы изучить его полностью. В этот момент появился новый проект, посвященные
          японским вещам - Камамото.
        </p>
        <p className="text text_muted">
          Японское слово камамото состоит из двух иероглифов: <b>窯元</b>. Первый означает печь для
          обжига, а второй "начало" и "происхождение". Вместе они образуют слово понятие "гончарная
          мастерская" или "печь", подразумевая непосредственное место, где производятся изделия.
          Также словом камамото называют мастера-гончара​.
        </p>
        <p className="text text_muted">
          Я счел, что это название идеально подходит для названия коллекции, вещи для которой я
          выбираю с особой ответственностью, трепетом и внимательностью, которые развивал с 2015
          года.
        </p>
      </div>
      <div className="about__links">
        {socialLinks.map(socialLink => {
          return (
            <a
              className="link background-muted bordered about__link"
              href={socialLink.link}
              key={socialLink.id}
            >
              <img className="about__icon" src={socialLink.icon} />
              {socialLink.title}
            </a>
          );
        })}
      </div>
    </section>
  );
}
