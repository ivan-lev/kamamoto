import type { Link } from '@/types/link';
import './SocialLinks.scss';

interface Props {
	links: Link[];
	additionalClassNames: string;
}

export default function ({ links, additionalClassNames }: Props) {
	return (
		<div className={ `social-links ${additionalClassNames}` }>
			{ links.map((link) => {
				const { url, icon, title } = link;
				return (
					<a
						className="social-links__link"
						target="_blank"
						href={ url }
						key={ url }
					>
						<img className="social-links__icon" src={ icon } alt="Иконка" />
						{ title }
					</a>
				);
			}) }
		</div>
	);
}
