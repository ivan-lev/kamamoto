import './Footer.scss';

export default function Footer() {
	return (
		<footer className="footer">
			<span className="footer__copyright">
				{ `© ${new Date().getFullYear()} Иван Лев` }
			</span>
		</footer>
	);
}
