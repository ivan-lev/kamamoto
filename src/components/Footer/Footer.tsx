import './Footer.scss';

import { Link } from 'react-router-dom';

import { socialLinks } from '../../variables/socialLinks';
import { footerLinks } from '../../variables/footerLinks';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__column footer__column_social">
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
      <div className="footer__column footer__column_useful">
        <span className="footer__column-element footer__column-title">Полезные материалы</span>
        {footerLinks.map(link => (
          <Link to={link.url} className="footer__column-element">
            {link.name}
          </Link>
        ))}
      </div>
      <div className="footer__bottom-line">
        <span className="footer__copyright">&copy; 2024 Иван Лев</span>
        <a className="link link_navigational footer__column-element footer__to-top-link" href="#">
          Вверх
          <img className="background-muted bordered link__icon" src="/icons/link-arrow-up.svg" />
        </a>
      </div>
    </footer>
  );
}
