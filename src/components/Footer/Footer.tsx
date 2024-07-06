import './Footer.scss';

import { Link } from 'react-router-dom';

import { socialLinks } from '../../variables/socialLinks';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__column footer__first-column">
        <span className="footer__column-element footer__column-title">Социальные ссылки</span>
        {socialLinks.map(socialLink => {
          return (
            <a className="link footer__column-element" href={socialLink.link} key={socialLink.id}>
              <img className="background-muted bordered footer__icon" src={socialLink.icon} />
              {socialLink.title}
            </a>
          );
        })}
      </div>
      <div className="footer__column second-column">
        <span className="footer__column-element footer__column-title">Полезные материалы</span>
        <Link to="/downloads" className="footer__column-element">
          Файлы для скачивания
        </Link>
        <Link to="/documents" className="footer__column-element">
          Шаблоны документов
        </Link>
      </div>
      <div className="footer__bottom-line">
        <span className="footer__copyright">&copy; 2024 Иван Лев</span>
        <a className="link footer__column-element footer__to-top-link" href="#">
          Вверх
          <img className="background-muted bordered link__icon" src="/icons/link-arrow-up.svg" />
        </a>
      </div>
    </footer>
  );
}
