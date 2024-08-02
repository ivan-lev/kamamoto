import './Footer.scss';

// React
import { Link } from 'react-router-dom';

// Variables
import { socialLinks } from '../../variables/socialLinks';
import { footerLinks } from '../../variables/footerLinks';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__column footer__column_social">
        <span className="footer__column-element footer__column-title">Ссылки на проект</span>
        {socialLinks.map(socialLink => {
          return (
            <a className="link footer__column-element" href={socialLink.link} key={socialLink.id}>
              <div className="background-muted bordered footer__icon-wrapper">
                <img className="footer__icon" src={socialLink.icon} />
              </div>

              {socialLink.title}
            </a>
          );
        })}
      </div>
      <div className="footer__column footer__column_useful">
        <span className="footer__column-element footer__column-title">Материалы</span>
        {footerLinks.map(link => (
          <Link key={link.id} to={link.url} className="link footer__column-element">
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
