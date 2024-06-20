import './Menu.scss';

export default function Menu(): JSX.Element {
  return (
    <ul className="menu">
      <li>
        <a className="menu__link" href="#">
          Обо мне
        </a>
      </li>
      <li>
        <a className="menu__link" href="#">
          Коллекция
        </a>
      </li>
      <li>
        <a className="menu__link" href="#">
          Выставки
        </a>
      </li>
      <li>
        <a className="menu__link" href="#">
          Контакты
        </a>
      </li>
    </ul>
  );
}
