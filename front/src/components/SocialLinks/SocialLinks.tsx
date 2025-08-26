import type { SocialLinks } from '@/types/socialLinkType';
import './SocialLinks.scss';

interface Props {
	links: SocialLinks;
	additionalClassNames: string;
}

export default function ({ links, additionalClassNames }: Props) {
	return (
		<div className={ `social-links ${additionalClassNames}` }>
			{ links.map((linkObject) => {
				const { link, id, icon, title } = linkObject;
				return (
					<a
						className="social-links__link"
						target="_blank"
						href={ link }
						key={ id }
					>
						<img className="social-links__icon" src={ icon } />
						{ title }
					</a>
				);
			}) }
		</div>
	);
}
