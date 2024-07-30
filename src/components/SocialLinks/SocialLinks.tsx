import './SocialLinks.scss';

import { SocialLinks } from '../../types/socialLinkType';

export default function ({
  links,
  additionalClassNames
}: {
  links: SocialLinks;
  additionalClassNames: string;
}): JSX.Element {
  return (
    <div className={`social-links ${additionalClassNames}`}>
      {links.map(linkObject => {
        const { link, id, icon, title } = linkObject;
        return (
          <a className="link background-muted bordered social-links__link" href={link} key={id}>
            <img className="social-links__icon" src={icon} />
            {title}
          </a>
        );
      })}
    </div>
  );
}
