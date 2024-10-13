import './Benefactors.scss';

// React
import { useLayoutEffect } from 'react';

// Components
import Seo from '../Seo/Seo';

export default function Benefactors() {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <>
      <Seo title="Камамото: страница о людях, внесших вклад в развитие коллекции" />
      <section className="section">
        <h2 className="title title2">Помощники проекта</h2>
        <p className="subtitle">
          Страница, на которой я хочу рассказать о людях, которые внесли свой вклад в развите
          коллекции
        </p>
        <div className="benefactors">
          <div className="container bordered background-muted benefactors__card">
            <img
              className="benefactors__photo"
              src="/people/smirnova-n.jpg"
              alt="Фото помощника проекта"
            >
            </img>

            <a className="link link_usual benefactors__name" href="https://vk.com/id18845601">
              Смирнова Наталья
            </a>
            <span className="benefactors__about muted">
              Председатель Челябинского регионального отделения Всероссийского Общества "Россия -
              Япония", руководитель АНО ИКЦ урало-японских связей "RAKUDA".
            </span>
            <p className="text benefactors__content">
              Наталья предложила идею проведения первой выставки (и вообще идею выставок как
              таковых). Таким образом, с её подачи и при её помощи коллекцию впервые увидел широкий
              круг людей, а она сама стала организатором нескольких мероприятий, на которых была
              представлена керамика из коллекции.
            </p>
          </div>

          <div className="container bordered background-muted benefactors__card">
            <img
              className="benefactors__photo"
              src="/people/tretyakova-m.jpg"
              alt="Фото помощника проекта"
            >
            </img>

            <a className="link link_usual benefactors__name" href="https://vk.com/id246244448">
              Третьякова Мария
            </a>
            <p className="benefactors__about muted">
              Специалист по японскому языку и культуре. Кандидат искусствоведения, Doctor of Fine
              Arts (Japan), докторантура Киотского университета искусства и дизайна (Япония).
            </p>
            <p className="text benefactors__content">
              Мария вносит большой вклад в перевод каллиграфии на японских вещах. С её помощью
              образы предметов наполняются более глубоким смыслом, а красивая японская вязь
              превращается в осмысленный текст, который дополняет общее ощущение от созерцаемой
              вещи.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
