import Seo from '../Seo/Seo';

import './About.scss';
// Components
import SocialLinks from '../SocialLinks/SocialLinks';

// Variables
import { personalSocialLinks } from '../../variables/socialLinks';

export default function About() {
  return (
    <>
      <Seo title="Камамото: о коллекционере" />
      <section className="section">
        <div className="about">
          <img className="about__avatar" src="/images/about-avatar.jpg" alt=""></img>
          <div className="about__heading">
            <h2 className="title title2 about__title">Иван Лев</h2>
            <ul className="list about__list">
              <li>Коллекционер японской керамики</li>
              <li>Ценитель китайского чая</li>
              <li>Веб-разработчик</li>
            </ul>
            <a className="link about__anchor-link" href="#about-author">
              <img
                className="background-muted bordered link__icon"
                src="/icons/link-arrow-down.svg"
              />
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
              стал активно изучать эту сферу. Информации в то время было мало, и приходилось искать
              всё самому: так я научился находить и собирать знания, использовать их крупицы, чтобы
              сложить более полную картину изучаемого.
            </p>
            <img className="about__photo" src="/images/about-photo.jpg" alt="Чайное действо"></img>
            <p className="text text_muted">
              В результате у меня появился небольшой проект, посвященный китайскому чаю, который
              благополучно существовал до 2015 года, когда я, изучая чай других стран, открыл для себя
              мир японской керамики (которая имеет к истории чая непосредственное отношение). Я
              загорелся этим видом искусства, таким многогранным и разнообразным, что не хватит и
              целой жизни, чтобы изучить его полностью. В этот момент появился новый проект,
              посвященные японским вещам - Камамото.
            </p>
            <img
              className="about__photo"
              src="/images/about-photo-2.jpg"
              alt="Японская керамика и деревянные коробки"
            >
            </img>
            <p className="text text_muted">
              Японское слово камамото состоит из двух иероглифов: 窯元. Первый означает печь для обжига, а второй "начало" и "происхождение". Вместе они образуют слово понятие "гончарная мастерская" или "печь", подразумевая непосредственное место, где производятся изделия. Также словом камамото называют мастера-гончара.
            </p>
            <p className="text text_muted">
              Я счел, что это название идеально подходит для названия коллекции, вещи для которой я выбираю с особой ответственностью, трепетом и внимательностью, которые развивал с 2015года.
            </p>
            <p className="text text_muted">Ниже блок ссылок на мои персональные страницы.</p>
          </div>

          <SocialLinks links={personalSocialLinks} additionalClassNames="about__links" />
        </div>
      </section>
    </>
  );
}
