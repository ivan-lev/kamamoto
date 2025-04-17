import { footerLinks } from '@/variables/footerLinks';
import { socialLinks } from '@/variables/socialLinks';
import { SITE_VERSION } from '@/variables/variables';
import { Link } from 'react-router-dom';

import './Footer.scss';

export default function Footer() {
	return (
		<footer className="footer">
			<div className="footer__column footer__column_social">
				<span className="footer__column-element footer__column-title">Ссылки на проект</span>
				{socialLinks.map((socialLink) => {
					return (
						<a
							className="link footer__column-element"
							target="_blank"
							href={socialLink.link}
							key={socialLink.id}
						>
							<div className="footer__icon-wrapper">
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
				<span className="footer__copyright">
					{ `© ${new Date().getFullYear()} Иван Лев`}
				</span>
				<span className="footer__site-version">
					{ `Версия сайта: ${SITE_VERSION}` }
				</span>
				<a className="link link_navigational footer__column-element footer__to-top-link" href="#">
					Вверх
					<img className="link__icon" src="/icons/link-arrow-up.svg" />
				</a>
			</div>
		</footer>
	);
}
