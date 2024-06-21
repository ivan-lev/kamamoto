import './Exhibitions.scss';

export default function Exhibitions() {
  return (
    <section className="exhibitions">
      <h2 className="title title2">Выставки</h2>
      <ul className="exhibitions__list">
        <li className="exhibitions__element">
          <div className="exhibitions__upper-line"></div>
          <div className="exhibitions__year">2021</div>
          <div className="exhibitions__lower-line"></div>
          <div className="container background-muted bordered exhibitions__card">
            <p className="background-muted bordered exhibitions__dates">17 декабря - 17 января</p>
            <p className="exhibitions__city">Челябинск</p>
            <div>
              <p className="exhibitions__name">«Луна и Момидзи»</p>
              <p className="exhibitions__place">Челябинский гос. исторический музей Южного Урала</p>
            </div>
          </div>
        </li>

        <li className="exhibitions__element">
          <div className="exhibitions__upper-line"></div>
          <div className="exhibitions__year">2022</div>
          <div className="exhibitions__lower-line"></div>
          <div className="container background-muted bordered exhibitions__card">
            <p className="background-muted bordered exhibitions__dates">1 февраля - 4 марта</p>
            <p className="exhibitions__city">Миасс</p>
            <div>
              <p className="exhibitions__name">«Путь к Фудзи»</p>
              <p className="exhibitions__place">Миасский краеведческий музей</p>
            </div>
          </div>
        </li>

        <li className="exhibitions__element">
          <div className="exhibitions__upper-line"></div>
          <div className="exhibitions__year">2022</div>
          <div className="exhibitions__lower-line"></div>
          <div className="container background-muted bordered exhibitions__card">
            <p className="background-muted bordered exhibitions__dates">30 августа - 3 октября</p>
            <p className="exhibitions__city">Уфа</p>
            <div>
              <p className="exhibitions__name">«Путь к Фудзи»</p>
              <p className="exhibitions__place">
                Башкирский гос. худож-й музей имени М. В. Нестерова, выставочный зал "Ижад"
              </p>
            </div>
          </div>
        </li>
        <li className="exhibitions__element">
          <div className="exhibitions__upper-line"></div>
          <div className="exhibitions__year">2023</div>
          <div className="exhibitions__lower-line"></div>
          <div className="container background-muted bordered exhibitions__card">
            <p className="background-muted bordered exhibitions__dates">20 мая - 18 июня</p>
            <p className="exhibitions__city">Челябинск</p>
            <div>
              <p className="exhibitions__name">«Беседы о Востоке»</p>
              <p className="exhibitions__place">Челябинский музей искусств</p>
            </div>
          </div>
        </li>
        <li className="exhibitions__element">
          <div className="exhibitions__upper-line"></div>
          <div className="exhibitions__year">2024</div>
          <div className="exhibitions__lower-line"></div>
          <div className="container background-muted bordered exhibitions__card">
            <p className="background-muted bordered exhibitions__dates">23 марта - 27 апреля</p>
            <p className="exhibitions__city">Екатеринбург</p>
            <div>
              <p className="exhibitions__name">
                «Фестиваль Восточной Культуры»<a href="https://vostokfest.ru/">.</a>
              </p>
              <p className="exhibitions__place">Библиотека им. А.И. Герцена</p>
            </div>
          </div>
        </li>
        <li className="exhibitions__element">
          <div className="exhibitions__upper-line"></div>
          <div className="exhibitions__year">2024</div>
          <div className="exhibitions__lower-line"></div>
          <div className="container background-muted bordered exhibitions__card">
            <p className="background-muted bordered exhibitions__dates">даты в процессе</p>
            <p className="exhibitions__city">Курган</p>
            <div>
              <p className="exhibitions__name">«Три благородных господина»</p>
              <p className="exhibitions__place">Курганский культурно-выставочный центр</p>
            </div>
          </div>
        </li>
      </ul>
    </section>
  );
}
