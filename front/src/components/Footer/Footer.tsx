import { Link } from 'react-router';
import { links } from '@/variables/links';
import { SITE_VERSION } from '@/variables/variables';

import './Footer.scss';

export default function Footer() {
	return (
		<footer className="footer">
			<div className="footer__column">
				<span className="footer__column-element footer__column-title">Ссылки на проект</span>

				{ links.social.map((link) => {
					return (
						<a
							className="link footer__column-element"
							target="_blank"
							href={ link.url }
							key={ link.url }
						>
							<div className="footer__icon-wrapper">
								<img className="footer__icon" src={ link.icon } alt="Иконка" />
							</div>

							{ link.title }
						</a>
					);
				}) }
			</div>

			<div className="footer__column">
				<span className="footer__column-element footer__column-title">Материалы</span>
				{ links.useful.map(link => (
					<Link key={ link.url } to={ link.url } className="link footer__column-element">
						{ link.title }
					</Link>
				)) }
			</div>

			<div className="footer__column">
				<span className="footer__column-element footer__column-title">Информация</span>
				{ links.info.map(link => (
					<Link key={ link.url } to={ link.url } className="link footer__column-element">
						{ link.title }
					</Link>
				)) }
			</div>

			<div className="footer__bottom">
				<span className="footer__copyright">
					{ `© ${new Date().getFullYear()} Иван Лев` }
				</span>
				<span className="footer__site-version">
					{ `Версия сайта: ${SITE_VERSION}` }
				</span>
			</div>
		</footer>
	);
}
