import './Partner.scss';

import type { Partner } from '../../types/partnerType';

export default function Partner({ partner }: { partner: Partner }): JSX.Element {
  const { link, logo, title } = partner;
  return (
    <div className="partner">
      <a href={link} className="partner__link">
        <img src={logo} alt="Логотип партёра" className="partner__image" title={title} />
      </a>
    </div>
  );
}
